package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false)
    private String name;

    @Column(name = "_price", nullable = false)
    private Double price;

    @Column(name = "_stock", nullable = false)
    private Integer stock;

    @Column(name = "_category")
    private String category;
}
