package com.example.demo.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.HighscoreDTO;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrorResponse;
import com.example.demo.util.JwtUtil;

@RestController
@RequestMapping("/api/users") // All endpoints in the UserController will start with /api/users, making it clear that they belong to the user-related API.
public class UserController {
  @Autowired // The @Autowired annotation ensures that the correct Class(??) instance is injected where needed.
  private UserService userService;

  @Autowired
  private JwtUtil jwtUtil;

  @PostMapping("/register")
  public UserDTO registerUser(@RequestBody User user) 
  { // change to UserDTO - no because we need getPassword() ?
    System.out.println("Received registerUser request: " + user.getUsername()); // Log request

    return userService.registerUser(user.getUsername(), user.getPassword()); // the registerUser method in UserController will save the username and password (encrypted) in the repository and return a UserDTO (id and username) here, which is then sent to the frontend/thunderclient through this endpoint!
  }

// if I want to make custom responses to frontend...
/*  @PostMapping("/register")
 public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {
  UserDTO userDTO = userService.registerUser(user.getUsername(), user.getPassword());

  return new ResponseEntity<>(userDTO, HttpStatus.CREATED); // send the userDTO and a status code "created" 
 }
   */
 // typically ResponseEntity<String> but we want to return JSON so had to make a response Object (see my ErrorResponse class)
/*  @ExceptionHandler(CustomException.class)
 public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(CustomException e) {
  ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
  //return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
 }
 */

 @PostMapping("/profile")
 public ResponseEntity<?> getUserProfile(@RequestBody TokenRequest tokenRequest) {
     try {
       String username = jwtUtil.extractUsername(tokenRequest.getToken());
       // maybe bad method name 'getUserWithHighscore' since UserDTO always includes the user's Highscore
       UserDTO userDTO = userService.getUserWithHighscore(username);

       return new ResponseEntity<>(userDTO, HttpStatus.OK);
     } catch (Exception e) {

      return new ResponseEntity<>(new ErrorResponse("Error retrieving user information", HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);

     }
    
 }
 

  // just so I can view all created users, wont actually be used otherwise
  @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return users.stream()
                  .map(user -> {
                    HighscoreDTO highscoreDTO = null;
                    if (user.getHighscore() != null) {
                      // get the user's highscore, hence e.g. user.getHighscore.getTitle()... get the highscore title specific to the user
                      highscoreDTO = new HighscoreDTO(user.getHighscore().getId(), user.getHighscore().getTitle(), user.getHighscore().getSequenceLength(), user.getUsername());
                    }
                    return new UserDTO(user.getId(), user.getUsername(), highscoreDTO);
                  }).toList();

        /*  return users.stream()
                    .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getHighscore()))
                    .toList(); // Converting User to UserDTO */
              
    }


     // Class to receive the token from the frontend
     static class TokenRequest {
      private String token;

      public TokenRequest() {}

      public TokenRequest(String token) {
          this.token = token;
      }

      public String getToken() {
          return token;
      }

      public void setToken(String token) {
          this.token = token;
      }
  }
}
