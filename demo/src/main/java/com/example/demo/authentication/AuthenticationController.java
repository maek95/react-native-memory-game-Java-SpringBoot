package com.example.demo.authentication;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Highscore;
import com.example.demo.HighscoreDTO;
import com.example.demo.HighscoreRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.util.JwtUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class AuthenticationController {

  //jwt stuff
  @Autowired
  private AuthenticationManager authenticationManager;
  
  //jwt stuff
  @Autowired // automatically find fitting instance
  private JwtUtil jwtTokenUtil;

  //jwt stuff
  @Autowired
  private UserDetailsService userDetailsService; //  loading user details from a data source (e.g., database) and returning a UserDetails object.

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private HighscoreRepository highscoreRepository;

  @PostMapping("/login")
  public AuthenticationDTO createAuthenticationToken (@RequestBody Authentication authentication) throws Exception { // requestBody should include the info Authentication requires: username and password
      

    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(authentication.getUsername(),  authentication.getPassword()) // from our Authentication.java class
    );

    // UserDetails is an interface provided by Spring Security. It provides core user information such as username, password, and authorities (roles or permissions). The UserDetails interface abstracts the user information needed for authentication.
    
    final UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getUsername());
    final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());
    //final String titleDifficultyPerfected = userDetails

    // load in User class, UserDetails does not have e.g. current highscore and stuff
    User user = userRepository.findByUsername(authentication.getUsername()).orElseThrow();
    // new user wont have a highscore:
    Optional<Highscore> optionalHighscore = highscoreRepository.findByUser(user);
    HighscoreDTO highscoreDTO = null;
   /*  String highscoreTitle = ""; // Default... should we call it titleDifficultyPerfected to be consistent?
    int highscoreSequenceLength = 0; // Default */

    if (optionalHighscore.isPresent()) {
      Highscore highscore = optionalHighscore.get(); // get highscore object if present
    /*   highscoreTitle = highscore.getTitle();
      highscoreSequenceLength = highscore.getSequenceLength(); */
      highscoreDTO = new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername());
    } else {
      System.out.println("New user, giving it an empty highscore object");
    }
      
    // send 'jwt' and 'username' to frontend after succesful login... accessed on frontend by e.g. data.jwt and data.username. It follows structure of AuthenticationDTO.java
    //return new AuthenticationDTO(jwt, userDetails.getUsername(), highscoreTitle, highscoreSequenceLength);
    return new AuthenticationDTO(jwt, userDetails.getUsername(), highscoreDTO);
  }
  
}
