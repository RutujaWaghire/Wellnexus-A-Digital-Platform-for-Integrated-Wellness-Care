package com.wellness.backend.service.impl;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.SessionStatus;
import com.wellness.backend.repository.TherapySessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TherapySessionServiceImpl {

    private final TherapySessionRepository therapySessionRepository;

    public TherapySessionServiceImpl(TherapySessionRepository therapySessionRepository) {
        this.therapySessionRepository = therapySessionRepository;
    }

    // Get all sessions for a specific user
    public List<TherapySession> getSessionsByUserId(Long userId) {
        return therapySessionRepository.findByUserId(userId);
    }

    // Get all sessions for a specific practitioner
    public List<TherapySession> getSessionsByPractitionerId(Long practitionerId) {
        return therapySessionRepository.findByPractitionerId(practitionerId);
    }

    // Get all sessions with a specific status
    public List<TherapySession> getSessionsByStatus(SessionStatus status) {
        return therapySessionRepository.findByStatus(status);
    }

    // Get all AVAILABLE sessions
    public List<TherapySession> getAvailableSessions() {
        return therapySessionRepository.findByStatus(SessionStatus.AVAILABLE);
    }

    // Update notes and status for a session
    public TherapySession updateSession(Long sessionId, String notes, SessionStatus status) {
        Optional<TherapySession> optionalSession = therapySessionRepository.findById(sessionId);
        if (optionalSession.isPresent()) {
            TherapySession session = optionalSession.get();
            session.setNotes(notes);
            session.setStatus(status);
            return therapySessionRepository.save(session);
        }
        return null;
    }

    // Cancel a session
    public TherapySession cancelSession(Long sessionId) {
        Optional<TherapySession> optionalSession = therapySessionRepository.findById(sessionId);
        if (optionalSession.isPresent()) {
            TherapySession session = optionalSession.get();
            session.setStatus(SessionStatus.CANCELLED);
            return therapySessionRepository.save(session);
        }
        return null;
    }
}
