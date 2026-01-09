package com.wellness.backend.repository;

import com.wellness.backend.model.ForumQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumQuestionRepository extends JpaRepository<ForumQuestion, Long> {
    // no extra methods needed yet
}
