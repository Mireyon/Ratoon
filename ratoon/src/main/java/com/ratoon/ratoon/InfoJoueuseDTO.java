package com.ratoon.ratoon;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class InfoJoueuseDTO {
    private String nomJoueuse;
    private String nomChaton;
    private String enfance;
    private String caractere;
    private String donNaissance;
    private int costaud;
    private int malin;
    private int mignon;
    private int coeur;
    private int amitie;
    private List<String> talents;
    private List<String> grimoire;
    private List<String> sacVoyage;
    private int experienceActuelle;
    private int experienceTotale;
}
