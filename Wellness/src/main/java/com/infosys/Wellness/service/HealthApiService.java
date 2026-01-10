package com.infosys.Wellness.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HealthApiService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String fetchFdaDrugInfo() {
        String url = "https://api.fda.gov/drug/label.json?limit=1";
        return restTemplate.getForObject(url, String.class);
    }
}
