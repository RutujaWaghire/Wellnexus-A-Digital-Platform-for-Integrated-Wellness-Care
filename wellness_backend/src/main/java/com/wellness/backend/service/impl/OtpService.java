package com.wellness.backend.service.impl;

import com.wellness.backend.model.Otp;
import com.wellness.backend.repository.OtpRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository repo;
    private final JavaMailSender mailSender;

    public OtpService(OtpRepository repo, JavaMailSender mailSender) {
        this.repo = repo;
        this.mailSender = mailSender;
    }

    public String generateOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        Otp obj = new Otp();
        obj.setEmail(email);
        obj.setOtp(otp);
        repo.save(obj);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("varshakanakaraja@gmail.com");
        message.setSubject("Your OTP");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);

        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        Otp stored = repo.findByEmail(email);
        return stored != null && stored.getOtp().equals(otp);
    }
}
