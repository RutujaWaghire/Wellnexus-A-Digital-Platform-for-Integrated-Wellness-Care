package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "practitioner_rating",
        uniqueConstraints = @UniqueConstraint(columnNames = {"practitioner_id", "user_id"})
)
public class PractitionerRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "practitioner_id")
    private PractitionerProfile practitioner;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int rating;

    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();

    // GETTERS & SETTERS
    public Long getId() { return id; }

    public PractitionerProfile getPractitioner() { return practitioner; }
    public void setPractitioner(PractitionerProfile practitioner) {
        this.practitioner = practitioner;
    }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
