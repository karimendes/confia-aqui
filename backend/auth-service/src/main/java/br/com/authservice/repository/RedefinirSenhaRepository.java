package br.com.authservice.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.authservice.entity.RedefinirSenha;

public interface RedefinirSenhaRepository extends JpaRepository<RedefinirSenha, Long> {
    RedefinirSenha findByToken(String token);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM RedefinirSenha WHERE expiryDate < :now")
    void deleteExpiredTokens(LocalDateTime now);
}
