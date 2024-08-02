package com.example.demo;


// Defines the structure the request from Frontend to Backend.. HighscoreDTO will handle Backend to Frontend

// this is basically like Highscore, but specifically for data requests... when POST or GET from frontend etc... Highscore is used throughout the backend, HighscoreRequest is just in the communication between frontend and backend...
public class HighscoreRequest {

  private String titleDifficultyPerfected; // the variable the POST request will send the highscore title to...
  private int sequenceLength; // the variable the POST request will send the highscore sequence length to...
  private String username;  // not user id because we dont want to expose that to the client (?)... usernames are unique anyway...
  
  // Default constructor, need an empty default constructor for creation because...
  public HighscoreRequest() {}

  // Parametrized constructor, not needed really?
  public HighscoreRequest(String titleDifficultyPerfected, int sequenceLength, String username) {
    this.titleDifficultyPerfected = titleDifficultyPerfected;
    this.sequenceLength = sequenceLength;
    this.username = username;
  }

  //Getters and setters
  public String getTitleDifficultyPerfected() {
    return titleDifficultyPerfected;
  }

  public void setTitleDifficultyPerfected(String titleDifficultyPerfected) {
    this.titleDifficultyPerfected = titleDifficultyPerfected;
  }

  public int getSequenceLength() {
    return sequenceLength;
  }

  public void setSequenceLength(int sequenceLength) {
    this.sequenceLength = sequenceLength;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

}
