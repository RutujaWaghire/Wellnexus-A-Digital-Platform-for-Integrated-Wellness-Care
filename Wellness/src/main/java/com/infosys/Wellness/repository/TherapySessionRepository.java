package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TherapySessionRepository extends JpaRepository<TherapySession, Long> {

    // Already added methods...
    List<TherapySession> findByPractitioner_Id(Long practitionerId);
    List<TherapySession> findByPractitioner_IdAndSlotStartBetween(Long practitionerId, LocalDateTime from, LocalDateTime to);
    List<TherapySession> findByPractitioner_IdAndSlotStartBetweenAndStatusNot(
            Long practitionerId, LocalDateTime from, LocalDateTime to, String excludedStatus);

    // ⬅⬅⬅ ADD THIS
    List<TherapySession> findByUser(User user);

    // Optional safer version:
    List<TherapySession> findByUser_Id(Long userId);
}
