package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.Notification;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.NotificationRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository,
                                  UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    // FIXED
    @GetMapping
    public List<Notification> getUserNotifications(Authentication authentication) {

        // authentication.getName() gives EMAIL
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepository.findByUserId(user.getId());
    }

    @PatchMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setStatus("READ");
        notificationRepository.save(notification);
    }
}
