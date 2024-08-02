package com.example.demo.authentication;

import com.example.demo.HighscoreDTO;

// Data Transfer Object... sent to frontend
public class AuthenticationDTO {

  private final String jwt;
  private final String username;
  private final HighscoreDTO highscore;
 /*  private final String highscoreTitle;
  private final int highscoreSequenceLength; */

  // the object we send to frontend
  public AuthenticationDTO(String jwt, String username, HighscoreDTO highscore) {
    this.jwt = jwt;
    this.username = username;
   /*  this.highscoreTitle = highscoreTitle;
    this.highscoreSequenceLength = highscoreSequenceLength; */
    this.highscore = highscore;
  }

  public String getJwt() {
    return jwt;
  }

  public String getUsername() {
    return username;
  }

  public HighscoreDTO getHighscoreDTO() {
    return highscore;
  }

 /*  public String getHighscoreTitle() {
    return highscoreTitle;
  }

  public int getHighscoreSequenceLength() {
    return highscoreSequenceLength;
  } */
}