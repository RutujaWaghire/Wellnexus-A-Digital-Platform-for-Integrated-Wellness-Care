package com.wellness.backend.repository;

import com.wellness.backend.model.TherapySession;
import com.wellness.backend.model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TherapySessionRepository extends JpaRepository<TherapySession, Long> {

    List<TherapySession> findByStatus(SessionStatus status);

    List<TherapySession> findByPractitionerId(Long practitionerId);

    List<TherapySession> findByUserId(Long userId);
}
