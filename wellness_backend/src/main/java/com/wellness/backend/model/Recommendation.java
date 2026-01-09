package com.wellness.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String symptom;

    private String suggestedTherapy;

    private String sourceAPI;

    private LocalDateTime timestamp;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSymptom() {
        return symptom;
    }

    public void setSymptom(String symptom) {
        this.symptom = symptom;
    }

    public String getSuggestedTherapy() {
        return suggestedTherapy;
    }

    public void setSuggestedTherapy(String suggestedTherapy) {
        this.suggestedTherapy = suggestedTherapy;
    }

    public String getSourceAPI() {
        return sourceAPI;
    }

    public void setSourceAPI(String sourceAPI) {
        this.sourceAPI = sourceAPI;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
