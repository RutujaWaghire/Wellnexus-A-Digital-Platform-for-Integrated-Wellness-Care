package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.PractitionerRating;
import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PractitionerRatingRepository extends JpaRepository<PractitionerRating, Long> {
    List<PractitionerRating> findByPractitioner(PractitionerProfile practitioner);
    Optional<PractitionerRating> findByPractitionerAndUser(PractitionerProfile practitioner, User user);
}
