package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.Order;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.OrderRepository;
import com.infosys.Wellness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;   // NEW

    // 1) CREATE order for the currently logged-in user
    @PostMapping
    public Order createOrder(@RequestBody Order order) {

        // username = email (we set this in CustomUserDetailsService)
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        order.setUser(user);        // link order to that user
        return orderRepository.save(order);
    }

    // 2) GET orders of any user (you already had this)
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderRepository.findByUser_Id(userId);
    }
}
