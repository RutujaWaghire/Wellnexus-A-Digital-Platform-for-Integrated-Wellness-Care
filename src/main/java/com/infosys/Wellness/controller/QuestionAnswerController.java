package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.Answer;
import com.infosys.Wellness.entity.Question;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.AnswerRepository;
import com.infosys.Wellness.repository.QuestionRepository;
import com.infosys.Wellness.repository.UserRepository;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionAnswerController {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final PractitionerProfileRepository practitionerProfileRepository;

    // ✅ MANUAL CONSTRUCTOR (NO LOMBOK)
    public QuestionAnswerController(
            QuestionRepository questionRepository,
            AnswerRepository answerRepository,
            UserRepository userRepository,
            PractitionerProfileRepository practitionerProfileRepository) {

        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.practitionerProfileRepository = practitionerProfileRepository;
    }

    // your existing endpoints stay the same
}
