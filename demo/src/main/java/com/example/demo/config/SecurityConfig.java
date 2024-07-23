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

// This class configures the security settings for the application.
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
        .requestMatchers("/api/users/register").permitAll() // Allow anyone to access the register endpoint
        .anyRequest().authenticated() // All other requests need to be authenticated
    )
    .formLogin(form -> form
        .loginPage("/login").permitAll() // Specify a custom login page or default behavior
                .defaultSuccessUrl("/home", true) // Specify the default success URL
                .successHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK); // Respond with 200 OK instead of redirecting.. now that I work in Thunderclient... and I guess I want redirections to be handled on frontend (?)
                })
    )
    .logout(logout -> logout
        .permitAll() // Allow everyone to log out
    );

    return http.build();
  }

 /*  @Bean 
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  } */

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
  }
 /*  @Autowired
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
  } */
  
}
