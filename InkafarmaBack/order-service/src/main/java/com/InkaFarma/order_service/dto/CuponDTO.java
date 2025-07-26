package com.InkaFarma.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CuponDTO {
    private String codigo;
    private double descuento;
    private boolean activo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
