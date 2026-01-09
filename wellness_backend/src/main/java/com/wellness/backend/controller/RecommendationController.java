package com.wellness.backend.controller;

import com.wellness.backend.model.Recommendation;
import com.wellness.backend.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(RecommendationService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public Recommendation generate(
            @RequestParam Long userId,
            @RequestParam String symptom) {
        return service.generateRecommendation(userId, symptom);
    }

    @GetMapping("/user/{userId}")
    public List<Recommendation> getUserRecommendations(@PathVariable Long userId) {
        return service.getUserRecommendations(userId);
    }
}
