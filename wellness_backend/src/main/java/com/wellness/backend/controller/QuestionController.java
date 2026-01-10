package com.wellness.backend.controller;

import com.wellness.backend.model.Question;
import com.wellness.backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // POST QUESTION
    @PostMapping
    public Question postQuestion(@RequestBody Question question) {
        return questionService.postQuestion(question);
    }

    // GET ALL QUESTIONS
    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // GET QUESTION BY ID
    @GetMapping("/{id}")
    public Question getQuestion(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }
}
