package com.InkaFarma.catalog_service.dto;

import lombok.Data;

import java.util.List;
@Data
public class Producto {

    private int idProducto;
    private Categoria categoria;
    private String nombre;
    private String descripcion;
    private double precio;
    private boolean masBuscado;
    private boolean destacado;
    private boolean activo;

    private List<ImagenProducto> imagenProductoList;
    private List<ProductoAtributo> productoAtributoList;
}
