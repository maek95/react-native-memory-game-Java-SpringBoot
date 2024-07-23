package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HighscoreService {

  @Autowired // what is this?
  private HighscoreRepository highscoreRepository; // makes an HighscoreRepository instance

  // This function has acces to the Highscore class and its attributes/functions!
  public Highscore saveHighscore(HighscoreRequest highscoreRequest) { // highscoreRequest from frontend as input!
    /*
     * Highscore highscore = new Highscore();
     * 
     * highscore.setTitle(highscoreRequest.getTitleDifficultyPerfected());
     * highscore.setSequenceLength(highscoreRequest.getSequenceLength());
     * 
     * return highscoreRepository.save(highscore); // inbuilt function to save to
     * JPA repository
     */

    Highscore hardestDifficultyPerfected = getHardestDifficultyPerfected(); // Fetch the hardest difficulty perfected 
                                                                            

    // if the if-statement is satisfied a new highscore is saved, otherwise (else-if) it is not saved and an IllegalArgumentException
    if (hardestDifficultyPerfected == null ||
        hardestDifficultyPerfected.getSequenceLength() == 0 ||
        highscoreRequest.getSequenceLength() > hardestDifficultyPerfected.getSequenceLength()) {

      Highscore newHighscore = new Highscore();
      newHighscore.setTitle(highscoreRequest.getTitleDifficultyPerfected());
      newHighscore.setSequenceLength(highscoreRequest.getSequenceLength());

      return highscoreRepository.save(newHighscore);
    } else if (hardestDifficultyPerfected.getSequenceLength() > highscoreRequest.getSequenceLength()) {
      throw new IllegalArgumentException(
        "User has already beaten a harder difficuly: " + hardestDifficultyPerfected.getTitle());
    } else if (hardestDifficultyPerfected.getSequenceLength() == highscoreRequest.getSequenceLength()) {
      throw new IllegalArgumentException(
        "User has already beaten this difficulty: " + hardestDifficultyPerfected.getTitle());
    } else {
      throw new IllegalArgumentException("Invalid highscore update request.");
    }
  }

  public List<Highscore> getAllHighscores() {
    return highscoreRepository.findAll(); // inbuilt function in JPA repository
  }

  private Highscore getHardestDifficultyPerfected() {
    // create a List of all the saved Highscore objects
    List<Highscore> highscores = highscoreRepository.findAll();
    

    Highscore hardest = new Highscore("", 0); // Initialize with placeholder values, will be used to compare to the Highscore objects in the List

    // for-loop that iterates every Highscore object in the 'highscores' list... 
    for (Highscore highscore : highscores) {
      if (highscore.getSequenceLength() > hardest.getSequenceLength()) {
        hardest = highscore;
      }
    }

    // if hardest difficulty perfected has a sequenceLength of 0, i.e. the placeholder one we made above, we return null, otherwise we return the Highscore object 'hardest'
    return hardest.getSequenceLength() == 0 ? null : hardest;

    /* return highscores.stream().max((h1, h2) -> Integer.compare(h1.getSequenceLength(), h2.getSequenceLength()))
        .orElse(null); */
  }
}
