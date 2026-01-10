package com.wellness.backend.integration;

import org.springframework.stereotype.Service;

@Service
public class ExternalHealthApiService {

    public String fetchTherapyRecommendation(String symptom) {

        // Mock AI logic (replace with OpenFDA / WHO later)
        if (symptom.toLowerCase().contains("stress")) {
            return "Cognitive Behavioral Therapy";
        } else if (symptom.toLowerCase().contains("anxiety")) {
            return "Mindfulness Therapy";
        } else if (symptom.toLowerCase().contains("sleep")) {
            return "Sleep Therapy";
        }
        return "General Wellness Consultation";
    }
}
