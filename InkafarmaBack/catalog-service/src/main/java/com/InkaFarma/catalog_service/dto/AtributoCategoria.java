package com.InkaFarma.catalog_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class AtributoCategoria {
    private int idAtributoCatengoria;
    private Categoria categoria;
    private Atributo atributo;
    private List<ValorAtributo> valorAtributos;
}
