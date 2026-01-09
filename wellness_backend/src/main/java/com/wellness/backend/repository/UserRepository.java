package com.wellness.backend.repository;

import com.wellness.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Fetch all practitioners/users who are not verified
    List<User> findByIsVerified(boolean isVerified);

    // Fetch user by email (returns Optional)
    Optional<User> findByEmail(String email);

    // Fetch users by role
    List<User> findByRole(String role);
}
