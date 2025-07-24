package com.InkaFarma.carrito_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "carrito_item")
@AllArgsConstructor
@NoArgsConstructor
public class CarritoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idItem;

    @ManyToOne
    @JoinColumn(name = "id_carrito")
    @JsonIgnore
    private Carrito carrito;
    private Long idProducto;
    private String nombreProducto;
    private double precio;
    private int cantidad;
    private double descuento;
    @Column(columnDefinition = "TEXT")
    private String urlimagen;
}
