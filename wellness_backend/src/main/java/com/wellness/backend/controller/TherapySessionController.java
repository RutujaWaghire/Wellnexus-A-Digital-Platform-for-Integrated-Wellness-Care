package com.wellness.backend.controller;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.SessionStatus;
import com.wellness.backend.service.impl.TherapySessionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class TherapySessionController {

    private final TherapySessionServiceImpl sessionService;

    public TherapySessionController(TherapySessionServiceImpl sessionService) {
        this.sessionService = sessionService;
    }

    // ---------------- GET METHODS ----------------

    // 1️⃣ Get all AVAILABLE sessions
    @GetMapping("/available")
    public ResponseEntity<List<TherapySession>> getAvailableSessions() {
        return ResponseEntity.ok(sessionService.getAvailableSessions());
    }

    // 2️⃣ Get all CANCELLED sessions
    @GetMapping("/cancelled")
    public ResponseEntity<List<TherapySession>> getCancelledSessions() {
        return ResponseEntity.ok(sessionService.getSessionsByStatus(SessionStatus.CANCELLED));
    }

    // 3️⃣ Get sessions by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TherapySession>> getSessionsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionService.getSessionsByUserId(userId));
    }

    // 4️⃣ Get sessions by practitioner ID
    @GetMapping("/practitioner/{practitionerId}")
    public ResponseEntity<List<TherapySession>> getSessionsByPractitioner(@PathVariable Long practitionerId) {
        return ResponseEntity.ok(sessionService.getSessionsByPractitionerId(practitionerId));
    }

    // 5️⃣ Get sessions by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TherapySession>> getSessionsByStatus(@PathVariable String status) {
        try {
            SessionStatus sessionStatus = SessionStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(sessionService.getSessionsByStatus(sessionStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ---------------- PUT METHODS ----------------

    // 6️⃣ Update notes and status for a session
    @PutMapping("/{sessionId}")
    public ResponseEntity<TherapySession> updateSession(
            @PathVariable Long sessionId,
            @RequestParam String notes,
            @RequestParam String status) {
        try {
            SessionStatus sessionStatus = SessionStatus.valueOf(status.toUpperCase());
            TherapySession updatedSession = sessionService.updateSession(sessionId, notes, sessionStatus);
            if (updatedSession == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(updatedSession);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 7️⃣ Cancel a session
    @PutMapping("/{sessionId}/cancel")
    public ResponseEntity<TherapySession> cancelSession(@PathVariable Long sessionId) {
        TherapySession cancelledSession = sessionService.cancelSession(sessionId);
        if (cancelledSession == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(cancelledSession);
    }
}
