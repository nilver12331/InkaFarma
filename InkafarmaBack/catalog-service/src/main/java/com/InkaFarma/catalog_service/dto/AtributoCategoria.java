package com.InkaFarma.catalog_service.dto;

import lombok.Data;

@Data
public class AtributoCategoria {
    private int idAtributoCatengoria;
    private Categoria categoria;
    private Atributo atributo;
}
