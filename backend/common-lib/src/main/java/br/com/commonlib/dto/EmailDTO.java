package br.com.commonlib.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailDTO {
    @Email(message = "Formato de email inválido")
    @NotEmpty(message = "O e-mail é obrigatório")
    private String email;

    private String nome;
}
