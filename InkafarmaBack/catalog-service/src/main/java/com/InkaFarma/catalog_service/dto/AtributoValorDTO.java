package com.InkaFarma.catalog_service.dto;

import lombok.Data;

@Data
public class AtributoValorDTO {
    private int idAtributo;
    private String nombreAtributo;

    private int idValorAtributo;
    private String valor;
}
