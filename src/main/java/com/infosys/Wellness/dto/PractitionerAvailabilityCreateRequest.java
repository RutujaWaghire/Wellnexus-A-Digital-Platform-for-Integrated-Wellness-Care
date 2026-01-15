package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public class PractitionerAvailabilityCreateRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String note;

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
