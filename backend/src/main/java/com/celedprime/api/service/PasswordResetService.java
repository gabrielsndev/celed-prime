package com.celedprime.api.service;

import com.celedprime.api.infra.exception.BusinessException;
import com.celedprime.api.infra.exception.ResourceNotFoundException;
import com.celedprime.api.model.User;
import com.celedprime.api.repository.UserRepository;
import com.celedprime.api.service.email.EmailService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class PasswordResetService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;

    // Deixamos este espaço preparado para injetar o EmailService no próximo passo
    private final EmailService emailService;

    public PasswordResetService(UserRepository repository, PasswordEncoder passwordEncoder, StringRedisTemplate redisTemplate, EmailService emailService){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.redisTemplate = redisTemplate;
        this.emailService = emailService;
    }

    public void generateAndSendResetCode(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("e-mail não cadastrado no sistema."));

        String code = String.format("%06d", new Random().nextInt(999999));

        String redisKey = "reset:" + code;

        // reset:code : email
        redisTemplate.opsForValue().set(redisKey, user.getEmail(), 15, TimeUnit.MINUTES);

        String title = "Celed Prime - Recuperação de Senha";
        String body = "Olá!\n\nVocê solicitou a recuperação de senha.\n" +
                "O seu código de verificação é: " + code + "\n\n" +
                "Este código expira em 15 minutos.";

        emailService.sendEmail(user.getEmail(), title, body);

        System.out.println("Email de recuperação enviado para: " + user.getEmail());
        System.out.println("Código gerado no Redis: " + code);

    }

    public void resetPasswordWithCode(String code, String newPassword) {
        String redisKey = "reset:" + code;

        String email = redisTemplate.opsForValue().get(redisKey);

        if (email == null) {
            throw new BusinessException("O código inserido expirou ou é inválido.");
        }

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("usuario não encontrado."));

        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);

        redisTemplate.delete(redisKey);
    }
}