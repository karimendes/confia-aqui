package br.com.commonlib.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponseDTO {
    private Long id;
    private String email;
    private String nome;
    private List<String> roles;
    private String token;

    public AuthResponseDTO(Long id, String email, String nome, List<String> roles) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.roles = roles;
    }

    public AuthResponseDTO(Long id, String email, String nome, List<String> roles, String token) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.roles = roles;
        this.token = token;
    }
}
