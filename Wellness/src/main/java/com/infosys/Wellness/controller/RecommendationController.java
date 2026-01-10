package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.RecommendationRequest;
import com.infosys.Wellness.entity.Recommendation;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.UserRepository;
import com.infosys.Wellness.service.RecommendationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final UserRepository userRepository;

    public RecommendationController(RecommendationService recommendationService,
                                    UserRepository userRepository) {
        this.recommendationService = recommendationService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Recommendation recommend(Authentication authentication,
                                    @RequestBody RecommendationRequest request) {

        // 🔥 authentication.getName() = email
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return recommendationService.generate(user.getId(), request);
    }
}
