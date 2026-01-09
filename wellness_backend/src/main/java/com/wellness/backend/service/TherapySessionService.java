package com.wellness.backend.service;

import com.wellness.backend.model.TherapySession;

import java.util.List;

public interface TherapySessionService {

    TherapySession bookSession(TherapySession session);

    List<TherapySession> getByUser(Long userId);

    List<TherapySession> getByPractitioner(Long practitionerId);

    TherapySession completeSession(Long id, String notes);

    List<TherapySession> getAvailableSessions();

    List<TherapySession> getUpcomingSessionsByUser(Long userId);

    List<TherapySession> getUpcomingSessionsByPractitioner(Long practitionerId);
}
