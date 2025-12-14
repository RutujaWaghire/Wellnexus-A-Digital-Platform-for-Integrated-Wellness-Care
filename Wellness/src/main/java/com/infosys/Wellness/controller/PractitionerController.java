package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.PractitionerProfileRequest;
import com.infosys.Wellness.dto.PractitionerVerifyRequest;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.Role;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practitioners")
public class PractitionerController {

    private final PractitionerProfileRepository practitionerRepo;
    private final UserRepository userRepository;

    public PractitionerController(PractitionerProfileRepository practitionerRepo,
                                  UserRepository userRepository) {
        this.practitionerRepo = practitionerRepo;
        this.userRepository = userRepository;
    }

    // Practitioner creates/updates own profile
    @PostMapping("/me")
    public ResponseEntity<PractitionerProfile> createOrUpdateMyProfile(
            Authentication auth,
            @RequestBody PractitionerProfileRequest request
    ) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure current user is a practitioner
        if (user.getRole() != Role.PRACTITIONER) {
            return ResponseEntity.status(403).build();
        }

        // Use findByUser_Id (matches JPA property path user.id)
        PractitionerProfile profile = practitionerRepo.findByUser_Id(user.getId())
                .orElse(new PractitionerProfile());

        profile.setUser(user);
        profile.setSpecialization(request.getSpecialization());

        return ResponseEntity.ok(practitionerRepo.save(profile));
    }

    // Admin verifies practitioner
    @PatchMapping("/{id}/verify")
    public ResponseEntity<PractitionerProfile> verifyPractitioner(
            @PathVariable Long id,
            @RequestBody PractitionerVerifyRequest request
    ) {
        PractitionerProfile profile = practitionerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        profile.setVerified(request.isVerified());
        return ResponseEntity.ok(practitionerRepo.save(profile));
    }

    // List practitioners (optional specialization filter)
    @GetMapping
    public ResponseEntity<List<PractitionerProfile>> listPractitioners(
            @RequestParam(required = false) String specialization
    ) {
        if (specialization == null || specialization.isBlank()) {
            return ResponseEntity.ok(practitionerRepo.findAll());
        }
        return ResponseEntity.ok(
                practitionerRepo.findBySpecializationContainingIgnoreCase(specialization)
        );
    }
}
