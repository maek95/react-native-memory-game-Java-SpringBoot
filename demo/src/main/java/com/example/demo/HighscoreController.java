package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HighscoreController {
  
  @Autowired
  private HighscoreService highscoreService;

  // http://10.201.25.120:8080/updateHighscore
  @CrossOrigin(origins = "*")
  @PostMapping("/updateHighscore")
  public Response updateHighscore(@RequestBody HighscoreRequest highscoreRequest) {
    try {
      if (highscoreRequest.getTitleDifficultyPerfected() == null ||highscoreRequest.getTitleDifficultyPerfected().isEmpty() || highscoreRequest.getSequenceLength() <= 0) {
        return new Response(400, "titleDifficultyPerfected and sequenceLength are required in /updateHighscore request");
      }


      // TODO: seems like highscore and stuff is not properly sent to the frontend as JSON to the frontend I think?
      HighscoreDTO savedHighscore = highscoreService.saveHighscore(highscoreRequest);
      return new Response(201, "User has updated highscore! ", savedHighscore);
    } catch (IllegalArgumentException e) { // see HighscoreService, illegal argument exception if the user has already beaten the highscore sent from frontend.
      return new Response(400, e.getMessage());
    } catch (Exception e) {
      System.err.println("Error when running /updateHighscore endpoint: " + e);
      return new Response(500, "Internal server error");
    }
  }

  // http://10.201.25.120:8080/highscores
  @GetMapping("/highscores")
  public List<Highscore> getAllHighscores() {
    return highscoreService.getAllHighscores();
  }

  @GetMapping("/highscoreDTOs")
  public List<HighscoreDTO> getAllHighscoreDTOs() {
      return highscoreService.getAllHighscoreDTOs();
  }
  

  // class for the Response process...
  static class Response { // static class, class within another class ()
    // what can be exracted on the frontend... data.status data.message data.savedHighscore
    // private - only used inside this class... or something...
    private int status; //,,,,,,
    private String message;
    private HighscoreDTO savedHighscore; 

    // constructor
    public Response(int status, String message) {
      this.status = status; // not used?
      this.message = message; 
    }

    // constructor but more info if request includes savedHighscore as well?
    public Response(int status, String message, HighscoreDTO savedHighscore) {
      this.status = status;
      this.message = message;
      this.savedHighscore = savedHighscore;
  }

    // Getters and setters
    public int getStatus() {
      return status;
    }

    public void setStatus(int status) {
      this.status = status;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }

    public HighscoreDTO getSavedHighscore() {
      return savedHighscore;
    }

    public void setSavedHighscore(HighscoreDTO savedHighscore) {
      this.savedHighscore = savedHighscore;
    }
  }
}
