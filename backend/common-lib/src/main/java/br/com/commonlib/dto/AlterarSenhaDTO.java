package br.com.commonlib.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AlterarSenhaDTO {

    @NotEmpty(message = "A senha atual não pode ser vazia")
    private String senhaAtual;

    @NotEmpty(message = "A nova senha não pode ser vazia")
    @Size(min = 6, message = "A nova senha deve ter ao menos 6 caracteres")
    private String novaSenha;

    private String confirmarSenha;

}