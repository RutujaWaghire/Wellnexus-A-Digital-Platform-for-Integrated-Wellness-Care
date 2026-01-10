package com.infosys.Wellness.controller;

import com.infosys.Wellness.service.HealthApiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
public class HealthApiController {

    private final HealthApiService healthApiService;

    public HealthApiController(HealthApiService healthApiService) {
        this.healthApiService = healthApiService;
    }

    @GetMapping("/fda")
    public String getFdaHealthData() {
        return healthApiService.fetchFdaDrugInfo();
    }
}
