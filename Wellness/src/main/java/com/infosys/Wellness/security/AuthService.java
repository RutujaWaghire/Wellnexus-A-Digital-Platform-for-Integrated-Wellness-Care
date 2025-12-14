package com.infosys.Wellness.security;

public interface AuthService {
    Long requireCurrentUserId();
    Long requireCurrentPractitionerId();
    boolean isCurrentUserPractitionerOf(Long practitionerId);
}
