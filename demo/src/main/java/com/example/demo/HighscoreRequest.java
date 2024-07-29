package com.example.demo;

// Could have named this HighscoreDTO
// handling incoming request data... DTO: Data Transfer Object
// this is basically like Highscore, but specifically for data requests... when POST or GET from frontend etc... Highscore is used throughout the backend, HighscoreRequest is just in the communication between frontend and backend... I think?
public class HighscoreRequest {

  private String titleDifficultyPerfected; // the variable the POST request will send the highscore title to...
  private int sequenceLength; // the variable the POST request will send the highscore sequence length to...
  
  // Default constructor, need an empty default constructor for creation because...
  public HighscoreRequest() {}

  // Parametrized constructor, not needed really?
  public HighscoreRequest(String titleDifficultyPerfected, int sequenceLength) {
    this.titleDifficultyPerfected = titleDifficultyPerfected;
    this.sequenceLength = sequenceLength;
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

}
