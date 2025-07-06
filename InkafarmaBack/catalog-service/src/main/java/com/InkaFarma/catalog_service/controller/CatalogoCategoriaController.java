package com.InkaFarma.catalog_service.controller;

import com.InkaFarma.catalog_service.dto.Categoria;
import com.InkaFarma.catalog_service.service.Interface.CategoryCatalogInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalogo/categorias")
public class CatalogoCategoriaController {

    private final CategoryCatalogInterface categoryCatalogInterface;

    public CatalogoCategoriaController(CategoryCatalogInterface categoryCatalogInterface) {
        this.categoryCatalogInterface = categoryCatalogInterface;
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategoriasConAtributos() {
        List<Categoria> categorias = categoryCatalogInterface.listar_categoria();
        return ResponseEntity.ok(categorias);
    }
}
