package com.infosys.Wellness.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false)
    private String name;

    @Column(name = "_price", nullable = false)
    private double price;

    @Column(name = "_stock", nullable = false)
    private int stock;

    @Column(name = "_category")
    private String category;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;   // ✅ THIS FIXES YOUR ERROR
    }

    public String getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setStock(int stock) {
        this.stock = stock;   // ✅ REQUIRED
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
