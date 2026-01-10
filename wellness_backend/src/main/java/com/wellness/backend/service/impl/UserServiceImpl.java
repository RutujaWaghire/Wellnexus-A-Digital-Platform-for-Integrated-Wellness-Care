package com.wellness.backend.service.impl;

import com.wellness.backend.model.User;
import com.wellness.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl {

    private final UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public User createUser(User u) {
        return repo.save(u);
    }

    // READ - All
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // READ - By Role
    public List<User> getUsersByRole(String role) {
        return repo.findByRole(role);
    }

    // READ - By ID
    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE
    public User updateUser(Long id, User user) {
        User existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setPassword(user.getPassword());
            existing.setRole(user.getRole());
            existing.setIsVerified(user.getIsVerified());
            existing.setSpecializations(user.getSpecializations());
            return repo.save(existing);
        }
        return null;
    }

    // DELETE
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }

    // Verify practitioner
    public User verifyPractitioner(Long id) {
        User user = repo.findById(id).orElse(null);
        if (user != null && "THERAPIST".equals(user.getRole())) {
            user.setIsVerified(true);
            return repo.save(user);
        }
        return null;
    }

    // Update specializations
    public User updateSpecializations(Long id, List<String> specializations) {
        User user = repo.findById(id).orElse(null);
        if (user != null && "THERAPIST".equals(user.getRole())) {
            user.setSpecializations(specializations);
            return repo.save(user);
        }
        return null;
    }
}
