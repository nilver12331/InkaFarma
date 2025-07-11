package com.InkaFarma.inventario_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventario")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idInventario;

    private Integer idProducto;     // referencia al product-service

    private int stockDisponible;

    private int stockReservado;

    private LocalDateTime ultimaActualizacion;
}
