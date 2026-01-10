package com.wellness.backend.service.impl;

import com.wellness.backend.model.Order;
import com.wellness.backend.repository.OrderRepository;
import com.wellness.backend.repository.ProductRepository;
import com.wellness.backend.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repo;
    private final ProductRepository productRepo;

    public OrderServiceImpl(OrderRepository repo, ProductRepository productRepo) {
        this.repo = repo;
        this.productRepo = productRepo;
    }

    // 4.1 Place Order
    @Override
    public Order placeOrder(Order order) {

        var product = productRepo.findById(order.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < order.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        // reduce stock
        product.setStock(product.getStock() - order.getQuantity());
        productRepo.save(product);

        // calculate total
        order.setTotalAmount(product.getPrice() * order.getQuantity());

        return repo.save(order);
    }

    // 4.2 Get Orders by User
    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return repo.findByUserId(userId);
    }
}
