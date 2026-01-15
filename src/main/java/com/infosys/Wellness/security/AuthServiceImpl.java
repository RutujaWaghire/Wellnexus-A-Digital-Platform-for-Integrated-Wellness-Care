package com.infosys.Wellness.security;

import com.infosys.Wellness.entity.PractitionerProfile;
import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.PractitionerProfileRepository;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PractitionerProfileRepository practitionerRepo;

    public AuthServiceImpl(UserRepository userRepository,
                           PractitionerProfileRepository practitionerRepo) {
        this.userRepository = userRepository;
        this.practitionerRepo = practitionerRepo;
    }

    private String currentPrincipalName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Not authenticated");
        }
        return auth.getName(); // usually email/username
    }

    @Override
    public Long requireCurrentUserId() {
        String email = currentPrincipalName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for email: " + email));
        return user.getId();
    }

    @Override
    public Long requireCurrentPractitionerId() {
        Long userId = requireCurrentUserId();
        PractitionerProfile profile = practitionerRepo.findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Current user is not a practitioner"));
        return profile.getId();
    }

    @Override
    public boolean isCurrentUserPractitionerOf(Long practitionerId) {
        Long userId = requireCurrentUserId();
        PractitionerProfile profile = practitionerRepo.findById(practitionerId).orElse(null);
        if (profile == null) return false;
        User practitionerUser = profile.getUser();
        return practitionerUser != null && practitionerUser.getId().equals(userId);
    }
}
