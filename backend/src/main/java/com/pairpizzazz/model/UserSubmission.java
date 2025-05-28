package com.pairpizzazz.model;

import java.time.LocalDateTime;

public class UserSubmission {
    private String firstName;
    private String lastName;
    private LocalDateTime timestamp;

    public UserSubmission(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.timestamp = LocalDateTime.now();
    }

    // Getters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // Setters
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
} 