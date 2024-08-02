package com.example.demo;

import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

/* 
 * 
 * addded this to pom.xml to access .persistance
 * 
 *  <!-- New dependencies added for JPA and H2 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
 */


// 2. **In-memory Database (Using H2 with Spring Boot)**:
/* - **Persistence**: Data is persisted during application runtime but lost on restart unless an external H2 database is used. <- but better with postgreSQL
- **Complexity**: Moderate; requires setting up JPA and an entity class.
- **Scalability**: Better than an array, supports complex queries.
- **Use Case**: Suitable for development, testing, or small applications that do not require long-term persistence. */

// ONLY HAVE TO CHANGE dependencies and application.properties to swap to postgreSQL!!!!! <- host postgreSQL on AWS RDS for example, or test with MAMP?
@Entity  // simpliifed SQL...
public class Highscore {

  @Id // simplified SQL...
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  // JPA will automatically create columns based on the field names in your entity class.
  // can set @Columns here but not needed
  // @Column(name = "highscore_title", nullable = false, length = 100)
  private String title; 
  // can set @Columns here but not needed
  // @Column(name = "sequence_length", nullable = false)
  private int sequenceLength;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false) // foreign key relationship between two entities
  @JsonIgnore // avoid serialization issues?
  private User user;

  // Default constructor, empty because:
  /* JPA (the database thingy) providers use reflection to create instances of the entity class. This process requires a no-argument constructor to ensure that the provider can create an instance of the entity without needing any specific initialization. */
  public Highscore() {}

  // Parameterized constructor
  public Highscore(String title, int sequenceLength, User user) {
    // dont need id here?
    this.title = title;
    this.sequenceLength = sequenceLength;
    this.user = user; // link the whole User Entity rather than just the user_id, due to how JPA  (Java Persistence API) works.
  }

  // Getters and setters
  public Long getId() { // Long because ids can be very long? xd
    return id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title; // this. so we can have the same variable name 'title' as the input String variable 'title'
  }

  public int getSequenceLength() {
    return sequenceLength;
  }

  public void setSequenceLength(int sequenceLength) {
    this.sequenceLength = sequenceLength;
  }

 public User getUser() {
    return user;
 }

 public void setUser(User user) {
    this.user = user;
 }
  
}
