package com.wellness.backend.controller;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.User;
import com.wellness.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 1️⃣ Get all therapy sessions
    @GetMapping("/sessions")
    public ResponseEntity<List<TherapySession>> getAllSessions() {
        return ResponseEntity.ok(adminService.getAllSessions());
    }

    // 2️⃣ Get all booked sessions
    @GetMapping("/bookings")
    public ResponseEntity<List<TherapySession>> getAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }

    // 3️⃣ Get all pending practitioners
    @GetMapping("/pending-practitioners")
    public ResponseEntity<List<User>> getPendingPractitioners() {
        return ResponseEntity.ok(adminService.getPendingPractitioners());
    }

    // 4️⃣ Verify or reject practitioner
    @PutMapping("/verify-practitioner/{practitionerId}")
    public ResponseEntity<String> verifyPractitioner(
            @PathVariable Long practitionerId,
            @RequestParam boolean approve) {

        adminService.verifyPractitioner(practitionerId, approve);
        return ResponseEntity.ok("Practitioner verification updated successfully");
    }
}
