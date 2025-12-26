package com.infosys.Wellness.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "therapy_session")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TherapySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    // FK → PractitionerProfile._id
    @ManyToOne
    @JoinColumn(name = "_practitionerId", nullable = false)
    private PractitionerProfile practitioner;

    // FK → User._id (patient)
    @ManyToOne
    @JoinColumn(name = "_userId", nullable = false)
    private User user;

    // Optional: You can remove this if using slotStart only
    @Column(name = "_date")
    private LocalDateTime date;

    // BOOKED / COMPLETED / CANCELED / RESCHEDULED
    @Column(name = "_status")
    private String status;

    @Column(name = "_notes", length = 1000)
    private String notes;

    // NEW FIELDS FOR MILESTONE 2

    // Slot start time (actual booked slot)
    @Column(name = "_slotStart")
    private LocalDateTime slotStart;

    // Slot end time
    @Column(name = "_slotEnd")
    private LocalDateTime slotEnd;

    // Cancel flag
    @Column(name = "_canceled")
    private Boolean canceled = false;

    // Reason for cancel (optional)
    @Column(name = "_cancelReason", length = 500)
    private String cancelReason;

    // Link to previous session if rescheduled
    @Column(name = "_rescheduledFrom")
    private Long rescheduledFrom;

    // new field for calendar reminder
    @Column(name = "_reminderAt")
    private LocalDateTime reminderAt;
}
