package com.wellness.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "therapies")
public class Therapy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "category")
    private String category;

    private Long practitionerId;

    private Double price;

    // Constructors
    public Therapy() { }

    public Therapy(String name, String category, Long practitionerId, Double price) {
        this.name = name;
        this.category = category;
        this.practitionerId = practitionerId;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public Long getPractitionerId() { return practitionerId; }

    public void setPractitionerId(Long practitionerId) { this.practitionerId = practitionerId; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) { this.price = price; }
}
