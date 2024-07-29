package com.example.demo.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  private UserDetailsService userDetailsService;

  @PostMapping("/login")
  public AuthenticationDTO createAuthenticationToken (@RequestBody Authentication authentication) throws Exception { // requestBody should include the info Authentication requires: username and password
      

    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(authentication.getUsername(),  authentication.getPassword()) // from our Authentication.java class
    );

    final UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getUsername());
    final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());
      

    return new AuthenticationDTO(jwt);
  }
  
}
