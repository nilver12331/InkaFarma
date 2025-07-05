package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.Categoria;
import com.InkaFarma.product_service.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoryService.obtenerCategorias();
        return ResponseEntity.ok(categorias);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Integer id) {
        Categoria categoria = categoryService.obtenerPorId(id);
        if (categoria != null) {
            return ResponseEntity.ok(categoria);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Crear
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria nueva = categoryService.crearCategoria(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Integer id, @RequestBody Categoria categoria) {
        try {
            Categoria actualizada = categoryService.actualizarCategoria(id, categoria);
            return ResponseEntity.ok(actualizada);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
