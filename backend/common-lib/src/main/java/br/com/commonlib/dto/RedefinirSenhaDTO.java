package br.com.commonlib.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class RedefinirSenhaDTO {
    private String token;
    private String novaSenha;
    private String confirmarSenha;
}
