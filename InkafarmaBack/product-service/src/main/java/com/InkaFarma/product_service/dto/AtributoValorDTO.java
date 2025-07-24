package com.InkaFarma.product_service.dto;

import lombok.Data;

@Data
public class AtributoValorDTO {
    private int idAtributo;           // ID del atributo (ej. 1)
    private String nombreAtributo;    // Nombre del atributo (ej. "Concentración")

    private int idValorAtributo;      // ID del valor (ej. 8)
    private String valor;
}
