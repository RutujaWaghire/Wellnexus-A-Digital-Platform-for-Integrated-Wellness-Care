package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.CancelRequest;
import com.infosys.Wellness.dto.RescheduleRequest;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.exception.SlotAlreadyBookedException;
import com.infosys.Wellness.repository.TherapySessionRepository;
import com.infosys.Wellness.security.AuthService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class TherapySessionControllerExtensions {

    private final TherapySessionRepository sessionRepo;
    private final AuthService authService;

    public TherapySessionControllerExtensions(TherapySessionRepository sessionRepo, AuthService authService) {
        this.sessionRepo = sessionRepo;
        this.authService = authService;
    }

    @PatchMapping("/api/sessions/{id}/cancel")
    public ResponseEntity<?> cancelSession(@PathVariable Long id, @RequestBody CancelRequest req) {
        Long currentUserId = authService.requireCurrentUserId();
        TherapySession s = sessionRepo.findById(id).orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND));
        boolean isOwner = s.getUser() != null && s.getUser().getId().equals(currentUserId);
        boolean isPractitioner = authService.isCurrentUserPractitionerOf(s.getPractitioner().getId());
        if (!isOwner && !isPractitioner) {
            return ResponseEntity.status(403).build();
        }
        s.setCanceled(true);
        s.setCancelReason(req.getReason());
        s.setStatus("CANCELED");
        sessionRepo.save(s);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/api/sessions/{id}/reschedule")
    public ResponseEntity<?> rescheduleSession(@PathVariable Long id, @RequestBody RescheduleRequest req) {
        Long currentUserId = authService.requireCurrentUserId();
        TherapySession s = sessionRepo.findById(id).orElseThrow(() -> new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND));
        boolean isOwner = s.getUser() != null && s.getUser().getId().equals(currentUserId);
        boolean isPractitioner = authService.isCurrentUserPractitionerOf(s.getPractitioner().getId());
        if (!isOwner && !isPractitioner) {
            return ResponseEntity.status(403).build();
        }
        s.setRescheduledFrom(s.getId()); // or set to s.getId(); you might prefer storing previous slotStart timestamp instead
        LocalDateTime newStart = req.getNewSlotStart();
        LocalDateTime newEnd = req.getNewSlotEnd() != null ? req.getNewSlotEnd() : newStart.plus(Duration.ofMinutes(30));
        s.setSlotStart(newStart);
        s.setSlotEnd(newEnd);
        s.setStatus("RESCHEDULED");
        try {
            sessionRepo.saveAndFlush(s);
        } catch (DataIntegrityViolationException ex) {
            throw new SlotAlreadyBookedException("Requested new slot is already booked");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/practitioners/me/sessions")
    public ResponseEntity<List<TherapySession>> getPractitionerSessions(
            @RequestParam(value="from", required=false) String fromIso,
            @RequestParam(value="to", required=false) String toIso) {

        Long practitionerId = authService.requireCurrentPractitionerId();
        LocalDateTime from = fromIso == null ? LocalDateTime.now() : LocalDateTime.parse(fromIso);
        LocalDateTime to = toIso == null ? from.plusDays(30) : LocalDateTime.parse(toIso);
        List<TherapySession> list = sessionRepo.findByPractitioner_IdAndSlotStartBetween(practitionerId, from, to);
        return ResponseEntity.ok(list);
    }
}
