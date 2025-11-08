package br.com.authservice.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_REDEFINIR_SENHA")
@Getter
@Setter
public class RedefinirSenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private LocalDateTime expiryDate;

    // referencia ao id do usuário no user-service (desacoplado)
    @Column(name = "usuario_id")
    private Long usuarioId;

    public RedefinirSenha() {}
}