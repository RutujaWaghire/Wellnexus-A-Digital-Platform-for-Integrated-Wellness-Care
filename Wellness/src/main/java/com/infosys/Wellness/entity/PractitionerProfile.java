package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PractitionerProfile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PractitionerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    // FK → User._id
    @OneToOne
    @JoinColumn(name = "_userId", nullable = false, unique = true)
    private User user;

    @Column(name = "_specialization")
    private String specialization;

    @Column(name = "_verified")
    private Boolean verified = false;

    @Column(name = "_rating")
    private Double rating = 0.0;
}
