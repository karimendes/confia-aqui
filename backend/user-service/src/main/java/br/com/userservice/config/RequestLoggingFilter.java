package br.com.userservice.config;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Para depuração de chamadas recebidas do auth-service.
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger REQUEST_LOGGER = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String method = request.getMethod();
        String path = request.getRequestURI();
        String authHeader = request.getHeader("Authorization");

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String principal = (authentication != null && authentication.getPrincipal() != null) ? authentication.getPrincipal().toString() : "<none>";
    boolean authenticated = (authentication != null && authentication.isAuthenticated());

        REQUEST_LOGGER.info("[RequestDebug] {} {} | Authorization header present={} | principal={} | authenticated={}",
        method, path, (authHeader != null), principal, authenticated);
        filterChain.doFilter(request, response);
    }
}
