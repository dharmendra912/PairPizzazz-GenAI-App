package com.pairpizzazz.controller;

import com.pairpizzazz.service.NameService;
import com.pairpizzazz.model.UserSubmission;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/names")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class NameController {
    private static final Logger logger = LoggerFactory.getLogger(NameController.class);
    private final NameService nameService;

    public NameController(NameService nameService) {
        this.nameService = nameService;
        logger.debug("NameController initialized");
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getNamesConnection(
            @RequestParam String name1,
            @RequestParam String name2) {
        logger.debug("Received request for names: {} and {}", name1, name2);
        try {
            Map<String, String> response = nameService.getNamesConnection(name1, name2);
            logger.debug("Successfully generated connection for names");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.debug("Error processing request", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error processing request: " + e.getMessage());
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<List<UserSubmission>> getStats() {
        logger.debug("Stats endpoint accessed");
        try {
            List<UserSubmission> submissions = nameService.getAllSubmissions();
            return ResponseEntity.ok(submissions);
        } catch (Exception e) {
            logger.debug("Error retrieving stats", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error retrieving stats: " + e.getMessage());
        }
    }
} 