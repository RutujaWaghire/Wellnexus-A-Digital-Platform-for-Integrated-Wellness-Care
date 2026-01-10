package com.wellness.backend.service.impl;

import com.wellness.backend.model.Notification;
import com.wellness.backend.repository.NotificationRepository;
import com.wellness.backend.service.NotificationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notification createNotification(Long userId, String type, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setMessage(message);
        notification.setStatus("UNREAD");
        notification.setCreatedAt(LocalDateTime.now());
        return repository.save(notification);
    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification n = repository.findById(notificationId).orElseThrow();
        n.setStatus("READ");
        repository.save(n);
    }
}
