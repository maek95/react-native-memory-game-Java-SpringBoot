package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository; // so we can look through and add stuff to the repository!

  @Autowired
  private PasswordEncoder passwordEncoder;

  public User registerUser(String username, String password) {
    if (userRepository.findByUsername(username).isPresent()) { // findByUsername defined in UserRepository.java
      throw new RuntimeException("User already exists");
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    return userRepository.save(user); // .save is built in... save stuff according to User.java
  }
}
