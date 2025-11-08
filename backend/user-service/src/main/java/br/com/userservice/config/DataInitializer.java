package br.com.userservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.userservice.entity.Usuario;
import br.com.userservice.repository.UsuarioRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner createAdminIfMissing(UsuarioRepository repo, PasswordEncoder encoder) {
        return args -> {
            String adminEmail = "admin@gmail.com";
            Usuario existing = repo.findByEmail(adminEmail);
            if (existing == null) {
                Usuario admin = new Usuario();
                admin.setEmail(adminEmail);
                admin.setNome("Administrador");
                admin.setSenha(encoder.encode("admin123"));
                admin.setRole("ROLE_ADMIN");
                repo.save(admin);
                System.out.println("Created admin user: " + adminEmail + " / admin123");
            } else {
                if (existing.getRole() == null || !existing.getRole().equals("ROLE_ADMIN")) {
                    existing.setRole("ROLE_ADMIN");
                    repo.save(existing);
                    System.out.println("Updated existing user to ROLE_ADMIN: " + adminEmail);
                }
            }
        };
    }
}