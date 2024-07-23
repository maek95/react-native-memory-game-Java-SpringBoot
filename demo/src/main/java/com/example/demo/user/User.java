package com.example.demo.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // need this for H2... simplified SQL 
@Table(name = "users") // Renaming table to "users"... "user" is a reserved word or something in H2...
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // Long because id can be very long...

  @Column(nullable = false, unique = true) // simplified SQL 
  private String username;

  @Column(nullable = false)
  private String password;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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
