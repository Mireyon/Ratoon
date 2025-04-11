package com.ratoon.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String frontendUrl = System.getenv("FRONTEND_URL"); // Retrieve the URL from an environment variable

        if (frontendUrl != null && !frontendUrl.isEmpty()) {
            registry.addMapping("/**") // Allow all endpoints
                    .allowedOrigins(frontendUrl) // Use the environment variable for the frontend's origin
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                    .allowedHeaders("*") // Allow all headers
                    .allowCredentials(true); // Add this line to enable credentials
        } else {
            // Handle the case where the environment variable is not set
            System.out.println("Frontend URL environment variable not set.");
            registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:5173") // Fallback to localhost for development
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Add this line to enable credentials
        }
    }
}
