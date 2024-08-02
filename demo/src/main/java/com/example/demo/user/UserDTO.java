package com.example.demo.user;

import com.example.demo.Highscore;
import com.example.demo.HighscoreDTO;

// control more specifically what gets returned in the reponse to e.g. frontend... Could have named it UserRequest... 
// for instance, wont be transferring passwords!
// User Data Transfer Object
public class UserDTO {

  private Long id;
  private String username;
  private HighscoreDTO highscore; // we only want to include the highscore info that we want to transfer to frontend

  // Default Constructor, need an empty default constructor for creation because...
  public UserDTO() {}

  // Parameterized Constructor
  public UserDTO(Long id, String username, HighscoreDTO highscore) {
    this.id = id;
    this.username = username; 
    this.highscore = highscore;
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
  
  public HighscoreDTO getHighscore() {
    return highscore; // object
  }

  public void setHighscore(HighscoreDTO highscore) {
    this.highscore = highscore;
  }
}
