package com.pairpizzazz.service;

import com.pairpizzazz.model.UserSubmission;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ArrayList;

@Service
public class NameService {
    
    private final PerplexityService perplexityService;
    private static final int MAX_NAME_LENGTH = 20;
    private static final String NAME_PATTERN = "^[a-zA-Z]+$";
    private static final int MAX_STORED_SUBMISSIONS = 5000;
    
    // Using LinkedHashMap to maintain insertion order
    private final LinkedHashMap<String, UserSubmission> userSubmissions = new LinkedHashMap<>();
    
    public NameService(PerplexityService perplexityService) {
        this.perplexityService = perplexityService;
    }
    
    public Map<String, String> getNamesConnection(String name1, String name2) {
        validateName(name1, "First name");
        validateName(name2, "Second name");
        
        // Store the submission
        storeSubmission(name1, name2);
        
        return perplexityService.getNamesConnection(name1, name2);
    }

    public void storeSubmission(String firstName, String lastName) {
        String key = firstName + "_" + lastName + "_" + System.currentTimeMillis();
        UserSubmission submission = new UserSubmission(firstName, lastName);
        
        // Remove oldest entry if we've reached the limit
        if (userSubmissions.size() >= MAX_STORED_SUBMISSIONS) {
            userSubmissions.remove(userSubmissions.keySet().iterator().next());
        }
        
        userSubmissions.put(key, submission);
    }

    public List<UserSubmission> getAllSubmissions() {
        return new ArrayList<>(userSubmissions.values());
    }

    private void validateName(String name, String fieldName) {
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                fieldName + " cannot be empty");
        }

        String trimmedName = name.trim();
        
        // Check for non-alphabetic characters
        if (!trimmedName.matches(NAME_PATTERN)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                fieldName + " must contain only English alphabets (a-z, A-Z)");
        }

        if (trimmedName.length() > MAX_NAME_LENGTH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                fieldName + " must not exceed " + MAX_NAME_LENGTH + " characters");
        }

        if (trimmedName.contains(" ")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                fieldName + " must not contain spaces");
        }
    }
} 