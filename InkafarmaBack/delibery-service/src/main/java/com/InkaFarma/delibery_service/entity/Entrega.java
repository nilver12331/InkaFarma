package com.InkaFarma.delibery_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Data
@Table(name = "entrega")
@AllArgsConstructor
@NoArgsConstructor
public class Entrega {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idOrden; // Relación indirecta con el `orden-service`

    private String direccionCliente;
    private Double latitud;
    private Double longitud;

    private LocalDateTime fechaRegistro;

    private LocalDateTime fechaEntregaEstimada;

    private String estado; // Ej: "Pendiente", "En camino", "Entregado", etc.

    private String tipoDireccion; // Ej: "Casa", "Trabajo", "Otros"

    private String referencia; // Texto adicional

    private Double costoEnvio; // Copiado desde la `ZonaCobertura` usada
}
