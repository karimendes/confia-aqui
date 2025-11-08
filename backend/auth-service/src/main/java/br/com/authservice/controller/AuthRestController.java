package br.com.authservice.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.authservice.service.RedefinirSenhaService;
import br.com.authservice.service.UserClientService;
import br.com.commonlib.config.JwtUtils;
import br.com.commonlib.dto.AuthResponseDTO;
import br.com.commonlib.dto.EmailDTO;
import br.com.commonlib.dto.LoginRequest;
import br.com.commonlib.dto.RedefinirSenhaDTO;
import br.com.commonlib.dto.UsuarioDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    private static final Logger logger = LoggerFactory.getLogger(AuthRestController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserClientService userClient;
    @Autowired
    private RedefinirSenhaService redefinirSenhaService;

    @PostMapping("/cadastrarUsuario")
    public ResponseEntity<?> cadastrar(@Valid @RequestBody UsuarioDTO dto) {
        try {
            UsuarioDTO criado = userClient.cadastrarUsuario(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(criado);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Erro ao cadastrar usuário: " + ex.getMessage()));
        }
    }

   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getEmail(), req.getSenha())
        );

        SecurityContextHolder.getContext().setAuthentication(auth);
        org.springframework.security.core.userdetails.UserDetails ud = 
            (org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal();
        UsuarioDTO usuario = userClient.buscarPorEmail(ud.getUsername());
        List<String> roles;
        if (usuario != null && usuario.getRole() != null && !usuario.getRole().isBlank()) {
            String r = usuario.getRole();
            if (!r.startsWith("ROLE_")) r = "ROLE_" + r;
            roles = java.util.List.of(r);
        } else if (!ud.getAuthorities().isEmpty()) {
            roles = ud.getAuthorities().stream().map(a -> a.getAuthority()).toList();
        } else {
            roles = java.util.List.of("ROLE_USER"); // fallback
        }
        Long userId = usuario == null ? null : usuario.getId();
        String userEmail = usuario == null ? ud.getUsername() : usuario.getEmail();
        String token = jwtUtils.generateToken(userId, userEmail, roles);

        return ResponseEntity.ok(
            new AuthResponseDTO(
                usuario != null ? usuario.getId() : null,
                usuario != null ? usuario.getEmail() : ud.getUsername(),
                usuario != null ? usuario.getNome() : null,
                roles,
                token
            )
        );
    } catch (AuthenticationException ex) {
        logger.warn("Authentication failed for user {}: {}", req.getEmail(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Usuário ou senha inválidos"));
    }
}

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Usuário não autenticado"));
        }
        try {
            HttpSession session = request.getSession(false);
            if (session != null) session.invalidate();
        } finally {
            SecurityContextHolder.clearContext();
        }
        return ResponseEntity.ok(Map.of("message", "Logout realizado com sucesso"));
    }

    @PostMapping("/esqueciSenha")
    public ResponseEntity<?> esqueciSenha(@RequestBody EmailDTO dto, HttpServletRequest request) {
        try {
            String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), "");
            // gerar token e enviar email a partir do auth-service
            redefinirSenhaService.gerarToken(dto.getEmail(), baseUrl);
            return ResponseEntity.ok(Map.of("message",
                    "Um link para redefinir a senha foi enviado para o email informado."));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Email não cadastrado."));
        }
    }

    @PostMapping("/redefinirSenha")
    public ResponseEntity<?> redefinirSenha(@RequestBody RedefinirSenhaDTO dto) {
        try {
            if (dto.getNovaSenha() == null || !dto.getNovaSenha().equals(dto.getConfirmarSenha())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Confirmação de senha não confere"));
            }
            // valida token localmente e delega alteração de senha ao user-service
            redefinirSenhaService.redefinirSenha(dto.getToken(), dto.getNovaSenha());
            return ResponseEntity.ok(Map.of("message", "Senha redefinida com sucesso"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @GetMapping("/usuarioLogado")
    public ResponseEntity<?> usuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Usuário não autenticado"));
        }
    // Pega usuário via user-service
    org.springframework.security.core.userdetails.UserDetails ud = (org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal();
        UsuarioDTO usuario = userClient.buscarPorEmail(ud.getUsername());

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Usuário não encontrado"));
        }

        List<String> roles = ud.getAuthorities().stream().map(a -> a.getAuthority()).toList();
        return ResponseEntity.ok(new AuthResponseDTO(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNome(),
                roles
        ));
    }
}

