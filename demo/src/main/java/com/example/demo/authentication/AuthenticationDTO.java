package com.example.demo.authentication;

// Data Transfer Object... sent to frontend
public class AuthenticationDTO {

  private final String jwt;
  private final String username;

  public AuthenticationDTO(String jwt, String username) {
    this.jwt = jwt;
    this.username = username;
  }

  public String getJwt() {
    return jwt;
  }

  public String getUsername() {
    return username;
  }
}