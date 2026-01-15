package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.repository.TherapySessionRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
public class TherapySessionController {

    private final TherapySessionRepository sessionRepo;

    public TherapySessionController(TherapySessionRepository sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    // APIs only here
}
