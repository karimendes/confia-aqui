package br.com.authservice.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import br.com.commonlib.dto.RedefinirSenhaDTO;
import br.com.commonlib.dto.UsuarioDTO;

@Service
public class UserClientService {

    private final RestTemplate restTemplate;
    private final String userServiceBase;

    public UserClientService(RestTemplateBuilder builder,
            @Value("${user.service.url:http://localhost:8081}") String userServiceBase) {
        this.restTemplate = builder.build();
        this.userServiceBase = userServiceBase;
    }

    public UsuarioDTO cadastrarUsuario(UsuarioDTO dto) {
        try {
            return restTemplate.postForObject(userServiceBase + "/api/user/cadastrar", dto, UsuarioDTO.class);
        } catch (HttpClientErrorException ex) {
            System.err.println("UserClientService.cadastrarUsuario -> HTTP error calling user-service: " + ex.getStatusCode());
            System.err.println("Response body: " + ex.getResponseBodyAsString());
            throw ex;
        } catch (ResourceAccessException ex) {
            System.err.println("UserClientService.cadastrarUsuario -> Resource access error calling user-service: " + ex.getMessage());
            throw ex;
        }
    }

    public UsuarioDTO buscarPorEmail(String email) {
        try {
            UsuarioDTO dto = restTemplate.getForObject(userServiceBase + "/api/user/email/{email}", UsuarioDTO.class, email);
            System.out.println("UserClientService.buscarPorEmail -> got user from user-service: " + (dto != null ? dto.getEmail() : "null"));
            return dto;
        } catch (HttpClientErrorException ex) {
            System.err.println("UserClientService.buscarPorEmail -> HTTP error: " + ex.getStatusCode());
            System.err.println("Response body: " + ex.getResponseBodyAsString());
            return null;
        } catch (ResourceAccessException ex) {
            System.err.println("UserClientService.buscarPorEmail -> Resource access error: " + ex.getMessage());
            return null;
        }
    }

    public void redefinirSenha(RedefinirSenhaDTO dto) {
        try {
            restTemplate.postForObject(userServiceBase + "/api/user/redefinirSenha", dto, Void.class);
        } catch (HttpStatusCodeException ex) {
            System.err.println("UserClientService.redefinirSenha -> HTTP error: " + ex.getStatusCode());
            System.err.println("Response body: " + ex.getResponseBodyAsString());
            throw ex;
        } catch (ResourceAccessException ex) {
            System.err.println("UserClientService.redefinirSenha -> Resource access error: " + ex.getMessage());
            throw ex;
        }
    }

    public void redefinirSenhaById(Long usuarioId, String novaSenha) {
        try {
            Map<String, Object> body = Map.of("usuarioId", usuarioId, "novaSenha", novaSenha);
            restTemplate.postForObject(userServiceBase + "/api/user/redefinirSenha", body, Void.class);
            System.out.println("UserClientService.redefinirSenhaById -> called user-service for usuarioId=" + usuarioId);
        } catch (HttpStatusCodeException ex) {
            System.err.println("UserClientService.redefinirSenhaById -> HTTP error: " + ex.getStatusCode());
            System.err.println("Response body: " + ex.getResponseBodyAsString());
            throw ex;
        } catch (ResourceAccessException ex) {
            System.err.println("UserClientService.redefinirSenhaById -> Resource access error: " + ex.getMessage());
            throw ex;
        }
    }
}
