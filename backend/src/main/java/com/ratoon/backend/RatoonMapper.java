package com.ratoon.backend;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class RatoonMapper {
    public InfoJoueuseDTO mapToInfoJoueuseDTO(Map<String, Object> jsonData) {
        InfoJoueuseDTO infoJoueuseDTO = new InfoJoueuseDTO();
        infoJoueuseDTO.setNomJoueuse((String) jsonData.get("nomJoueuse"));
        infoJoueuseDTO.setImageName((String) jsonData.get("imageName"));
        infoJoueuseDTO.setNomChaton((String) jsonData.get("nomChaton"));
        infoJoueuseDTO.setEnfance((String) jsonData.get("enfance"));
        infoJoueuseDTO.setCaractere((String) jsonData.get("caractere"));
        infoJoueuseDTO.setDonNaissance((String) jsonData.get("donNaissance"));
        infoJoueuseDTO.setCostaud(jsonData.get("costaud") != null ? (Integer) jsonData.get("costaud") : 0);
        infoJoueuseDTO.setMalin(jsonData.get("malin") != null ? (Integer) jsonData.get("malin") : 0);
        infoJoueuseDTO.setMignon(jsonData.get("mignon") != null ? (Integer) jsonData.get("mignon") : 0);
        infoJoueuseDTO.setCoeur(jsonData.get("coeur") != null ? (Integer) jsonData.get("coeur") : 0);
        infoJoueuseDTO.setAmitie(jsonData.get("amitie") != null ? (Integer) jsonData.get("amitie") : 0);
        infoJoueuseDTO.setOr(jsonData.get("or") != null ? (Integer) jsonData.get("or") : 0);
        infoJoueuseDTO.setArgent(jsonData.get("argent") != null ? (Integer) jsonData.get("argent") : 0);
        infoJoueuseDTO.setBronze(jsonData.get("bronze") != null ? (Integer) jsonData.get("bronze") : 0);
        infoJoueuseDTO.setTalents(jsonData.get("talents") != null 
            ? new ObjectMapper().convertValue(jsonData.get("talents"), new TypeReference<List<String>>() {}) 
            : List.of());
        infoJoueuseDTO.setGrimoire(jsonData.get("grimoire") != null 
            ? new ObjectMapper().convertValue(jsonData.get("grimoire"), new TypeReference<List<String>>() {}) 
            : List.of());
        infoJoueuseDTO.setSacVoyage(jsonData.get("sacVoyage") != null 
            ? new ObjectMapper().convertValue(jsonData.get("sacVoyage"), new TypeReference<List<String>>() {}) 
            : List.of());
        infoJoueuseDTO.setExperienceActuelle(jsonData.get("experienceActuelle") != null ? (Integer) jsonData.get("experienceActuelle") : 0);
        infoJoueuseDTO.setExperienceTotale(jsonData.get("experienceTotale") != null ? (Integer) jsonData.get("experienceTotale") : 0);

        return infoJoueuseDTO;
    }

    public InfoJoueuseDTO mapToInfoJoueuseDTO(String jsonString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonData = objectMapper.readValue(jsonString, new TypeReference<>() {});
        return mapToInfoJoueuseDTO(jsonData);
    }

    public Map<String, Object> mapFromInfoJoueuseDTO(InfoJoueuseDTO dto) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("nomJoueuse", dto.getNomJoueuse());
        map.put("imageName", dto.getImageName());
        map.put("nomChaton", dto.getNomChaton());
        map.put("enfance", dto.getEnfance());
        map.put("caractere", dto.getCaractere());
        map.put("donNaissance", dto.getDonNaissance());
        map.put("costaud", dto.getCostaud());
        map.put("malin", dto.getMalin());
        map.put("mignon", dto.getMignon());
        map.put("coeur", dto.getCoeur());
        map.put("amitie", dto.getAmitie());
        map.put("or", dto.getOr());
        map.put("argent", dto.getArgent());
        map.put("bronze", dto.getBronze());
        map.put("talents", dto.getTalents());
        map.put("grimoire", dto.getGrimoire());
        map.put("sacVoyage", dto.getSacVoyage());
        map.put("experienceActuelle", dto.getExperienceActuelle());
        map.put("experienceTotale", dto.getExperienceTotale());
        return map;
    }
    
}