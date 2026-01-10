package com.infosys.Wellness.service;

import com.infosys.Wellness.entity.Notification;
import com.infosys.Wellness.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void notifyUser(Long userId, String type, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setMessage(message);
        notification.setStatus("UNREAD");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }
}
