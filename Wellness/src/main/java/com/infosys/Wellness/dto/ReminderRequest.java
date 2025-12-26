package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public class ReminderRequest {
    private LocalDateTime reminderAt;

    public LocalDateTime getReminderAt() {
        return reminderAt;
    }

    public void setReminderAt(LocalDateTime reminderAt) {
        this.reminderAt = reminderAt;
    }
}
