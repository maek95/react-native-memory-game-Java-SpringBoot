package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HighscoreRepository extends JpaRepository<Highscore, Long> {
  // dont need Optional here because there wont be any queries that search for a specific highscore that doesnt exist and could return 'null'. findById and findAll handle null internally!
}
