package br.com.userservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_USUARIO")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    @Column(unique = true)
    private String email;

    @NotEmpty(message = "O nome não pode ser vazio")
    private String nome;

    @NotEmpty(message = "A senha não pode ser vazia")
    @Size(min = 6, message = "A senha deve ter ao menos 6 caracteres")
    private String senha;

    private String role; // "ROLE_ADMIN" ou "ROLE_USER"

    public Usuario() {}
}

