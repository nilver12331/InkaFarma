package com.InkaFarma.catalog_service.dto;

import lombok.Data;

import java.util.List;
@Data
public class ProductoConAtributosDTO {
    private int idProducto;
    private String nombre;
    private String descripcion;
    private double precio;
    private boolean masBuscado;
    private boolean destacado;
    private boolean activo;
    private Integer idCategoria;
    private String nombreCategoria;
    private List<ImagenProductoDTO> imagenes;
    private List<AtributoValorDTO> atributos;
}
