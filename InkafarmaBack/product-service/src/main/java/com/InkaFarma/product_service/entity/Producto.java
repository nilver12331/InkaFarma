package com.InkaFarma.product_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "producto")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProducto;
    @ManyToOne
    @JoinColumn(name = "id_categoria",referencedColumnName = "idCategoria")
    private Categoria categoria;

    private String nombre;
    @Column(columnDefinition = "TEXT")  // Define tipo TEXT en la BD
    private String descripcion;
    private double precio;
    private int stock;
    @Column(nullable = false)
    private boolean activo;
    //Atributos de la clase que no van hacer mapeados
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<ImagenProducto> imagenProductoList;
}
