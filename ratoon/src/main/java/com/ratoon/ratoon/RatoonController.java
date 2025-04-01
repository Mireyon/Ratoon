package com.ratoon.ratoon;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
class RatoonController {
    private final RatoonMapper mapper = new RatoonMapper();
    @GetMapping("/infoJoueuse/{name}")
    public InfoJoueuseDTO getJson(@PathVariable String name) throws IOException {
        var resource = new ClassPathResource(String.format("users_data/%s.json", name));
        String content = Files.readString(Paths.get(resource.getURI()));
        return mapper.mapToInfoJoueuseDTO(new ObjectMapper().readValue(content, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {}));
    }

    @GetMapping("/ciao")
    public String sayCiao() {
        return "Ciao, Spring Boot!";
    }
}
