package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "imagen_producto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagenProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idImagenProducto;

    @ManyToOne
    @JoinColumn(name = "id_producto", referencedColumnName = "idProducto")
    @JsonIgnore
    private Producto producto;

    @Column(columnDefinition = "TEXT")
    private String urlimagen;

    private boolean esPrincipal;
}
