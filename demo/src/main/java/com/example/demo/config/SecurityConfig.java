package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.demo.user.UserDetailsServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

// This class configures the security settings for the application... for User information...!
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final UserDetailsServiceImpl userDetailsService;
  private final PasswordEncoder passwordEncoder;

/*   @Autowired
  @Lazy // delay the creation of beans until they are actually needed
  private UserDetailsServiceImpl userDetailsService */

  public SecurityConfig(UserDetailsServiceImpl userDetailsService, PasswordEncoder passwordEncoder) {
    this.userDetailsService = userDetailsService;
    this.passwordEncoder = passwordEncoder;
  }

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
    .csrf(csrf -> csrf.disable()) // Disable CSRF protection (enable in production)
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/**").permitAll() 
        .anyRequest().authenticated() // All other requests need to be authenticated
        //.requestMatchers("/api/users/register", "/api/login", "/hello").permitAll()
    )
    .exceptionHandling(exceptionHandling -> exceptionHandling
        .authenticationEntryPoint((request, response, authException) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Unauthorized: " + authException.getMessage() + "\"}");
        })
    );
    

    return http.build();
  }

  /* Använder passwordEncoder ifrån BeanConfig:
  When you define a bean in one configuration class, it can be injected into other beans in different configuration classes as long as Spring's context manages those classes. 
  The @Autowired annotation ensures that the correct bean instance is injected where needed.
  */
  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
  }
 /*  @Autowired
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
  } */
  
}
