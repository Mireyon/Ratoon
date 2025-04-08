package com.ratoon.backend;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InfoJoueuseDTO {
    private String nomJoueuse;
    private String imageName;
    private String nomChaton;
    private String enfance;
    private String caractere;
    private String donNaissance;
    private int costaud;
    private int malin;
    private int mignon;
    private int coeur;
    private int amitie;
    private int or;
    private int argent;
    private int bronze;
    private List<String> talents;
    private List<String> grimoire;
    private List<String> sacVoyage;
    private int experienceActuelle;
    private int experienceTotale;
}
