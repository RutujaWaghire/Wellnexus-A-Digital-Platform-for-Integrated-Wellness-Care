package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.PractitionerAvailabilityCreateRequest;
import com.infosys.Wellness.dto.PractitionerAvailabilityResponse;
import com.infosys.Wellness.entity.PractitionerAvailability;
import com.infosys.Wellness.repository.PractitionerAvailabilityRepository;
import com.infosys.Wellness.security.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/practitioners")
public class PractitionerAvailabilityController {

    private final PractitionerAvailabilityRepository availabilityRepo;
    private final AuthService authService;

    public PractitionerAvailabilityController(PractitionerAvailabilityRepository availabilityRepo,
                                              AuthService authService) {
        this.availabilityRepo = availabilityRepo;
        this.authService = authService;
    }

    @PostMapping("/me/availability")
    public ResponseEntity<?> createAvailability(@RequestBody PractitionerAvailabilityCreateRequest req) {
        Long practitionerId = authService.requireCurrentPractitionerId();

        if (req.getEndTime() == null || req.getStartTime() == null) {
            return ResponseEntity.badRequest().body("startTime and endTime are required (LocalDateTime).");
        }
        if (req.getEndTime().isBefore(req.getStartTime()) || req.getEndTime().isEqual(req.getStartTime())) {
            return ResponseEntity.badRequest().body("endTime must be after startTime");
        }

        PractitionerAvailability availability = new PractitionerAvailability();
        availability.setPractitionerId(practitionerId);
        availability.setStartTime(req.getStartTime());
        availability.setEndTime(req.getEndTime());
        availability.setNote(req.getNote());

        PractitionerAvailability saved = availabilityRepo.save(availability);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(saved));
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<List<PractitionerAvailabilityResponse>> listAvailability(
            @PathVariable Long id,
            @RequestParam(value = "from", required = false) String fromIso,
            @RequestParam(value = "to", required = false) String toIso) {

        List<PractitionerAvailability> availabilities;

        if (fromIso != null && toIso != null) {
            LocalDateTime fromTime;
            LocalDateTime toTime;
            try {
                fromTime = LocalDateTime.parse(fromIso);
                toTime = LocalDateTime.parse(toIso);
            } catch (Exception ex) {
                return ResponseEntity.badRequest().build();
            }

            availabilities = availabilityRepo.findByPractitionerIdAndEndTimeAfterAndStartTimeBefore(
                    id, fromTime, toTime
            );
        } else {
            availabilities = availabilityRepo.findByPractitionerId(id);
        }

        List<PractitionerAvailabilityResponse> response =
                availabilities.stream().map(this::mapToResponse).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/me/availability/{id}")
    public ResponseEntity<?> deleteAvailability(@PathVariable Long id) {
        Long practitionerId = authService.requireCurrentPractitionerId();

        Optional<PractitionerAvailability> found = availabilityRepo.findById(id);
        if (found.isEmpty()) return ResponseEntity.notFound().build();

        PractitionerAvailability availability = found.get();
        if (!availability.getPractitionerId().equals(practitionerId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        availabilityRepo.delete(availability);
        return ResponseEntity.noContent().build();
    }

    private PractitionerAvailabilityResponse mapToResponse(PractitionerAvailability a) {
        PractitionerAvailabilityResponse r = new PractitionerAvailabilityResponse();
        r.setId(a.getId());
        r.setPractitionerId(a.getPractitionerId());
        r.setStartTime(a.getStartTime());
        r.setEndTime(a.getEndTime());
        r.setNote(a.getNote());
        return r;
    }
}
