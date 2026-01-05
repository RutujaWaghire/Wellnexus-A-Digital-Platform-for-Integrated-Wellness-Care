package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.*;
import com.infosys.Wellness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionAnswerController {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final PractitionerProfileRepository practitionerProfileRepository;

    // 🟢 PATIENT → Ask Question
    @PostMapping
    public Question askQuestion(@RequestBody String content) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Question question = new Question();
        question.setUser(user);
        question.setContent(content);

        return questionRepository.save(question);
    }

    @PostMapping("/{questionId}/answers")
    public Answer answerQuestion(@PathVariable Long questionId,
                                 @RequestBody String content) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PractitionerProfile practitioner = practitionerProfileRepository
                .findByUser_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("Practitioner not found"));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setPractitioner(practitioner);
        answer.setContent(content);

        return answerRepository.save(answer);
    }

}
