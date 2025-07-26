package com.InkaFarma.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventarioDTO {
    private int idProducto;
    private int stockDisponible;
    private int stockReservado;
    private LocalDateTime fechaActualizacion;
}
