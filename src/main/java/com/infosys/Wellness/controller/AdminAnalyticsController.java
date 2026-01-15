package com.infosys.Wellness.controller;

import com.infosys.Wellness.repository.OrderRepository;
import com.infosys.Wellness.repository.RecommendationRepository;
import com.infosys.Wellness.repository.TherapySessionRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminAnalyticsController {

    private final RecommendationRepository recommendationRepository;
    private final OrderRepository orderRepository;
    private final TherapySessionRepository therapySessionRepository;
    private final UserRepository userRepository;

    public AdminAnalyticsController(RecommendationRepository recommendationRepository,
                                    OrderRepository orderRepository,
                                    TherapySessionRepository therapySessionRepository,
                                    UserRepository userRepository) {
        this.recommendationRepository = recommendationRepository;
        this.orderRepository = orderRepository;
        this.therapySessionRepository = therapySessionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {

        Map<String, Object> analytics = new HashMap<>();

        analytics.put("totalUsers", userRepository.count());
        analytics.put("totalRecommendations", recommendationRepository.count());
        analytics.put("totalOrders", orderRepository.count());
        analytics.put("totalBookings", therapySessionRepository.count());

        return analytics;
    }
}
