package com.wellness.backend.service.impl;

import com.wellness.backend.dto.UserDashboardResponse;
import com.wellness.backend.model.User;
import com.wellness.backend.repository.OrderRepository;
import com.wellness.backend.repository.TherapySessionRepository;
import com.wellness.backend.repository.UserRepository;
import com.wellness.backend.service.UserDashboardService;
import org.springframework.stereotype.Service;

@Service
public class UserDashboardServiceImpl implements UserDashboardService {

    private final UserRepository userRepo;
    private final TherapySessionRepository sessionRepo;
    private final OrderRepository orderRepo;

    public UserDashboardServiceImpl(UserRepository userRepo,
                                    TherapySessionRepository sessionRepo,
                                    OrderRepository orderRepo) {
        this.userRepo = userRepo;
        this.sessionRepo = sessionRepo;
        this.orderRepo = orderRepo;
    }

    @Override
    public UserDashboardResponse getDashboard(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDashboardResponse(
                user.getId(),
                sessionRepo.findByUserId(user.getId()),
                orderRepo.findByUserId(user.getId())
        );
    }
}
