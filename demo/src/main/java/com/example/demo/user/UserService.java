package com.example.demo.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.exception.CustomException;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository; // so we can look through and add stuff to the repository!

  @Autowired
  private PasswordEncoder passwordEncoder;

  public UserDTO registerUser(String username, String password) {
    if (userRepository.findByUsername(username).isPresent()) { // findByUsername defined in UserRepository.java
      //throw new RuntimeException("User already exists");
      throw new CustomException("user already exists"); // check UserController, use ResponseEntity to send the fitting status code
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user = userRepository.save(user); // .save is built in... save stuff according to User.java
    return new UserDTO(user.getId(), user.getUsername());
  }

  // only used in an endpoint (api/users/all) so I can see all users created
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // send successful/"user already exists" message to frontend? see HighscoreService... then add message to Controller and DTO ?
}
