package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.TherapySessionCreateRequest;
import com.infosys.Wellness.entity.TherapySession;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.exception.SlotAlreadyBookedException;
import com.infosys.Wellness.repository.UserRepository;
import com.infosys.Wellness.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sessions")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookSession(Authentication auth, @RequestBody TherapySessionCreateRequest req) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            TherapySession saved = bookingService.bookSession(req, user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (SlotAlreadyBookedException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(java.util.Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("error", "Failed to book session", "details", ex.getMessage()));
        }
    }
}
