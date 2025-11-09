package br.com.authservice.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.commonlib.dto.UsuarioDTO;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserClientService userClientService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("CustomUserDetailsService.loadUserByUsername -> requested username={}", username);
        UsuarioDTO u = userClientService.buscarPorEmail(username);
        if (u == null) {
            logger.warn("CustomUserDetailsService -> user not found: {}", username);
            throw new UsernameNotFoundException("Usuário não encontrado: " + username);
        }
        String password = u.getSenha() == null ? "" : u.getSenha();
        logger.info("CustomUserDetailsService -> user found email={} id={} role={} passwordPresent={}", u.getEmail(), u.getId(), u.getRole(), (password != null && !password.isBlank()));

    String role = (u.getRole() != null && !u.getRole().isBlank()) ? u.getRole() : "ROLE_USER";
    if (!role.startsWith("ROLE_")) role = "ROLE_" + role;
    UserDetails ud = User.withUsername(u.getEmail()).password(password)
        .authorities(List.of(new SimpleGrantedAuthority(role))).build();
        return ud;
    }
}
