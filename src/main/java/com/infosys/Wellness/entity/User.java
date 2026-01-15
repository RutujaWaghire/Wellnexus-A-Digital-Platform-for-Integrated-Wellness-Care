package com.infosys.Wellness.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
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

    @Enumerated(EnumType.STRING)
    @Column(name = "_role", nullable = false)
    private Role role;

    @Column(name = "_bio", length = 500)
    private String bio;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;   // ✅ correct & clean
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public String getBio() {
        return bio;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    // ===== ROLE ENUM =====
    public enum Role {
        ADMIN,
        PATIENT,
        PRACTITIONER
    }
}
