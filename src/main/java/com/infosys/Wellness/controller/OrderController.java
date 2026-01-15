package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.OrderRequestDTO;
import com.infosys.Wellness.entity.Order;
import com.infosys.Wellness.entity.Product;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.OrderRepository;
import com.infosys.Wellness.repository.ProductRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // ✅ MANUAL CONSTRUCTOR (NO LOMBOK)
    public OrderController(OrderRepository orderRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // ================= CREATE ORDER =================
    @PostMapping
    public Order createOrder(@RequestBody OrderRequestDTO request) {

        // Get logged-in user
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check stock
        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        // Reduce stock
        product.setStock(product.getStock() - request.getQuantity());
        productRepository.save(product);

        double totalAmount = product.getPrice() * request.getQuantity();

        // ✅ NO builder(), NO Lombok
        Order order = new Order();
        order.setUser(user);
        order.setProductId(product.getId());
        order.setQuantity(request.getQuantity());
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now().toString());
        order.setStatus("PLACED");

        return orderRepository.save(order);
    }

    // ================= GET MY ORDERS =================
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
