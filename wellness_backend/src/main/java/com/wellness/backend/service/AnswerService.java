package com.wellness.backend.service;

import com.wellness.backend.model.Answer;
import java.util.List;

public interface AnswerService {

    Answer postAnswer(Answer answer);

    List<Answer> getAnswersByQuestion(Long questionId);
}
