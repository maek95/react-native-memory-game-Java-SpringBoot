package com.example.demo.authentication;

// login stuff

public class Authentication {
  private String username;
  private String password;

  // Default Constructor for JSON parsing
  public Authentication() {

  }

  // Parameterized Constructor
  public Authentication(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
