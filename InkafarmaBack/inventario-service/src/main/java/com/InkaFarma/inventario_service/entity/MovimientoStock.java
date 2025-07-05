package com.InkaFarma.inventario_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimiento_stock")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MovimientoStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMovimientoStock;

    private Integer idProducto;
    private String tipo; // "ENTRADA", "SALIDA", "RESERVA", "AJUSTE"
    private int cantidad;
    private String motivo; // ejemplo: "Venta", "Reabastecimiento", "Anulación"
    private LocalDateTime fecha;
}
