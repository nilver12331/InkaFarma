package com.InkaFarma.catalog_service.controller;

import com.InkaFarma.catalog_service.dto.ProductoAtributo;
import com.InkaFarma.catalog_service.service.ProductoCatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogo")
public class ProductoCatalogController {

    private final ProductoCatalogService productoCatalogService;

    public ProductoCatalogController(ProductoCatalogService productoCatalogService) {
        this.productoCatalogService = productoCatalogService;
    }

    @GetMapping("/producto/{idProducto}/atributos")
    public ResponseEntity<List<ProductoAtributo>> obtenerAtributos(@PathVariable int idProducto) {
        List<ProductoAtributo> atributos = productoCatalogService.obtenerAtributosDeProducto(idProducto);
        return ResponseEntity.ok(atributos);
    }
}
