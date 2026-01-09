package com.wellness.backend.controller;

import com.wellness.backend.model.User;
import com.wellness.backend.service.impl.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserServiceImpl service;

    public UserController(UserServiceImpl service) {
        this.service = service;
    }

    // CREATE
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return service.createUser(user);
    }

    // READ - All
    @GetMapping("/get")
    public List<User> getAll() {
        return service.getAllUsers();
    }

    // READ - By ID
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    // READ - By Role
    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable String role) {
        return service.getUsersByRole(role);
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        return service.updateUser(id, user);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteUser(id);
        return "User deleted successfully!";
    }

    // Verify practitioner
    @PutMapping("/verify/{id}")
    public User verifyPractitioner(@PathVariable Long id) {
        return service.verifyPractitioner(id);
    }

    // Update specializations
    @PutMapping("/specializations/{id}")
    public User updateSpecializations(@PathVariable Long id, @RequestBody List<String> specializations) {
        return service.updateSpecializations(id, specializations);
    }
}
