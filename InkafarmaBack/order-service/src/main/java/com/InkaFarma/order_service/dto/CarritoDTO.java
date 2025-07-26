package com.InkaFarma.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarritoDTO {
    private Long idCarrito;
    private Integer idCliente;
    private boolean activo;
    private List<CarritoItemDTO> items;
}
