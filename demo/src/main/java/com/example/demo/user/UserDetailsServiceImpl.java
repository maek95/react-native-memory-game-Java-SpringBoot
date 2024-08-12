package com.example.demo.user;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// // This class is used to fetch user details from the database and convert them into UserDetails objects that Spring Security can use for authentication.
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  
  @Autowired
  private UserRepository userRepository;

  // This method is called by Spring Security during authentication to load user details by username.
  @Override // override the default method of spring's UserDetails
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

     // Fetch the user from the database using the UserRepository.
     // Converts the User object to a Spring Security UserDetails object.
    User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    // Spring Security stuff... 
    return org.springframework.security.core.userdetails.User.withUsername(user.getUsername()).password(user.getPassword()).authorities("USER").build();

    // same thing as above but requires you to manage the list of authorities manually...?
  /*   return new org.springframework.security.core.userdetails.User(
    user.getUsername(),
    user.getPassword(),
    new ArrayList<>() // or you can fetch user roles/authorities and pass them here
    ); */
  }
}
