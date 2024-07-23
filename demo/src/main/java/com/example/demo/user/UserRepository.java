package com.example.demo.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username); //  help avoid NullPointerException and to make the code more readable and expressive.... handle the case where a user with a given username might not exist.
} 