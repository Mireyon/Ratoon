package com.ratoon.backend;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
class RatoonController {
    private final RatoonMapper mapper = new RatoonMapper();
    @GetMapping("/infoJoueuse/{name}")
    public InfoJoueuseDTO getJson(@PathVariable String name) throws IOException {
        Path path = Paths.get("users_data", name + ".json");
        String content = Files.readString(path);
        return mapper.mapToInfoJoueuseDTO(new ObjectMapper().readValue(content, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {}));
    }

    @PutMapping("/infoJoueuse/{name}")
    public ResponseEntity<Void> postMethodName(@PathVariable String name, @RequestBody InfoJoueuseDTO dto) throws IOException {

        Map<String, Object> data = mapper.mapFromInfoJoueuseDTO(dto);
        
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonContent = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);

        Path path = Paths.get("users_data", name + ".json");

        Files.writeString(path, jsonContent, StandardOpenOption.TRUNCATE_EXISTING);

        return ResponseEntity.ok().build();
    }

    // Folder where images are stored
    private final Path imageDirectory = Paths.get("users_data/images/");

    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = imageDirectory.resolve(imageName);
            Resource resource = new UrlResource(imagePath.toUri());
            
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Use the appropriate MIME type based on your image
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageName + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
