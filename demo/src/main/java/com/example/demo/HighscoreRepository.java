package com.example.demo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.user.User;


public interface HighscoreRepository extends JpaRepository<Highscore, Long> {
 
  //List<Highscore> findByUser(User user); // List if a user can have multiple highscores
  Optional<Highscore> findByUser(User user);
}
