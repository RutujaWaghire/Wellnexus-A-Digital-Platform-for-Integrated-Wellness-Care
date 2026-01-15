package com.infosys.Wellness.service;

import com.infosys.Wellness.dto.RecommendationRequest;
import com.infosys.Wellness.entity.Recommendation;
import com.infosys.Wellness.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final HealthApiService healthApiService;
    private final NotificationService notificationService;

    public RecommendationService(RecommendationRepository recommendationRepository,
                                 HealthApiService healthApiService,
                                 NotificationService notificationService) {
        this.recommendationRepository = recommendationRepository;
        this.healthApiService = healthApiService;
        this.notificationService = notificationService;
    }

    public Recommendation generate(Long userId, RecommendationRequest request) {

        String symptom = request.getSymptom().toLowerCase();
        String therapy;

        // 🧠 Rule-based AI (PDF EXPECTED)
        if (symptom.contains("back pain")) {
            therapy = "Physiotherapy";
        } else if (symptom.contains("stress")) {
            therapy = "Yoga / Meditation";
        } else if (symptom.contains("digestion")) {
            therapy = "Ayurveda";
        } else if (symptom.contains("muscle")) {
            therapy = "Chiropractic";
        } else {
            therapy = "General Wellness Consultation";
        }

        // External API call (mock)
        healthApiService.fetchFdaDrugInfo();


        Recommendation recommendation = new Recommendation();
        recommendation.setUserId(userId);
        recommendation.setSymptom(request.getSymptom());
        recommendation.setSuggestedTherapy(therapy);
        recommendation.setSourceAPI("Internal AI Engine");
        recommendation.setTimestamp(LocalDateTime.now());

        Recommendation saved = recommendationRepository.save(recommendation);

        // Notification
        notificationService.notifyUser(
                userId,
                "RECOMMENDATION",
                "New therapy suggested: " + therapy
        );

        return saved;
    }
}
