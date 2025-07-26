package com.InkaFarma.order_service.dto;

import com.InkaFarma.order_service.entity.TipoComprobante;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutRequestDTO {
    private Integer idCliente;
    private String codigoCupon;
    private TipoComprobante tipoComprobante; // BOLETA o FACTURA
    private String ruc; // Opcional, si es FACTURA
    private String razonSocial; // Opcional
    private String domicilioLegal; // Opcional
    private Double costoEnvio; // NUEVO
}
