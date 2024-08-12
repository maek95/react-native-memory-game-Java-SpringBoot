package com.example.demo.authentication;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestHeader;


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
    final UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getUsername()); // loadUserByUsername is a built-in method that follows security checks or something...
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

  // useful when backend gets restarted and data is wiped, can then send token from frontend to check if user still exists
  @PostMapping("/verify")
  public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authorizationHeader) { // token sent in Authorization header
      
     String token = authorizationHeader.replace("Bearer ", ""); // 'Authorization': `Bearer ${token}`, // <- frontend

     // in my case this is enough to "validate" the token because I have not set tokens to expire
     String username = jwtTokenUtil.extractUsername(token);

     // validate token is a safety precausion in case it is expired, or issued for a different user somehow, or tampered with 
     if (jwtTokenUtil.validateToken(token, username)) {
        User user = userRepository.findByUsername(username).orElseThrow(); // find user class/object
        Optional<Highscore> optionalHighscore = highscoreRepository.findByUser(user); // optional because new users dont have a highscore yet
        HighscoreDTO highscoreDTO = null; // null in case user has no highscore

        if (optionalHighscore.isPresent()) {
          Highscore highscore = optionalHighscore.get();
          // highscore object that is sent to frontend (DTO)
          highscoreDTO = new HighscoreDTO(highscore.getId(), highscore.getTitle(), highscore.getSequenceLength(), user.getUsername());
        } else {
          System.out.println("No highscore found for user " + user.getUsername());
        }

        return ResponseEntity.ok(new AuthenticationDTO(token, username, highscoreDTO)); // send relevant data if authentication is success, I dont extract this on frontend atm though...?
     } else {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid token");
     }      
  }
  
  
}
