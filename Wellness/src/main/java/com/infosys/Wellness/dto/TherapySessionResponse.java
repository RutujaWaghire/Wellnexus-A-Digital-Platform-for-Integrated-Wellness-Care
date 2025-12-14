package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public class TherapySessionResponse {
    private Long id;
    private String practitionerName;
    private String practitionerSpecialization;
    private LocalDateTime slotStart;
    private LocalDateTime slotEnd;
    private String status;
    private String notes;

    public TherapySessionResponse(Long id, String practitionerName, String practitionerSpecialization,
                                  LocalDateTime slotStart, LocalDateTime slotEnd, String status, String notes) {
        this.id = id;
        this.practitionerName = practitionerName;
        this.practitionerSpecialization = practitionerSpecialization;
        this.slotStart = slotStart;
        this.slotEnd = slotEnd;
        this.status = status;
        this.notes = notes;
    }

    // getters (and setters if you prefer)
    public Long getId() { return id; }
    public String getPractitionerName() { return practitionerName; }
    public String getPractitionerSpecialization() { return practitionerSpecialization; }
    public LocalDateTime getSlotStart() { return slotStart; }
    public LocalDateTime getSlotEnd() { return slotEnd; }
    public String getStatus() { return status; }
    public String getNotes() { return notes; }
}
