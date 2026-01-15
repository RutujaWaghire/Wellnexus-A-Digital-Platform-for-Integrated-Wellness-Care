package com.infosys.Wellness.service;

import com.infosys.Wellness.dto.TherapySessionCreateRequest;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.exception.SlotAlreadyBookedException;
import com.infosys.Wellness.repository.PractitionerAvailabilityRepository;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.TherapySessionRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class BookingService {

    private final TherapySessionRepository sessionRepo;
    private final PractitionerProfileRepository practitionerRepo;
    private final PractitionerAvailabilityRepository availabilityRepo;
    private final UserRepository userRepository;

    public BookingService(
            TherapySessionRepository sessionRepo,
            PractitionerProfileRepository practitionerRepo,
            PractitionerAvailabilityRepository availabilityRepo,
            UserRepository userRepository
    ) {
        this.sessionRepo = sessionRepo;
        this.practitionerRepo = practitionerRepo;
        this.availabilityRepo = availabilityRepo;
        this.userRepository = userRepository;
    }

    @Transactional
    public TherapySession bookSession(TherapySessionCreateRequest req, Long userId) {

        if (req.getSlotStart() == null) {
            throw new IllegalArgumentException("slotStart is required");
        }

        LocalDateTime slotStart = req.getSlotStart();
        LocalDateTime slotEnd = (req.getSlotEnd() != null)
                ? req.getSlotEnd()
                : slotStart.plus(Duration.ofMinutes(30));

        // 🔹 Fetch practitioner
        PractitionerProfile practitioner =
                practitionerRepo.findById(req.getPractitionerId())
                        .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        // 🔹 Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔹 Validate slot is inside practitioner availability (Milestone-2 CORE)
        boolean available =
                availabilityRepo.existsByPractitionerIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                        practitioner.getId(),
                        slotStart,
                        slotEnd
                );

        if (!available) {
            throw new IllegalStateException("Selected slot is not within practitioner availability");
        }

        TherapySession session = new TherapySession();
        session.setPractitioner(practitioner);
        session.setUser(user);
        session.setSlotStart(slotStart);
        session.setSlotEnd(slotEnd);
        session.setStatus("BOOKED");
        session.setCanceled(false);

        try {
            return sessionRepo.saveAndFlush(session);
        } catch (DataIntegrityViolationException ex) {
            // DB unique constraint (_practitionerId + _slotStart)
            throw new SlotAlreadyBookedException("Slot already booked");
        }
    }
}
