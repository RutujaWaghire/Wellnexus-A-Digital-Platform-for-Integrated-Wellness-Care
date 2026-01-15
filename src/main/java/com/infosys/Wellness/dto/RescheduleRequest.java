package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public class RescheduleRequest {

    private LocalDateTime newSlotStart;
    private LocalDateTime newSlotEnd;

    public LocalDateTime getNewSlotStart() {
        return newSlotStart;
    }

    public void setNewSlotStart(LocalDateTime newSlotStart) {
        this.newSlotStart = newSlotStart;
    }

    public LocalDateTime getNewSlotEnd() {
        return newSlotEnd;
    }

    public void setNewSlotEnd(LocalDateTime newSlotEnd) {
        this.newSlotEnd = newSlotEnd;
    }
}
