package br.com.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackages = {"br.com.userservice", "br.com.commonlib"})
public class UserServiceApplication {

    private final Environment env;

    public UserServiceApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logResolvedJdbc() {
        String url = env.getProperty("spring.datasource.url");
        String user = env.getProperty("spring.datasource.username");
        if (url != null) {
            System.out.println("[user-service] Resolved JDBC URL: " + url);
        }
        if (user != null) {
            System.out.println("[user-service] Resolved DB user: " + user);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
