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
        systemMessage.put("content", "You are an expert in name meanings and symbolic interpretation." +
                " When given two names, generate a single paragraph (max 200 words) that starts with both names." +
                " First, briefly explain the individual meanings and origins of each name." +
                " Then thoughtfully explore any possible symbolic, thematic, cultural, or historical connection—even if indirect—between them." +
                " If no direct link exists, use creative reasoning to propose an imaginative but plausible connection, clearly distinguishing fact from interpretation." +
                " Always aim to find a meaningful connection, but do not force one. If the match is weak, state it clearly and explain why." +
                " Use clear, thoughtful, and engaging language—not overly positive or flowery, but still warm and reflective." +
                " At the end, include a name match percentage with a short, honest justification." +
                " Output only the final paragraph as specified—no steps, disclaimers, or additional explanation.");

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