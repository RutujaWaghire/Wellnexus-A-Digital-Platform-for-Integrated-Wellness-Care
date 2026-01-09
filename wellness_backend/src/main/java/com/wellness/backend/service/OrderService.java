package com.wellness.backend.service;

import com.wellness.backend.model.Order;
import java.util.List;

public interface OrderService {

    // 4.1 Place order
    Order placeOrder(Order order);

    // 4.2 Get orders by user
    List<Order> getOrdersByUser(Long userId);
}
