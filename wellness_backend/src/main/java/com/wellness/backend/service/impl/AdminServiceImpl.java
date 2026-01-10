package com.wellness.backend.service.impl;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.User;
import com.wellness.backend.model.SessionStatus;
import com.wellness.backend.repository.TherapySessionRepository;
import com.wellness.backend.repository.UserRepository;
import com.wellness.backend.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final TherapySessionRepository therapySessionRepository;
    private final UserRepository userRepository;

    public AdminServiceImpl(TherapySessionRepository therapySessionRepository, UserRepository userRepository) {
        this.therapySessionRepository = therapySessionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<TherapySession> getAllSessions() {
        return therapySessionRepository.findAll();
    }

    @Override
    public List<TherapySession> getAllBookings() {
        return therapySessionRepository.findByStatus(SessionStatus.BOOKED);
    }

    @Override
    public List<User> getPendingPractitioners() {
        return userRepository.findByIsVerified(false);
    }

    @Override
    public void verifyPractitioner(Long practitionerId, boolean approve) {
        User practitioner = userRepository.findById(practitionerId)
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));
        practitioner.setIsVerified(approve);
        userRepository.save(practitioner);
    }
}
