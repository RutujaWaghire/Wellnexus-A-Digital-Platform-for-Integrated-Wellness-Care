package com.wellness.backend.repository;

import com.wellness.backend.model.PractitionerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PractitionerProfileRepository
        extends JpaRepository<PractitionerProfile, Long> {

    Optional<PractitionerProfile> findByUserId(Long userId);
}
