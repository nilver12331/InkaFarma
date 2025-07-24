package com.InkaFarma.delibery_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "zona_cobertura")
public class ZonaCobertura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre; // Ej: "Huaycán - UVC 182"

    private String distrito;

    private Double centroLatitud;
    private Double centroLongitud;

    private Double radioKm;

    private Double costoEnvio;

    private Integer tiempoEntregaEstimadoMinutos;

    private Boolean activo = true;

}
