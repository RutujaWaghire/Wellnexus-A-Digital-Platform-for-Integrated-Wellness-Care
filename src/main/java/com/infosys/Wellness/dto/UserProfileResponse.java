package com.infosys.Wellness.dto;

import com.infosys.Wellness.entity.User;

public class UserProfileResponse {

    private Long id;
    private String name;
    private String email;
    private User.Role role;
    private String bio;

    public UserProfileResponse(Long id, String name, String email, User.Role role, String bio) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public User.Role getRole() {
        return role;
    }

    public String getBio() {
        return bio;
    }
}
