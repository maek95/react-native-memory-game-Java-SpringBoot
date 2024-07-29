package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// I had this in SecurityConfig before but it caused issues with Bean creation..! Beans that rely on eachother or smth...
// Beans are managed by the Spring container and are wired together...
// "Beans allow for dependency injection, a core concept in Spring. DI allows you to inject dependencies (objects) into other objects, rather than having the objects create their own dependencies."
// Since beans are managed by the Spring container, they can be easily injected and reused across different parts of the application.
@Configuration
public class BeanConfig {
  
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }
}
