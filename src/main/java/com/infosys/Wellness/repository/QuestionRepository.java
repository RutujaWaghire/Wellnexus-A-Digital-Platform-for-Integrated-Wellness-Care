package com.infosys.Wellness.repository;

import com.infosys.Wellness.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
