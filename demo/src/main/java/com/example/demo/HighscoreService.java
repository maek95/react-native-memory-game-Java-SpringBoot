package com.example.demo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.user.User;
import com.example.demo.user.UserDTO;
import com.example.demo.user.UserRepository;

// define what will be sent to frontend and stuff
@Service
public class HighscoreService {

  @Autowired // finds the appropriate instance or something
  private HighscoreRepository highscoreRepository; // makes an HighscoreRepository instance

  @Autowired
  private UserRepository userRepository;

  
  // This function has acces to the HighscoreDTO class and its attributes/functions!
  public HighscoreDTO saveHighscore(HighscoreRequest highscoreRequest) { // the request from frontend has the structure of highscoreRequest class

    //User user = userRepository.findByUsername(highscoreRequest.getUsername());
    // Optional to deal with the potential absence of a value for User, if it's null for some reason when doing a HighscoreRequest
    Optional<User> optionalUser = userRepository.findByUsername(highscoreRequest.getUsername());
    /* if (user == null ) {
      throw new IllegalArgumentException("User not found");
    } *
    */
    if (optionalUser.isEmpty() ) {
      System.out.println("User not found");
      throw new IllegalArgumentException("User not found");
    }

    // get User object if it is present
    User user = optionalUser.get(); 

    // Check if the user already has a highscore
    Optional<Highscore> optionalHighscore = highscoreRepository.findByUser(user);
  
    //Highscore hardestDifficultyPerfected = getHardestDifficultyPerfected(user); // Already done above 

    Highscore highscore;
    if (optionalHighscore.isPresent()) {
      Highscore existingHighscore = optionalHighscore.get();

      if (highscoreRequest.getSequenceLength() > existingHighscore.getSequenceLength()) {

        // save highscore to user 
        existingHighscore.setTitle(highscoreRequest.getTitleDifficultyPerfected());
        existingHighscore.setSequenceLength(highscoreRequest.getSequenceLength());

        System.out.println("Saved new highscore " + highscoreRequest.getTitleDifficultyPerfected() + "to user " + user.getUsername());
        
       // return highscoreRepository.save(existingHighscore);
       highscore = highscoreRepository.save(existingHighscore);
      } else if (existingHighscore.getSequenceLength() > highscoreRequest.getSequenceLength()) {

        System.out.println("User " + user.getUsername() + " has already beaten a harder difficuly: " + existingHighscore.getTitle());

        throw new IllegalArgumentException(
          "User has already beaten a harder difficuly: " + existingHighscore.getTitle());
      } else if (existingHighscore.getSequenceLength() == highscoreRequest.getSequenceLength()) {

        System.out.println("User " + user.getUsername() + "  has already beaten this difficulty: " + existingHighscore.getTitle());

        throw new IllegalArgumentException(
        "User has already beaten this difficulty: " + existingHighscore.getTitle());
      } else {
        throw new IllegalArgumentException("Invalid highscore update request.");
      }
    } else {
      Highscore firstHighscore = new Highscore();
      firstHighscore.setTitle(highscoreRequest.getTitleDifficultyPerfected());
      firstHighscore.setSequenceLength(highscoreRequest.getSequenceLength());
      firstHighscore.setUser(user); // save this new highscore object to the user that is logged in
     
      highscore = highscoreRepository.save(firstHighscore);

      System.out.println("No saved highscore, setting highscore " + highscoreRequest.getTitleDifficultyPerfected() + "to user " + user.getUsername());   
      //return highscoreRepository.save(firstHighscore);
    }    
    
    return new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername());
    // if the if-statement is satisfied a new highscore is saved, otherwise (else-if) it is not saved and an IllegalArgumentException
   /*  if (hardestDifficultyPerfected == null ||
        hardestDifficultyPerfected.getSequenceLength() == 0 ||
        highscoreRequest.getSequenceLength() > hardestDifficultyPerfected.getSequenceLength()) {

      Highscore newHighscore = new Highscore();
      newHighscore.setTitle(highscoreRequest.getTitleDifficultyPerfected());
      newHighscore.setSequenceLength(highscoreRequest.getSequenceLength());
      newHighscore.setUser(user);

      return highscoreRepository.save(newHighscore);
    } else if (hardestDifficultyPerfected.getSequenceLength() > highscoreRequest.getSequenceLength()) {
      throw new IllegalArgumentException(
        "User has already beaten a harder difficuly: " + hardestDifficultyPerfected.getTitle());
    } else if (hardestDifficultyPerfected.getSequenceLength() == highscoreRequest.getSequenceLength()) {
      throw new IllegalArgumentException(
        "User has already beaten this difficulty: " + hardestDifficultyPerfected.getTitle());
    } else {
      throw new IllegalArgumentException("Invalid highscore update request.");
    } */
  }

  // shows all the highscore objects on backend
  // NOTE: You will not see any user-information here even though a highscore is connected to another entity (User). I guess it would be overflooded if this would show all connected entities.. like if we had a lot of them?
  public List<Highscore> getAllHighscores() {
    return highscoreRepository.findAll(); // inbuilt function in JPA repository
  }

  // shows all the highscoreDTO objects that can be sent to frontend.
  // this contains all Highscore information, AND the user's username
  public List<HighscoreDTO> getAllHighscoreDTOs() {
    return highscoreRepository.findAll().stream()
            .map(highscore -> new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), highscore.getUser().getUsername())).collect(Collectors.toList());
  }


  // not used yet?
  public UserDTO getUserWithHighscore(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }

        User user = optionalUser.get();
        Optional<Highscore> optionalHighscore = highscoreRepository.findByUser(user);

        Highscore highscore = optionalHighscore.orElse(null);
        HighscoreDTO highscoreDTO = highscore != null ? new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername()) : null;

        return new UserDTO(user.getId(), user.getUsername(), highscoreDTO);
    }

 /*  private Highscore getHardestDifficultyPerfected(User user) {
    // create a List of all the saved Highscore objects
    //List<Highscore> highscores = highscoreRepository.findAll();
    List<Highscore> highscores = highscoreRepository.findByUser(user);
    

    Highscore hardest = new Highscore("", 0); // Initialize with placeholder values, will be used to compare to the Highscore objects in the List

    // for-loop that iterates every Highscore object in the 'highscores' list... 
    for (Highscore highscore : highscores) {
      if (highscore.getSequenceLength() > hardest.getSequenceLength()) {
        hardest = highscore;
      }
    }

    // if hardest difficulty perfected has a sequenceLength of 0, i.e. the placeholder one we made above, we return null, otherwise we return the Highscore object 'hardest'
    return hardest.getSequenceLength() == 0 ? null : hardest;
  } */
}
