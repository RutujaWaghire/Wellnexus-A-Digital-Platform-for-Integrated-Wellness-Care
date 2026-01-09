package com.wellness.backend.service.impl;

import com.wellness.backend.integration.ExternalHealthApiService;
import com.wellness.backend.model.Recommendation;
import com.wellness.backend.repository.RecommendationRepository;
import com.wellness.backend.service.RecommendationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private final RecommendationRepository repository;
    private final ExternalHealthApiService externalApi;

    public RecommendationServiceImpl(RecommendationRepository repository,
                                     ExternalHealthApiService externalApi) {
        this.repository = repository;
        this.externalApi = externalApi;
    }

    @Override
    public Recommendation generateRecommendation(Long userId, String symptom) {

        String therapy = externalApi.fetchTherapyRecommendation(symptom);

        Recommendation rec = new Recommendation();
        rec.setUserId(userId);
        rec.setSymptom(symptom);
        rec.setSuggestedTherapy(therapy);
        rec.setSourceAPI("WHO/OpenFDA");
        rec.setTimestamp(LocalDateTime.now());

        return repository.save(rec);
    }

    @Override
    public List<Recommendation> getUserRecommendations(Long userId) {
        return repository.findByUserId(userId);
    }
}
