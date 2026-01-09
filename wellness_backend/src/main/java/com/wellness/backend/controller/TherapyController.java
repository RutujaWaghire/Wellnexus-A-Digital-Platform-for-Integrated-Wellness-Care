package com.wellness.backend.controller;

import com.wellness.backend.model.Therapy;
import com.wellness.backend.service.impl.TherapyServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/therapies")
@CrossOrigin("*")
public class TherapyController {

    private final TherapyServiceImpl therapyService;

    public TherapyController(TherapyServiceImpl therapyService) {
        this.therapyService = therapyService;
    }

    // CREATE
    @PostMapping("/add")
    public Therapy addTherapy(@RequestBody Therapy therapy) {
        return therapyService.addTherapy(therapy);
    }

    // READ - All
    @GetMapping("/get")
    public List<Therapy> getAllTherapies() {
        return therapyService.getAllTherapies();
    }

    // READ - By ID
    @GetMapping("/{id}")
    public Therapy getTherapyById(@PathVariable Long id) {
        return therapyService.getTherapyById(id);
    }

    // READ - By Practitioner
    @GetMapping("/practitioner/{practitionerId}")
    public List<Therapy> getTherapiesByPractitioner(@PathVariable Long practitionerId) {
        return therapyService.getTherapiesByPractitioner(practitionerId);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public Therapy updateTherapy(@PathVariable Long id, @RequestBody Therapy therapy) {
        return therapyService.updateTherapy(id, therapy);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteTherapy(@PathVariable Long id) {
        therapyService.deleteTherapy(id);
        return "Therapy deleted successfully!";
    }
}
