package com.wellness.backend.service;

import com.wellness.backend.model.Question;
import java.util.List;

public interface QuestionService {

    Question postQuestion(Question question);

    List<Question> getAllQuestions();

    Question getQuestionById(Long id);
}
