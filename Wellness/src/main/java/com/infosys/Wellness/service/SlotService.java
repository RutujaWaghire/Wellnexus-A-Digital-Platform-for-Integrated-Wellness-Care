package com.infosys.Wellness.service;

import com.infosys.Wellness.dto.SlotDto;
import com.infosys.Wellness.entity.PractitionerAvailability;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.repository.PractitionerAvailabilityRepository;
import com.infosys.Wellness.repository.TherapySessionRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SlotService {

    private final PractitionerAvailabilityRepository availabilityRepo;
    private final TherapySessionRepository sessionRepo;
    private final Duration defaultSlotDuration = Duration.ofMinutes(30);

    public SlotService(PractitionerAvailabilityRepository availabilityRepo,
                       TherapySessionRepository sessionRepo) {
        this.availabilityRepo = availabilityRepo;
        this.sessionRepo = sessionRepo;
    }

    /**
     * Generate available slots for a practitioner between from..to with given slotDuration.
     * Uses LocalDateTime (no timezone conversion here). Excludes sessions whose status == "CANCELED".
     */
    public List<SlotDto> generateSlots(Long practitionerId, LocalDateTime from, LocalDateTime to, Duration slotDuration) {
        if (slotDuration == null) slotDuration = defaultSlotDuration;

        List<PractitionerAvailability> availabilities =
                availabilityRepo.findByPractitionerIdAndEndTimeAfterAndStartTimeBefore(practitionerId, from, to);

        List<TherapySession> booked = sessionRepo.findByPractitioner_IdAndSlotStartBetweenAndStatusNot(
                practitionerId, from, to, "CANCELED");

        Set<LocalDateTime> bookedStarts = booked.stream()
                .map(TherapySession::getSlotStart)
                .collect(Collectors.toSet());

        List<SlotDto> slots = new ArrayList<>();
        for (PractitionerAvailability a : availabilities) {
            LocalDateTime s = a.getStartTime().isBefore(from) ? from : a.getStartTime();
            LocalDateTime end = a.getEndTime().isAfter(to) ? to : a.getEndTime();
            while (!s.plus(slotDuration).isAfter(end)) {
                if (!bookedStarts.contains(s)) {
                    SlotDto slot = new SlotDto();
                    slot.setStart(s);
                    slot.setEnd(s.plus(slotDuration));
                    slots.add(slot);
                }
                s = s.plus(slotDuration);
            }
        }
        slots.sort(Comparator.comparing(SlotDto::getStart));
        return slots;
    }
}
