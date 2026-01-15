package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    // Get all recommendations for a user
    List<Recommendation> findByUserId(Long userId);
}
