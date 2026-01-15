package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.PractitionerListResponse;
import com.infosys.Wellness.dto.PractitionerProfileRequest;
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

    public PractitionerController(
            PractitionerProfileRepository practitionerRepo,
            UserRepository userRepository
    ) {
        this.practitionerRepo = practitionerRepo;
        this.userRepository = userRepository;
    }

    // ✅ CREATE / UPDATE PROFILE
    @PostMapping("/me")
    public ResponseEntity<PractitionerProfile> createOrUpdateMyProfile(
            Authentication authentication,
            @RequestBody PractitionerProfileRequest request
    ) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.PRACTITIONER) {
            return ResponseEntity.status(403).build();
        }

        PractitionerProfile profile = practitionerRepo
                .findByUser_Id(user.getId())
                .orElse(new PractitionerProfile());

        profile.setUser(user);
        profile.setSpecialization(request.getSpecialization());

        return ResponseEntity.ok(practitionerRepo.save(profile));
    }

    // ✅ GET LOGGED-IN PRACTITIONER PROFILE (THIS FIXES YOUR ISSUE)
    @GetMapping("/me")
    public ResponseEntity<PractitionerProfile> getMyProfile(Authentication authentication) {

        String email = authentication.getName();
        System.out.println("AUTH EMAIL = " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("USER ID = " + user.getId());

        PractitionerProfile profile = practitionerRepo
                .findByUser_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return ResponseEntity.ok(profile);
    }


    // ✅ LIST PRACTITIONERS
    @GetMapping
    public ResponseEntity<List<PractitionerListResponse>> listPractitioners(
            @RequestParam(required = false) String specialization
    ) {
        List<PractitionerProfile> profiles =
                (specialization == null || specialization.isBlank())
                        ? practitionerRepo.findAll()
                        : practitionerRepo.findBySpecializationContainingIgnoreCase(specialization);

        List<PractitionerListResponse> response = profiles.stream()
                .map(p -> new PractitionerListResponse(
                        p.getId(),
                        p.getUser().getName(),
                        p.getUser().getEmail(),
                        p.getSpecialization()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

}
