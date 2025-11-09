package br.com.commonlib.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FaqDTO {

    private Long id;

    @NotBlank
    private String pergunta;

    @NotBlank
    private String resposta;

    public FaqDTO(String pergunta, String resposta) {
        this.pergunta = pergunta;
        this.resposta = resposta;
    }
}
