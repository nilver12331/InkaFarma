package com.InkaFarma.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemResumenDTO {
    private Long idProducto;
    private String nombreProducto;
    private int cantidad;
    private double precioUnitario;
    private double descuento;   // Descuento aplicado al producto
    private double subtotal;
}
