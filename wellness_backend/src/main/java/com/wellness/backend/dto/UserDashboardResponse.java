package com.wellness.backend.dto;

import com.wellness.backend.model.Order;
import com.wellness.backend.model.TherapySession;

import java.util.List;

public class UserDashboardResponse {

    private Long userId;
    private List<TherapySession> sessions;
    private List<Order> orders;

    // REQUIRED constructor
    public UserDashboardResponse(Long userId,
                                 List<TherapySession> sessions,
                                 List<Order> orders) {
        this.userId = userId;
        this.sessions = sessions;
        this.orders = orders;
    }

    // getters
    public Long getUserId() {
        return userId;
    }

    public List<TherapySession> getSessions() {
        return sessions;
    }

    public List<Order> getOrders() {
        return orders;
    }
}
