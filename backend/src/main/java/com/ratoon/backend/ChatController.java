package com.ratoon.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import org.springframework.messaging.simp.user.SimpUserRegistry;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private SimpUserRegistry userRegistry; // Add user registry to check connected users

    // Endpoint for sending private messages
    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(@Payload ChatMessage message) {
        System.out.println("Received message: " + message);
        message.setTimestamp(LocalDateTime.now().toString());

        // Log active users for debugging
        System.out.println("Active users: " + userRegistry.getUserCount());
        userRegistry.getUsers().forEach(user -> 
            System.out.println("- User session: " + user.getName() + ", sessions: " + user.getSessions().size())
        );

        // Send the message to the recipient using topic instead of user-specific destination
        // This ensures all clients subscribed to this topic will receive the message
        messagingTemplate.convertAndSend(
            "/topic/user." + message.getRecipient(),
            message
        );
        
        // Also send to sender's topic if it's not a self-message
        if (!message.getSender().equals(message.getRecipient())) {
            messagingTemplate.convertAndSend(
                "/topic/user." + message.getSender(),
                message
            );
        }
        
        System.out.println("Message sent to recipient topic: /topic/user." + message.getRecipient() + 
                          " and sender topic: /topic/user." + message.getSender());
    }
}
