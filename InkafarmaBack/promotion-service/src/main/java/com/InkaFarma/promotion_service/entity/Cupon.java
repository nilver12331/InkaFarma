package com.InkaFarma.promotion_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "cupon")
@AllArgsConstructor
@NoArgsConstructor
public class Cupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCupon;
    private String codigo;
    private double descuento; // Porcentaje o monto fijo
    private boolean activo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
