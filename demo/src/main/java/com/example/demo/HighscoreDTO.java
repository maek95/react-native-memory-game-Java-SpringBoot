package com.example.demo;

// Highscore Data Transfer Object and Request Object
public class HighscoreDTO {
    private Long id; // This will be null when it's a request to save a new highscore
    private String title;
    private int sequenceLength;
    private String username; // Not user ID because we don't want to expose that to the client; usernames are unique anyway

    // Default constructor, needed for request deserialization
    public HighscoreDTO() {}

    // Parameterized constructor
    public HighscoreDTO(Long id, String title, int sequenceLength, String username) {
        this.id = id;
        this.title = title;
        this.sequenceLength = sequenceLength;
        this.username = username;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getSequenceLength() {
        return sequenceLength;
    }

    public void setSequenceLength(int sequenceLength) {
        this.sequenceLength = sequenceLength;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
