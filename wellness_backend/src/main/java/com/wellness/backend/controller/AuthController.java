package com.wellness.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wellness.backend.model.User;
import com.wellness.backend.repository.UserRepository;
import com.wellness.backend.security.JwtUtil;
import com.wellness.backend.service.impl.OtpService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    OtpService otpService;

    // ---------------- Register ----------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already registered!");
        }

        userRepository.save(user);
        otpService.generateOtp(user.getEmail());
        return ResponseEntity.ok("User registered successfully!");
    }

    // ---------------- Login ----------------
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (!existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }

        User dbUser = existingUser.get();

        // TEMP SIMPLE PASSWORD CHECK
        if (!user.getPassword().equals(dbUser.getPassword())) {
            return ResponseEntity.badRequest().body("Error: Incorrect password!");
        }

        // ✅ Generate JWT Token
        String role = dbUser.getRole();
        if (role == null || role.isEmpty()) {
            role = "USER";
        }

        String token = jwtUtil.generateToken(
                dbUser.getEmail(),
                role
        );




        return ResponseEntity.ok(token);
    }
}
