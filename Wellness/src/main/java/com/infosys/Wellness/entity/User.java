package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false)
    private String name;

    @Column(name = "_email", nullable = false, unique = true)
    private String email;

    @Column(name = "_password", nullable = false)
    private String password;

    // patient / practitioner / admin (you can map to enum later if you want)
    @Column(name = "_role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "_bio", length = 500)
    private String bio;
}
