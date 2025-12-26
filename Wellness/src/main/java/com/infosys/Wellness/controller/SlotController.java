package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.SlotDto;
import com.infosys.Wellness.service.SlotService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/practitioners")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    /**
     * Browse available slots for a practitioner (Patient API)
     *
     * Example:
     * GET /api/practitioners/5/slots
     * ?from=2025-12-16T10:00
     * &to=2025-12-16T13:00
     * &slotDurationMinutes=30
     */
    @GetMapping("/{id}/slots")
    public ResponseEntity<List<SlotDto>> getSlots(
            @PathVariable("id") Long practitionerId,

            @RequestParam("from")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime from,

            @RequestParam("to")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime to,

            @RequestParam(value = "slotDurationMinutes", required = false)
            Integer slotMinutes
    ) {

        // Validation
        if (from.isAfter(to)) {
            return ResponseEntity.badRequest().build();
        }

        // Default slot duration = 30 minutes
        Duration duration = (slotMinutes == null)
                ? Duration.ofMinutes(30)
                : Duration.ofMinutes(slotMinutes);

        List<SlotDto> slots =
                slotService.generateSlots(practitionerId, from, to, duration);

        return ResponseEntity.ok(slots);
    }
}
