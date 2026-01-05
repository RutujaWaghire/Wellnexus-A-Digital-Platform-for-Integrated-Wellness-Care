package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.OrderRequestDTO;
import com.infosys.Wellness.entity.Order;
import com.infosys.Wellness.entity.Product;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.OrderRepository;
import com.infosys.Wellness.repository.ProductRepository;
import com.infosys.Wellness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // CREATE PRODUCT ORDER (PATIENT)
    @PostMapping
    public Order createOrder(@RequestBody OrderRequestDTO request) {

        // Get logged-in user email
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        // Reduce product stock
        product.setStock(product.getStock() - request.getQuantity());
        productRepository.save(product);

        double totalAmount = product.getPrice() * request.getQuantity();

        Order order = Order.builder()
                .user(user)
                .productId(product.getId())
                .quantity(request.getQuantity())
                .totalAmount(totalAmount)
                .orderDate(LocalDateTime.now().toString())
                .status("PLACED")
                .build();

        return orderRepository.save(order);
    }

    // GET orders of logged-in user
    @GetMapping("/my")
    public List<Order> getMyOrders() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser_Id(user.getId());
    }
}
