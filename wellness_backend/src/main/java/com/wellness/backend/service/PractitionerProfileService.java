package com.wellness.backend.service;

import com.wellness.backend.model.PractitionerProfile;

public interface PractitionerProfileService {

    PractitionerProfile createProfile(PractitionerProfile profile);

    PractitionerProfile getByUserId(Long userId);

    PractitionerProfile updateProfile(Long id, PractitionerProfile profile);

    void verifyPractitioner(Long id);
}
