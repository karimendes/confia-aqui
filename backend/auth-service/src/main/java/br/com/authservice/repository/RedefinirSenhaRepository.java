package br.com.authservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.authservice.entity.RedefinirSenha;

public interface RedefinirSenhaRepository extends JpaRepository<RedefinirSenha, Long> {
    RedefinirSenha findByToken(String token);
}
