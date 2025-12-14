package com.infosys.Wellness.controller;

import com.infosys.Wellness.dto.SlotDto;
import com.infosys.Wellness.service.SlotService;
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

    @GetMapping("/{id}/slots")
    public ResponseEntity<List<SlotDto>> getSlots(
            @PathVariable("id") Long practitionerId,
            @RequestParam("from") String fromIso,
            @RequestParam("to") String toIso,
            @RequestParam(value="slotDurationMinutes", required=false) Integer slotMinutes) {

        LocalDateTime from = LocalDateTime.parse(fromIso);
        LocalDateTime to = LocalDateTime.parse(toIso);
        Duration duration = slotMinutes == null ? null : Duration.ofMinutes(slotMinutes);
        List<SlotDto> slots = slotService.generateSlots(practitionerId, from, to, duration);
        return ResponseEntity.ok(slots);
    }
}
