package com.infosys.Wellness.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when an attempt to book a slot fails because it was already taken.
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class SlotAlreadyBookedException extends RuntimeException {
    public SlotAlreadyBookedException() { super(); }
    public SlotAlreadyBookedException(String message) { super(message); }
    public SlotAlreadyBookedException(String message, Throwable cause) { super(message, cause); }
}
