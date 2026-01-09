package com.wellness.backend.service;

import com.wellness.backend.model.Recommendation;

import java.util.List;

public interface RecommendationService {
    Recommendation generateRecommendation(Long userId, String symptom);
    List<Recommendation> getUserRecommendations(Long userId);
}
