package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users") // All endpoints in the UserController will start with /api/users, making it clear that they belong to the user-related API.
public class UserController {
  @Autowired // The @Autowired annotation ensures that the correct Class(??) instance is injected where needed.
  private UserService userService;

  @PostMapping("/register")
  public UserDTO registerUser(@RequestBody User user) { // request should include data that fits the User class...
    return userService.registerUser(user.getUsername(), user.getPassword()); // send username and password to the repository
  }

  // send successful account-creation message? add it in UserService
}
