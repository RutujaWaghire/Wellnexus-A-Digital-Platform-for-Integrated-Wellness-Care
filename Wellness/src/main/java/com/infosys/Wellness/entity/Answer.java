package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Question being answered
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // Practitioner who answered
    @ManyToOne
    @JoinColumn(name = "practitioner_id", nullable = false)
    private PractitionerProfile practitioner;

    @Column(nullable = false, length = 1000)
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters & Setters
    public Long getId() { return id; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public PractitionerProfile getPractitioner() { return practitioner; }
    public void setPractitioner(PractitionerProfile practitioner) {
        this.practitioner = practitioner;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
