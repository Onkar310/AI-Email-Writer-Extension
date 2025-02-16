package com.email.writer.application;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AIEmailWriterController {

    private final AIEmailWriterService aiEmailWriterService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = aiEmailWriterService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }


}
