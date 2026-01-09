package com.wellness.backend.service.impl;

import com.wellness.backend.model.User;
import java.util.List;

public interface UserService {

    User createUser(User u);

    List<User> getAllUsers();

    List<User> getUsersByRole(String role);

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
}
