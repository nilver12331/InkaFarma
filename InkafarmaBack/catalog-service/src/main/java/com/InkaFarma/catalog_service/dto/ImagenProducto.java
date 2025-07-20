package com.InkaFarma.catalog_service.dto;


import lombok.Data;

@Data
public class ImagenProducto {

    private int idImagenProducto;

    private String urlimagen;

    private boolean esPrincipal;
}
