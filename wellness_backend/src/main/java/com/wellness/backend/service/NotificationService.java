package com.wellness.backend.service;

import com.wellness.backend.model.Notification;

import java.util.List;

public interface NotificationService {
    Notification createNotification(Long userId, String type, String message);
    List<Notification> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
}
