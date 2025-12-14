package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_user_id", nullable = false)
    private User user;

    @Column(name = "_product_id")
    private Long productId;

    @Column(name = "_quantity")
    private Integer quantity;

    @Column(name = "_total_amount")
    private Double totalAmount;

    @Column(name = "_order_date")
    private String orderDate;

    @Column(name = "_status")
    private String status;
}
