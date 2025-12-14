package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.PractitionerAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PractitionerAvailabilityRepository extends JpaRepository<PractitionerAvailability, Long> {

    List<PractitionerAvailability> findByPractitionerId(Long practitionerId);

    // must use LocalDateTime here
    List<PractitionerAvailability> findByPractitionerIdAndEndTimeAfterAndStartTimeBefore(
            Long practitionerId,
            LocalDateTime from,
            LocalDateTime to
    );
}
