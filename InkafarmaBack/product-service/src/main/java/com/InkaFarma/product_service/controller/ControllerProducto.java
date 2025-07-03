package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.Producto;
import com.InkaFarma.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api/productos")
public class ControllerProducto {
    @Autowired
    private final ProductService productoService;
    public ControllerProducto(ProductService productoService) {
        this.productoService = productoService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registrarProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") double precio,
            @RequestParam("stock") int stock,
            @RequestParam("activo") boolean activo,
            @RequestParam("idCategoria") int idCategoria,
            @RequestParam("imagenes") MultipartFile[] imagenes
    ) {
        productoService.registrarProducto(nombre, descripcion, precio, stock, activo, idCategoria, imagenes);
        return ResponseEntity.ok("Producto registrado exitosamente.");
    }

}
