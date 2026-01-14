package com.infosys.Wellness.controller;

import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.Role;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.UserRepository;
import com.infosys.Wellness.config.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PractitionerProfileRepository practitionerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        System.out.println("REGISTER HIT: " + user.getEmail() + " " + user.getRole());

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Normalize role
        user.setRole(Role.valueOf(user.getRole().name().toUpperCase()));

        // ✅ SAVE USER FIRST
        User savedUser = userRepository.save(user);

        // ✅ CREATE PRACTITIONER PROFILE AUTOMATICALLY
        if (savedUser.getRole() == Role.PRACTITIONER) {

            PractitionerProfile profile = new PractitionerProfile();

            profile.setUser(savedUser);        // 🔗 link to user
            profile.setVerified(false);         // pending verification

            // ✅ Leave editable fields EMPTY / DEFAULT
            profile.setSpecialization(null);    // will be filled from Edit Profile page
            profile.setRating(0.0);             // initial rating (can stay 0)

            practitionerProfileRepository.save(profile);
        }


        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginReq) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReq.getEmail(),
                        loginReq.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginReq.getEmail()).get();

        String token = jwtTokenProvider.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build()
        );

        return ResponseEntity.ok(token);
    }
}
