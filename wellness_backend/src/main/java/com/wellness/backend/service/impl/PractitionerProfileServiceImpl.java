package com.wellness.backend.service.impl;

import com.wellness.backend.model.PractitionerProfile;
import com.wellness.backend.repository.PractitionerProfileRepository;
import com.wellness.backend.service.PractitionerProfileService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PractitionerProfileServiceImpl implements PractitionerProfileService {

    private final PractitionerProfileRepository practitionerProfileRepository;

    public PractitionerProfileServiceImpl(PractitionerProfileRepository practitionerProfileRepository) {
        this.practitionerProfileRepository = practitionerProfileRepository;
    }

    @Override
    public PractitionerProfile createProfile(PractitionerProfile profile) {
        return practitionerProfileRepository.save(profile);
    }

    @Override
    public PractitionerProfile getByUserId(Long userId) {
        return practitionerProfileRepository
                .findByUserId(userId)
                .orElse(null);
    }

    @Override
    public PractitionerProfile updateProfile(Long id, PractitionerProfile profile) {
        Optional<PractitionerProfile> existingOpt =
                practitionerProfileRepository.findById(id);

        if (existingOpt.isEmpty()) {
            return null;
        }

        PractitionerProfile existing = existingOpt.get();

        // Update only allowed fields
        existing.setSpecialization(profile.getSpecialization());
        //existing.setExperience(profile.getExperience());
        //existing.setBio(profile.getBio());
        //existing.setLicenseNumber(profile.getLicenseNumber());

        return practitionerProfileRepository.save(existing);
    }

    @Override
    public void verifyPractitioner(Long id) {
        Optional<PractitionerProfile> existingOpt =
                practitionerProfileRepository.findById(id);

        if (existingOpt.isPresent()) {
            PractitionerProfile profile = existingOpt.get();
            profile.setVerified(true);
            practitionerProfileRepository.save(profile);
        }
    }
}
