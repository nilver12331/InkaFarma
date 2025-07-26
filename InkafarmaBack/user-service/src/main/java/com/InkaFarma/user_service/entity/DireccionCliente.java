package com.InkaFarma.user_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="direccion_cliente")
public class DireccionCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_cliente",referencedColumnName = "idCliente")
    private Cliente cliente;
    private String direccionCompleta;
    private Integer idZonaCobertura;
    private String referencia;
    private String nombreZona;
    private Double costoEnvio;
    private Integer tiempoEntregaEstimadoMinutos;
    private String tipoDireccion;
    private Double latitud;           // Obtenido de Google Maps
    private Double longitud;
    private Boolean principal;
    private Boolean activo;
    private LocalDateTime fechaRegistro = LocalDateTime.now();

}
