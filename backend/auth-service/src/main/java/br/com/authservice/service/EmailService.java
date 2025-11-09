package br.com.authservice.service;

public interface EmailService {
    void sendPasswordReset(String to, String link);
    void sendSimpleMessage(String to, String subject, String text);
}
