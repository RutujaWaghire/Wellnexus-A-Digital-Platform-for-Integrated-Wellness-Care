package com.wellness.backend.controller;

import com.wellness.backend.dto.UserDashboardResponse;
import com.wellness.backend.service.UserDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class UserDashboardController {

    private final UserDashboardService dashboardService;

    public UserDashboardController(UserDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDashboardResponse> getDashboard(@PathVariable String email) {

        //String email = authentication.getName(); // JWT email
        return ResponseEntity.ok(dashboardService.getDashboard(email));
    }
}
