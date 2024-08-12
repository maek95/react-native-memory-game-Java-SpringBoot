package com.example.demo.user;

import com.example.demo.Highscore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity // need this for H2... simplified SQL 
@Table(name = "users") // Renaming table to "users"... "user" is a reserved word or something in H2...
public class User {

  @Id // I think this automatically creates "users_id" column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // Long because id can be very long...

  @Column(nullable = false, unique = true) // simplified SQL 
  private String username;

  @Column(nullable = false)
  private String password;

  //connect user to its highscore
  //@OneToMany // if one user wouldve had many highscores
  // @OneToOne: Specifies a one-to-one relationship with the Highscore entity.
  // mappedBy: Indicates that the 'user' field in the Highscore entity owns the relationship.
  // cascade: Specifies that related entity operations (persist, merge, remove, etc.) should be cascaded... For example, if you delete a User, the associated Highscore will also be deleted automatically.
  // CascadeType.ALL: All operations should be cascaded.
  // fetch: Defines the fetching strategy (LAZY: fetch on demand).
  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private Highscore highscore;

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Highscore getHighscore() { // get the Highscore class connected to this User
    return highscore;
  }

  // set the user's highscore, following the structure of the Highscore class and has access to its methods if needed...highscore.getTitle ... highscore.sequenceLength
  public void setHighscore(Highscore highscore) {
    this.highscore = highscore;
  }
}
