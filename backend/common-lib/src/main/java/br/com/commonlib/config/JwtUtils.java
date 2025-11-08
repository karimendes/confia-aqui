package br.com.commonlib.config;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

   
    @Value("${jwt.secret:${JWT_SECRET:secret-key-please-change}}")
    private String jwtSecret;

    // Default 24h
    @Value("${jwt.expirationMs:86400000}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        if (this.signingKey == null) {
            initSigningKey();
        }
        return signingKey;
    }

    private Key signingKey;

    @PostConstruct
    private void initSigningKey() {
        
        if (jwtSecret == null) jwtSecret = "";

        byte[] keyBytes;
        try {
            keyBytes = Decoders.BASE64.decode(jwtSecret);
            logger.info("JWT secret decodificado de Base64 ({} bytes)", keyBytes.length);
        } catch (DecodingException | IllegalArgumentException ex) {
            keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
            logger.warn("JWT secret não é Base64 válido; usandoUTF-8 bytes ({} bytes)", keyBytes.length);
        }

        if (keyBytes.length < 32) {
            throw new IllegalStateException("JWT secret configurado é muito curto: " + keyBytes.length
                    + " bytes.Forneça pelo menos 32 bytes (256 bits) para algoritmos HMAC-SHA.\n"
                    + "Recomendado: gere um valor aleatório de 32 bytes e armazene em Base64 no seu .env como JWT_SECRET.\n"
                    + "Example (PowerShell): $b=New-Object 'System.Byte[]' 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)");
        }

        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey())
                .compact();
    }

    public String generateToken(Long userId, String email) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(userId == null ? "" : userId.toString())
                .claim("email", email)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey())
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        try {
            String subject = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
            if (subject == null || subject.isBlank()) return null;
            return Long.valueOf(subject);
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException ex) {
            return null;
        }
    }

    public String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
            Object email = claims.get("email");
            if (email != null) return email.toString();
            String sub = claims.getSubject();
            return sub;
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException ex) {
            return null;
        }
    }

    public String generateToken(Long userId, String email, java.util.List<String> roles) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);
        io.jsonwebtoken.JwtBuilder builder = Jwts.builder()
                .setSubject(userId == null ? "" : userId.toString())
                .claim("email", email)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(getSigningKey());

        if (roles != null && !roles.isEmpty()) {
            builder.claim("roles", roles);
        }

        return builder.compact();
    }

    @SuppressWarnings("unchecked")
    public java.util.List<String> getRolesFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
            Object roles = claims.get("roles");
            if (roles == null) return null;
            if (roles instanceof java.util.List) {
                return (java.util.List<String>) roles;
            }

            return java.util.Arrays.stream(roles.toString().split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException ex) {
            return null;
        }
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
