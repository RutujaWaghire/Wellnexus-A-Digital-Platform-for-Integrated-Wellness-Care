package com.wellness.backend.service;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.User;

import java.util.List;

public interface AdminService {

    List<TherapySession> getAllSessions();

    List<TherapySession> getAllBookings();

    List<User> getPendingPractitioners();

    void verifyPractitioner(Long practitionerId, boolean approve);
}
