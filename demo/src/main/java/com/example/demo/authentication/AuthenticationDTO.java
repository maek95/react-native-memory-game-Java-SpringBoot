package com.example.demo.authentication;

// Data Transfer Object... sent to frontend
public class AuthenticationDTO {

  private final String jwt;

  public AuthenticationDTO(String jwt) {
    this.jwt = jwt;
  }

  public String getJwt() {
    return jwt;
  }
}