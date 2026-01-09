package com.wellness.backend.controller;

import com.wellness.backend.model.PractitionerProfile;
import com.wellness.backend.service.PractitionerProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practitioner-profile")
public class PractitionerProfileController {

    private final PractitionerProfileService service;

    public PractitionerProfileController(PractitionerProfileService service) {
        this.service = service;
    }

    // CREATE profile
    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody PractitionerProfile profile) {
        return ResponseEntity.ok(service.createProfile(profile));
    }

    // GET profile by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    // UPDATE profile
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody PractitionerProfile profile) {

        return ResponseEntity.ok(service.updateProfile(id, profile));
    }

    // VERIFY practitioner (admin use)
    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyPractitioner(@PathVariable Long id) {
        service.verifyPractitioner(id);
        return ResponseEntity.ok("Practitioner verified successfully");
    }
}
