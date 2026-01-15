package com.infosys.Wellness.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "practitioner_profile")
public class PractitionerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_specialization")
    private String specialization;

    @Column(name = "_verified")
    private boolean verified;

    @Column(name = "_rating")
    private double rating;   // ✅ ADD THIS FIELD

    @OneToOne
    @JoinColumn(name = "_user_id", nullable = false)
    private User user;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public double getRating() {      // ✅ ADD
        return rating;
    }

    public void setRating(double rating) {   // ✅ THIS FIXES YOUR ERROR
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
