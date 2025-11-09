package br.com.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication(scanBasePackages = {"br.com.authservice", "br.com.commonlib"})
public class AuthServiceApplication {

    private final Environment env;

    public AuthServiceApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logResolvedJdbc() {
        String url = env.getProperty("spring.datasource.url");
        String user = env.getProperty("spring.datasource.username");
        if (url != null) {
            System.out.println("[auth-service] Resolved JDBC URL: " + url);
        }
        if (user != null) {
            System.out.println("[auth-service] Resolved DB user: " + user);
        }
    }
}
