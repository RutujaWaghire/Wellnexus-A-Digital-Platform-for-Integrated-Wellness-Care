package com.infosys.Wellness.dto;

public class PractitionerListResponse {

    private Long id;
    private String name;
    private String email;
    private String specialization;

    public PractitionerListResponse(Long id, String name, String email, String specialization) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.specialization = specialization;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getSpecialization() { return specialization; }
}
