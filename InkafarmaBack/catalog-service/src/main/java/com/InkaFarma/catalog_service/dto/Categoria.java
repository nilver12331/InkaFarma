package com.InkaFarma.catalog_service.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

public class Categoria {

    private int idCategoria;
    private String nombre;

    private List<AtributoCategoria> atributoCategoriaList;
}
