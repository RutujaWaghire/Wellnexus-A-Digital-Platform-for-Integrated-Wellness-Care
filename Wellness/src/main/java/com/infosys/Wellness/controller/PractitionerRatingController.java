package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.PractitionerRatingRequest;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.PractitionerRating;
import com.infosys.Wellness.entity.Role;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.PractitionerRatingRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class PractitionerRatingController {

    private final PractitionerRatingRepository ratingRepo;
    private final PractitionerProfileRepository practitionerRepo;
    private final UserRepository userRepo;

    public PractitionerRatingController(PractitionerRatingRepository ratingRepo,
                                        PractitionerProfileRepository practitionerRepo,
                                        UserRepository userRepo) {
        this.ratingRepo = ratingRepo;
        this.practitionerRepo = practitionerRepo;
        this.userRepo = userRepo;
    }

    // Create or update rating (upsert)
    @PostMapping("/{practitionerId}")
    public ResponseEntity<?> addOrUpdateRating(
            Authentication auth,
            @PathVariable Long practitionerId,
            @RequestBody PractitionerRatingRequest request
    ) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Only patients can rate
        if (user.getRole() != Role.PATIENT) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only patients can rate practitioners");
        }

        PractitionerProfile practitioner = practitionerRepo.findById(practitionerId)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        if (practitioner.getVerified() == null || !practitioner.getVerified()) {
            return ResponseEntity.badRequest().body("Cannot rate an unverified practitioner");
        }

        // Prevent self-rating
        if (practitioner.getUser().getId().equals(user.getId())) {
            return ResponseEntity.badRequest().body("You cannot rate yourself");
        }

        int ratingVal = request.getRating();
        if (ratingVal < 1 || ratingVal > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5");
        }

        PractitionerRating rating = ratingRepo.findByPractitionerAndUser(practitioner, user)
                .orElse(new PractitionerRating());

        rating.setPractitioner(practitioner);
        rating.setUser(user);
        rating.setRating(ratingVal);
        rating.setComment(request.getComment());
        ratingRepo.save(rating);

        // Recompute avg and save on practitioner profile
        List<PractitionerRating> all = ratingRepo.findByPractitioner(practitioner);
        double avg = all.stream().mapToInt(PractitionerRating::getRating).average().orElse(0.0);
        practitioner.setRating(avg);
        practitionerRepo.save(practitioner);

        return ResponseEntity.ok(rating);
    }

    // List ratings for a practitioner
    @GetMapping("/{practitionerId}")
    public ResponseEntity<?> getRatings(@PathVariable Long practitionerId) {
        PractitionerProfile practitioner = practitionerRepo.findById(practitionerId)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));
        List<PractitionerRating> ratings = ratingRepo.findByPractitioner(practitioner);
        return ResponseEntity.ok(ratings);
    }

    // Average rating + count
    @GetMapping("/{practitionerId}/avg")
    public ResponseEntity<?> getAvg(@PathVariable Long practitionerId) {
        PractitionerProfile practitioner = practitionerRepo.findById(practitionerId)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));
        List<PractitionerRating> ratings = ratingRepo.findByPractitioner(practitioner);
        double avg = ratings.stream().mapToInt(PractitionerRating::getRating).average().orElse(0.0);
        return ResponseEntity.ok(new Object() {
            public final double average = avg;
            public final int count = ratings.size();
        });
    }
}
