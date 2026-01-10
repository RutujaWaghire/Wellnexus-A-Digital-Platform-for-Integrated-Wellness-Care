package com.wellness.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "therapy_sessions")
public class TherapySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long practitionerId;
    private String therapistName;
    private String sessionDate;  // previously missing
    private String notes;        // previously missing

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    public TherapySession() {}

    public TherapySession(Long userId, Long practitionerId, String therapistName, String sessionDate, SessionStatus status, String notes) {
        this.userId = userId;
        this.practitionerId = practitionerId;
        this.therapistName = therapistName;
        this.sessionDate = sessionDate;
        this.status = status;
        this.notes = notes;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getPractitionerId() { return practitionerId; }
    public void setPractitionerId(Long practitionerId) { this.practitionerId = practitionerId; }
    public String getTherapistName() { return therapistName; }
    public void setTherapistName(String therapistName) { this.therapistName = therapistName; }
    public String getSessionDate() { return sessionDate; }
    public void setSessionDate(String sessionDate) { this.sessionDate = sessionDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public SessionStatus getStatus() { return status; }
    public void setStatus(SessionStatus status) { this.status = status; }
}
