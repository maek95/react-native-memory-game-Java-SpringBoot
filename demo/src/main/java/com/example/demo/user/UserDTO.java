package com.example.demo.user;

// control more specifically what gets returned in the reponse to e.g. frontend... Could have named it UserRequest... 
// for instance, wont be transferring passwords!
// User Data Transfer Object
public class UserDTO {

  private Long id;
  private String username;

  // Default Constructor, need an empty default constructor for creation because...
  public UserDTO() {}

  // Parameterized Constructor
  public UserDTO(Long id, String username) {
    this.id = id;
    this.username = username; 
  }

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
  
}
