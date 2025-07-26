package com.InkaFarma.order_service.dto;

import com.InkaFarma.order_service.entity.EstadoOrden;
import com.InkaFarma.order_service.entity.TipoComprobante;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdenDTO {
    private Long idOrden;
    private Integer idCliente;
    private LocalDateTime fechaCreacion;
    private double subtotal;
    private double descuentoCupon;
    private double costoEnvio;
    private double total;
    private EstadoOrden estado;

    // Comprobante
    private TipoComprobante tipoComprobante;
    private String ruc;
    private String razonSocial;
    private String domicilioLegal;

}
