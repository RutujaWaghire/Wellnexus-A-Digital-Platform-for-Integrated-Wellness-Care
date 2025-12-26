package com.infosys.Wellness.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        System.out.println("JWT Secret Length = " + jwtSecret.length());
    }

    // 🔹 Generate Token — stores username + role
    public String generateToken(UserDetails userDetails) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        // Extract Role
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("PATIENT");

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", role)           // 🔥 add role claim
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 🔹 Extract username
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 🔹 Extract Role (for Authorization checks)
    public String getRoleFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    // 🔹 Validate Token
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = getUsernameFromToken(token);
            return username.equals(userDetails.getUsername());
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    // 🔹 Validate Expired Token
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
            return expiration.before(new Date());
        } catch (JwtException ex) {
            return true;
        }
    }
}
