package com.infosys.Wellness.scheduler;

import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.repository.TherapySessionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReminderScheduler {

    private final TherapySessionRepository sessionRepo;

    public ReminderScheduler(TherapySessionRepository sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    // runs every 1 minute
    @Scheduled(fixedRate = 60000)
    public void checkReminders() {
        LocalDateTime now = LocalDateTime.now();

        List<TherapySession> due = sessionRepo.findAll()
                .stream()
                .filter(s -> s.getReminderAt() != null)
                .filter(s -> !s.getStatus().equals("CANCELED"))
                .filter(s -> s.getReminderAt().isBefore(now) || s.getReminderAt().isEqual(now))
                .toList();

        if (!due.isEmpty()) {
            due.forEach(s -> {
                System.out.println(
                        "\n🔔 REMINDER: Session " + s.getId() +
                                " scheduled at " + s.getSlotStart() +
                                " with " + s.getPractitioner().getUser().getName()
                );

                // clear reminder after fired (optional)
                s.setReminderAt(null);
                sessionRepo.save(s);
            });
        }
    }
}
