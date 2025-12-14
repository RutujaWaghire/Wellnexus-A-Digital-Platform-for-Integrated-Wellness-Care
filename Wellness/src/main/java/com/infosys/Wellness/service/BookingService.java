package com.infosys.Wellness.service;

import com.infosys.Wellness.dto.TherapySessionCreateRequest;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.exception.SlotAlreadyBookedException;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.TherapySessionRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class BookingService {

    private final TherapySessionRepository sessionRepo;
    private final PractitionerProfileRepository practitionerRepo;

    public BookingService(TherapySessionRepository sessionRepo,
                          PractitionerProfileRepository practitionerRepo) {
        this.sessionRepo = sessionRepo;
        this.practitionerRepo = practitionerRepo;
    }

    @Transactional
    public TherapySession bookSession(TherapySessionCreateRequest req, Long userId) {

        LocalDateTime slotStart = req.getSlotStart();
        LocalDateTime slotEnd = (req.getSlotEnd() != null)
                ? req.getSlotEnd()
                : slotStart.plus(Duration.ofMinutes(30));

        PractitionerProfile practitioner = practitionerRepo.getReferenceById(req.getPractitionerId());

        TherapySession session = new TherapySession();
        session.setPractitioner(practitioner);
        session.setUser(null); // TODO: fetch & set the User entity by userId
        session.setSlotStart(slotStart);
        session.setSlotEnd(slotEnd);
        session.setStatus("BOOKED");
        session.setCanceled(false);

        try {
            return sessionRepo.saveAndFlush(session);
        } catch (DataIntegrityViolationException ex) {
            // when DB unique constraint (practitioner + slot) is violated
            throw new SlotAlreadyBookedException("Slot already booked");
        }
    }
}
