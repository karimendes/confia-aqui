package br.com.authservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.email.from:noreply@confia-aqui.com}")
    private String fromAddress;

    @Override
    public void sendPasswordReset(String to, String link) {
        String subject = "Confia Aqui — Redefinição de senha";
        String text = new StringBuilder()
                .append("Olá,\n\n")
                .append("Recebemos uma solicitação para redefinir a senha da sua conta Confia Aqui associada a este e-mail.\n\n")
                .append("Para redefinir sua senha, clique no link abaixo:\n")
                .append(link).append("\n\n")
                .append("O link é válido por 1h. Se você não solicitou a redefinição, ignore este e-mail ou entre em contato com nossa equipe de suporte.")
                .append("\n\nAtenciosamente,\nEquipe Confia Aqui\n\n")
                .append("Este é um e-mail automático. Por favor, não responda para este endereço.")
                .toString();
        sendMessageOrLog(to, subject, text);
    }

    @Override
    public void sendSimpleMessage(String to, String subject, String text) {
        sendMessageOrLog(to, subject, text);
    }

    private void sendMessageOrLog(String to, String subject, String text) {
        if (mailSender == null) {
            // Fallback: mensagem de e-mail para log quando JavaMailSender não está configurado
            logger.info("[EMAIL - simulated] from={} to={} subject={} body={}", fromAddress, to, subject, text);
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Email enviado de {} para {} (assunto={})", fromAddress, to, subject);
        } catch (MailException ex) {
            logger.error("Falha ao enviar email para {}: {}", to, ex.getMessage(), ex);
        }
    }
}
