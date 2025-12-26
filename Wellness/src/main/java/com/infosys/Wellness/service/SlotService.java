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

    private static final Duration DEFAULT_SLOT_DURATION = Duration.ofMinutes(30);

    public SlotService(
            PractitionerAvailabilityRepository availabilityRepo,
            TherapySessionRepository sessionRepo
    ) {
        this.availabilityRepo = availabilityRepo;
        this.sessionRepo = sessionRepo;
    }

    /**
     * Generate available slots for a practitioner between from..to
     * - Uses LocalDateTime
     * - Excludes BOOKED / COMPLETED sessions
     * - Removes duplicate slots caused by overlapping availability
     */
    public List<SlotDto> generateSlots(
            Long practitionerId,
            LocalDateTime from,
            LocalDateTime to,
            Duration slotDuration
    ) {

        if (slotDuration == null) {
            slotDuration = DEFAULT_SLOT_DURATION;
        }

        //  Fetch availability overlapping requested window
        List<PractitionerAvailability> availabilities =
                availabilityRepo.findByPractitionerIdAndEndTimeAfterAndStartTimeBefore(
                        practitionerId, from, to
                );

        //  Fetch sessions that block slots
        List<TherapySession> bookedSessions =
                sessionRepo.findByPractitioner_IdAndSlotStartBetweenAndStatusIn(
                        practitionerId,
                        from,
                        to,
                        List.of("BOOKED", "COMPLETED")
                );

        Set<LocalDateTime> bookedStarts = bookedSessions.stream()
                .map(TherapySession::getSlotStart)
                .collect(Collectors.toSet());

        //  Generate slots (with de-duplication)
        Set<LocalDateTime> uniqueStarts = new HashSet<>();
        List<SlotDto> slots = new ArrayList<>();

        for (PractitionerAvailability availability : availabilities) {

            LocalDateTime cursor =
                    availability.getStartTime().isBefore(from)
                            ? from
                            : availability.getStartTime();

            LocalDateTime availabilityEnd =
                    availability.getEndTime().isAfter(to)
                            ? to
                            : availability.getEndTime();

            while (!cursor.plus(slotDuration).isAfter(availabilityEnd)) {

                if (!bookedStarts.contains(cursor) && uniqueStarts.add(cursor)) {
                    SlotDto slot = new SlotDto();
                    slot.setStart(cursor);
                    slot.setEnd(cursor.plus(slotDuration));
                    slots.add(slot);
                }

                cursor = cursor.plus(slotDuration);
            }
        }

        //  Sort chronologically
        slots.sort(Comparator.comparing(SlotDto::getStart));
        return slots;
    }
}
