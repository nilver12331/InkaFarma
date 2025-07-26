package com.InkaFarma.order_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orden")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrden;

    private Integer idCliente;
    private LocalDateTime fechaCreacion;

    private double subtotal;
    private double descuentoCupon;
    private double total;
    private double costoEnvio;
    @Enumerated(EnumType.STRING)
    private EstadoOrden estado;

    @Enumerated(EnumType.STRING)
    private TipoComprobante tipoComprobante; // BOLETA o FACTURA

    private String ruc; // Solo si es factura
    private String razonSocial; // Solo si es factura
    private String domicilioLegal; // Solo si es factura

    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrdenItem> items;
}
