package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.PractitionerVerifyRequest;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin/practitioners")
public class AdminPractitionerController {

    private final PractitionerProfileRepository practitionerRepo;

    public AdminPractitionerController(PractitionerProfileRepository practitionerRepo) {
        this.practitionerRepo = practitionerRepo;
    }

    // ✅ FETCH ALL PRACTITIONERS (ADMIN ONLY)
    @GetMapping
    public ResponseEntity<?> getAllPractitioners() {
        return ResponseEntity.ok(practitionerRepo.findAll());
    }

    // ✅ VERIFY PRACTITIONER
    @PatchMapping("/{id}/verify")
    public ResponseEntity<PractitionerProfile> verifyPractitioner(
            @PathVariable Long id,
            @RequestBody PractitionerVerifyRequest request
    ) {
        PractitionerProfile profile = practitionerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        profile.setVerified(request.isVerified());
        PractitionerProfile saved = practitionerRepo.save(profile);
        return ResponseEntity.ok(saved);
    }
}

