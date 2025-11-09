package br.com.commonlib.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsuarioDTO {

    @NotEmpty(message = "O email não pode ser vazio")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotEmpty(message = "O nome não pode ser vazio")
    private String nome;

    @NotEmpty(message = "A senha não pode ser vazia")
    @Size(min = 6, message = "A senha deve ter ao menos 6 caracteres")
    private String senha;

    private Long id;
    private String role;
}
