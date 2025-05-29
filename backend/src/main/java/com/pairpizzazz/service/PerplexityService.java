package com.pairpizzazz.service;

import com.pairpizzazz.config.PerplexityConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PerplexityService {

    private final PerplexityConfig config;
    private final RestTemplate restTemplate;

    public PerplexityService(PerplexityConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public Map<String, String> getNamesConnection(String name1, String name2) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + config.getApiKey());

        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an expert specializing in connecting name meanings." +
                " When given two names, generate a single paragraph, no longer than 200 words that starts with both names," +
                " briefly explains their individual meanings/origins, then creatively links them through historical/cultural" +
                " connections (if any exist) or imaginative symbolic harmony. Always maintain an uplifting, inclusive tone" +
                " using simple language, highlight positive qualities, and conclude with an encouraging statement that makes" +
                " users proud of their name choices. If no direct connection exists, invent a thoughtful pairing based on" +
                " meanings while clearly distinguishing factual origins from creative interpretation." +
                " Add logical and honest name match percentage in last (irrespective of text above) with reason." +
                " Important: Do not show your thinking, reasoning, steps, or any explanation." +
                " Only output the final single-paragraph story as specified." +
                " Do not include any introductory, closing or process statements.");

        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "Names are " + name1 + " and " + name2);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", config.getModel());
        requestBody.put("messages", List.of(systemMessage, userMessage));
        requestBody.put("max_tokens", 4000);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response = restTemplate.postForObject(
                    config.getApiUrl(),
                    request,
                    Map.class
            );

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    String content = (String) message.get("content");
                    
                    // Remove any XML-like tags
                    content = content.replaceAll("<[^>]+>", "").trim();
                    
                    // Remove content within square brackets
                    content = content.replaceAll("\\[[^\\]]*\\]", "").trim();
                    
                    // Split by newlines and get the last non-empty paragraph
                    String[] paragraphs = content.split("\\n");
                    String lastParagraph = "";
                    for (int i = paragraphs.length - 1; i >= 0; i--) {
                        String paragraph = paragraphs[i].trim();
                        if (!paragraph.isEmpty()) {
                            lastParagraph = paragraph;
                            break;
                        }
                    }

                    Map<String, String> result = new HashMap<>();
                    result.put("result", lastParagraph);
                    return result;
                }
            }
            throw new RuntimeException("Invalid response from Perplexity API");
        } catch (Exception e) {
            throw new RuntimeException("Error calling Perplexity API: " + e.getMessage(), e);
        }
    }
} 