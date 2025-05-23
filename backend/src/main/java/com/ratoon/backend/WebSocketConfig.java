package com.ratoon.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Prefix for application destination (e.g. "/app/sendPrivateMessage")
        registry.setApplicationDestinationPrefixes("/app");
        
        // Prefix for subscription destinations (e.g. "/user/{username}/queue/messages")
        registry.enableSimpleBroker("/queue", "/topic");
        
        // Prefix for user-specific destinations
        registry.setUserDestinationPrefix("/user");
    }
}
