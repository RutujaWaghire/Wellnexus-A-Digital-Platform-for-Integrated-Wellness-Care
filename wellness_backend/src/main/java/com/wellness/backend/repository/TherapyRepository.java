package com.wellness.backend.repository;

import com.wellness.backend.model.Therapy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TherapyRepository extends JpaRepository<Therapy, Long> {

    // Get therapies by practitioner
    List<Therapy> findByPractitionerId(Long practitionerId);

    // Search by category
    //List<Therapy> findByCategory(String category);
}
