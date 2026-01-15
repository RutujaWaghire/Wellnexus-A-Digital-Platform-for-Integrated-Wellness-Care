package com.infosys.Wellness.dto;

import java.time.LocalDateTime;

public record AvailableSlotResponse(
        LocalDateTime start,
        LocalDateTime end
) {}
