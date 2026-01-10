package com.infosys.Wellness.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF (JWT + Postman)
                .csrf(csrf -> csrf.disable())

                // Stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        // 🔓 Auth APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // 🔓 Product browsing – PUBLIC
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

                        // 🔐 Product creation – ADMIN ONLY
                        .requestMatchers(HttpMethod.POST, "/api/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

                        // 🔐 Orders – PATIENT ONLY
                        .requestMatchers("/api/orders/**").hasRole("PATIENT")

                        // 🔐 Practitioner review – PATIENT ONLY
                        .requestMatchers("/api/practitioner-ratings/**").hasRole("PATIENT")

                        // 🔐 Community Q&A – authenticated users
                        .requestMatchers("/api/questions/**").authenticated()

                        // 🔥🔥 MILESTONE 4 (FIX)
                        .requestMatchers("/api/recommendations/**").hasAuthority("ROLE_PATIENT")
                        .requestMatchers("/api/notifications/**").hasAuthority("ROLE_PATIENT")

                        .requestMatchers("/api/health/**").authenticated()

                        // 🔐 Admin analytics
                        .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")



                        // Everything else
                        .anyRequest().authenticated()
                )

                // JWT filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
