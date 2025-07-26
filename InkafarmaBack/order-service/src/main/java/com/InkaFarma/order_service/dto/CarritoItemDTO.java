package com.InkaFarma.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarritoItemDTO {
    private Long idItem;
    private Long idProducto;
    private String nombreProducto;
    private double precio;
    private int cantidad;
    private double descuento;
    private String urlimagen;
}
