package com.wellness.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "practitioner_profile")
public class PractitionerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // _id

    @Column(nullable = false)
    private Long userId;   // _userId

    @Column(nullable = false)
    private String specialization;   // _specialization

    @Column(nullable = false)
    private Boolean verified = false;   // _verified

    @Column
    private Double rating = 0.0;   // _rating

    // getters and setters
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

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
