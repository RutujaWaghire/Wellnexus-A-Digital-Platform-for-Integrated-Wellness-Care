package com.infosys.Wellness;

import com.infosys.Wellness.entity.User;
import com.infosys.Wellness.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class    WellnessApplication {

	public static void main(String[] args) {
		SpringApplication.run(WellnessApplication.class, args);
	}


    @Bean
    CommandLineRunner fixAdmin(UserRepository repo, PasswordEncoder encoder) {
        return args -> {
            User admin = repo.findByEmail("admin1@example.com")
                    .orElseThrow(() -> new RuntimeException("Admin not found"));

            admin.setPassword(encoder.encode("admin123"));
            repo.save(admin);

            System.out.println("✅ Admin password reset to admin123");
        };
    }

}
