package br.com.faqservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_FAQ")
@Getter
@Setter
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String pergunta;

    @Column(columnDefinition = "TEXT")
    private String resposta;

    public Faq() {}

    public Faq(String pergunta, String resposta) {
        this.pergunta = pergunta;
        this.resposta = resposta;
    }
}
