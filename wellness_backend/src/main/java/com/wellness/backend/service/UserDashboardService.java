package com.wellness.backend.service;

import com.wellness.backend.dto.UserDashboardResponse;

public interface UserDashboardService {

    UserDashboardResponse getDashboard(String email);
}
