package com.example.demo.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Highscore;
import com.example.demo.HighscoreDTO;
import com.example.demo.HighscoreRepository;
import com.example.demo.exception.CustomException;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository; // so we can look through and add stuff to the repository!

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private HighscoreRepository highscoreRepository;

  public UserDTO registerUser(String username, String password) {
    if (userRepository.findByUsername(username).isPresent()) { // findByUsername defined in UserRepository.java
      //throw new RuntimeException("User already exists");
      throw new CustomException("user already exists"); // check UserController, use ResponseEntity to send the fitting status code
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user = userRepository.save(user); // .save is built in... save stuff according to User.java

    // Create an empty highscore for the new user
    Highscore highscore = new Highscore();
    highscore.setUser(user); // highscore object has a user object
    user.setHighscore(highscore); // user object gets assigned a highscore object
    highscore = highscoreRepository.save(highscore);

    HighscoreDTO highscoreDTO = new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername());
    return new UserDTO(user.getId(), user.getUsername(), highscoreDTO);
  }

  // only used in an endpoint (api/users/all) so I can see all users created
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // sent to frontend to populate profile page... (/profile endpoint).
  // maybe bad method name since UserDTO always includes the user's Highscore
  public UserDTO getUserWithHighscore (String username) {
    Optional<User> optionalUser = userRepository.findByUsername(username);

    if (optionalUser.isEmpty()) {
      System.out.println("User not found in getUserWithHighscore method");
      throw new IllegalArgumentException("User not found in getUserWithHighscore method");
    }

    // get user as we now know it exists
    User user = optionalUser.get(); 
    Optional<Highscore> optionalHighscore = highscoreRepository.findByUser(user); // Optional because new users won't have a highscore

    // highscore = null if there is no highscore
    Highscore highscore = optionalHighscore.orElse(null); 

    // create highscoreDTO if user has a highscore
    HighscoreDTO highscoreDTO = highscore != null ? new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername()) : null; // null highscoreDTO if no highscore found

    return new UserDTO(user.getId(), user.getUsername(), highscoreDTO);
  }

  // send successful/"user already exists" message to frontend? see HighscoreService... then add message to Controller and DTO ?
}
