package com.email.writer.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AIEmailWriterService {
    private final WebClient webClient;

    public AIEmailWriterService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }



    @Value("${gemini.api.key}")
    private String geminiApiKey;
    @Value("${gemini.api.url}")
    private String geminiApiUrl;;



    public String generateEmailReply(EmailRequest emailRequest){
        String prompt = buildPrompt(emailRequest);

        Map<String,Object> requestBody=Map.of(
                "contents", new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text",prompt)
                        })
                }
        );

        String response = webClient.post().uri(geminiApiUrl+geminiApiKey).header("Content-Type","application/json").bodyValue(requestBody).retrieve().bodyToMono(String.class).block();

        return parseResponse(response);

    }

    private String parseResponse(String response) {

        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response);
            return jsonNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
        }catch (Exception e){
            return "Error parse response";
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please dont generate subject line.") ;
        if (emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()
        ){
            prompt.append("Use this tone ").append(emailRequest.getTone());
        }
        prompt.append("Original email is: ").append(emailRequest.getEmailContent());
        return prompt.toString();


    }


}
