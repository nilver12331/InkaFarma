package com.InkaFarma.promotion_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@Table(name = "promocion")
@AllArgsConstructor
@NoArgsConstructor
public class Promocion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPromocion;
    private String descripcion;
    private double descuento;
    private Long idProducto; // o idCategoria según el alcance
    private boolean activo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
