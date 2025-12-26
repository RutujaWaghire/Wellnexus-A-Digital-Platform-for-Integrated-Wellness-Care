package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.ReminderRequest;
import com.infosys.Wellness.dto.RescheduleRequest;
import com.infosys.Wellness.dto.TherapySessionCreateRequest;
import com.infosys.Wellness.dto.TherapySessionResponse;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.TherapySessionRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sessions")
public class TherapySessionController {

    private final TherapySessionRepository sessionRepo;
    private final PractitionerProfileRepository practitionerRepo;
    private final UserRepository userRepository;

    public TherapySessionController(
            TherapySessionRepository sessionRepo,
            PractitionerProfileRepository practitionerRepo,
            UserRepository userRepository
    ) {
        this.sessionRepo = sessionRepo;
        this.practitionerRepo = practitionerRepo;
        this.userRepository = userRepository;
    }

    // 🔹 1️⃣ Patient books a session
    @PostMapping
    public ResponseEntity<TherapySessionResponse> createSession(
            Authentication auth,
            @RequestBody TherapySessionCreateRequest request
    ) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PractitionerProfile practitioner = practitionerRepo.findById(request.getPractitionerId())
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        if (request.getSlotStart() == null) {
            return ResponseEntity.badRequest().build();
        }

        TherapySession session = new TherapySession();
        session.setUser(user);
        session.setPractitioner(practitioner);
        session.setSlotStart(request.getSlotStart());
        session.setSlotEnd(
                request.getSlotEnd() != null
                        ? request.getSlotEnd()
                        : request.getSlotStart().plusMinutes(30)
        );
        session.setNotes(request.getNotes());
        session.setStatus("BOOKED");
        session.setCanceled(false);

        TherapySession saved = sessionRepo.save(session);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convert(saved));
    }

    // 🔹 2️⃣ Patient views own sessions
    @GetMapping("/my")
    public ResponseEntity<List<TherapySessionResponse>> getMySessions(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TherapySessionResponse> response = sessionRepo.findByUser(user)
                .stream()
                .map(this::convert)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // 🔹 3️⃣ Patient cancels a session
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancelSession(
            @PathVariable Long id,
            Authentication auth
    ) {
        String email = auth.getName();

        TherapySession session = sessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (!session.getUser().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can cancel only your own session");
        }

        session.setStatus("CANCELED");
        session.setCanceled(true);
        TherapySession updated = sessionRepo.save(session);

        return ResponseEntity.ok(convert(updated));
    }

    // 🔹 4️⃣ Patient Reschedules a session (OPTIONAL FEATURE)
    @PatchMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleSession(
            @PathVariable Long id,
            Authentication auth,
            @RequestBody RescheduleRequest request
    ) {
        String email = auth.getName();

        TherapySession session = sessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // security: only owner can reschedule
        if (!session.getUser().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can reschedule only your own session");
        }

        LocalDateTime newStart = request.getNewSlotStart();
        LocalDateTime newEnd = request.getNewSlotEnd() != null
                ? request.getNewSlotEnd()
                : newStart.plusMinutes(30);

        session.setSlotStart(newStart);
        session.setSlotEnd(newEnd);
        session.setStatus("RESCHEDULED");

        TherapySession updated = sessionRepo.save(session);

        return ResponseEntity.ok(convert(updated));
    }
    @PatchMapping("/{id}/reminder")
    public ResponseEntity<?> setReminder(
            @PathVariable Long id,
            Authentication auth,
            @RequestBody ReminderRequest request
    ) {
        String email = auth.getName();

        TherapySession session = sessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        // ensure only the session owner sets reminder
        if (!session.getUser().getEmail().equals(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can set reminder only for your own sessions");
        }

        session.setReminderAt(request.getReminderAt());
        sessionRepo.save(session);

        return ResponseEntity.ok(
                "Reminder saved for " + request.getReminderAt()
        );
    }


    // Helper method
    private TherapySessionResponse convert(TherapySession s) {
        return new TherapySessionResponse(
                s.getId(),
                s.getPractitioner().getUser().getName(),
                s.getPractitioner().getSpecialization(),
                s.getSlotStart(),
                s.getSlotEnd(),
                s.getStatus(),
                s.getNotes()
        );
    }
}
