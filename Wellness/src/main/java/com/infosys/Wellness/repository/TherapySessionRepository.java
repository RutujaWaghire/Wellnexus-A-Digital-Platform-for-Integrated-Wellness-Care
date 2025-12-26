package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TherapySessionRepository extends JpaRepository<TherapySession, Long> {

    // Practitioner based queries
    List<TherapySession> findByPractitioner_Id(Long practitionerId);

    List<TherapySession> findByPractitioner_IdAndSlotStartBetween(
            Long practitionerId,
            LocalDateTime from,
            LocalDateTime to
    );

    //  REQUIRED for SlotService
    List<TherapySession> findByPractitioner_IdAndSlotStartBetweenAndStatusIn(
            Long practitionerId,
            LocalDateTime from,
            LocalDateTime to,
            List<String> statuses
    );

    // User based queries
    List<TherapySession> findByUser(User user);

    List<TherapySession> findByUser_Id(Long userId);
}
