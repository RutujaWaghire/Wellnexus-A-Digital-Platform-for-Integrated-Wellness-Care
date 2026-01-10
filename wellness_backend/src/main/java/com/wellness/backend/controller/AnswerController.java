package com.wellness.backend.controller;

import com.wellness.backend.model.Answer;
import com.wellness.backend.service.AnswerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // POST ANSWER
    @PostMapping
    public Answer postAnswer(@RequestBody Answer answer) {
        return answerService.postAnswer(answer);
    }

    // GET ANSWERS BY QUESTION
    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestion(@PathVariable Long questionId) {
        return answerService.getAnswersByQuestion(questionId);
    }
}
