package com.wellness.backend.dto;

public class PractitionerDTO {

    private Long id;
    private String name;          // NEW
    private String email;
    private String password;      // NEW
    private String specialization;
    private boolean verified;

    // -----------------------------
    // Constructors
    // -----------------------------

    // Default constructor
    public PractitionerDTO() {}

    // Constructor for sending data (GET API)
    public PractitionerDTO(Long id, String email, String specialization, boolean verified) {
        this.id = id;
        this.email = email;
        this.specialization = specialization;
        this.verified = verified;
    }

    // Constructor for registration (POST API)
    public PractitionerDTO(String name, String email, String password, String specialization) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialization = specialization;
    }

    // -----------------------------
    // Getters & Setters
    // -----------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {     // REQUIRED
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {  // REQUIRED
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}
