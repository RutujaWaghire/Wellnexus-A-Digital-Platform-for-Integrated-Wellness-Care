package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public class TherapySessionCreateRequest {

    private Long practitionerId;
    private LocalDateTime slotStart;
    private LocalDateTime slotEnd;
    private String notes;

    public Long getPractitionerId() {
        return practitionerId;
    }
    public void setPractitionerId(Long practitionerId) {
        this.practitionerId = practitionerId;
    }

    public LocalDateTime getSlotStart() {
        return slotStart;
    }
    public void setSlotStart(LocalDateTime slotStart) {
        this.slotStart = slotStart;
    }

    public LocalDateTime getSlotEnd() {
        return slotEnd;
    }
    public void setSlotEnd(LocalDateTime slotEnd) {
        this.slotEnd = slotEnd;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
