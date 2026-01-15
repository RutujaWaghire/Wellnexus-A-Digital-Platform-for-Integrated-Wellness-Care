package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.PractitionerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PractitionerProfileRepository extends JpaRepository<PractitionerProfile, Long> {

    Optional<PractitionerProfile> findByUser_Id(Long userId);

    List<PractitionerProfile> findBySpecializationContainingIgnoreCase(String specialization);
}
