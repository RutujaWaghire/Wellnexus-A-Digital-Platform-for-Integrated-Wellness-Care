package com.infosys.Wellness.controller;

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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sessions")
public class TherapySessionController {

    private final TherapySessionRepository sessionRepo;
    private final PractitionerProfileRepository practitionerRepo;
    private final UserRepository userRepository;

    public TherapySessionController(TherapySessionRepository sessionRepo,
                                    PractitionerProfileRepository practitionerRepo,
                                    UserRepository userRepository) {
        this.sessionRepo = sessionRepo;
        this.practitionerRepo = practitionerRepo;
        this.userRepository = userRepository;
    }

    // Patient books a session
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

        // Build and save session using slotStart/slotEnd (not date)
        TherapySession session = new TherapySession();
        session.setUser(user);
        session.setPractitioner(practitioner);

        if (request.getSlotStart() == null) {
            return ResponseEntity.badRequest().build();
        }
        session.setSlotStart(request.getSlotStart());

        // If client didn't provide slotEnd, default 30 minutes
        if (request.getSlotEnd() != null) {
            session.setSlotEnd(request.getSlotEnd());
        } else {
            session.setSlotEnd(request.getSlotStart().plusMinutes(30));
        }

        session.setNotes(request.getNotes());
        session.setStatus("BOOKED");
        session.setCanceled(false);

        TherapySession saved = sessionRepo.save(session);

        TherapySessionResponse resp = new TherapySessionResponse(
                saved.getId(),
                practitioner.getUser().getName(),
                practitioner.getSpecialization(),
                saved.getSlotStart(),
                saved.getSlotEnd(),
                saved.getStatus(),
                saved.getNotes()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    // Patient session history
    @GetMapping("/my")
    public ResponseEntity<List<TherapySessionResponse>> getMySessions(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TherapySession> sessions = sessionRepo.findByUser(user);

        List<TherapySessionResponse> response = sessions.stream()
                .map(s -> new TherapySessionResponse(
                        s.getId(),
                        s.getPractitioner().getUser().getName(),
                        s.getPractitioner().getSpecialization(),
                        s.getSlotStart(),
                        s.getSlotEnd(),
                        s.getStatus(),
                        s.getNotes()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
