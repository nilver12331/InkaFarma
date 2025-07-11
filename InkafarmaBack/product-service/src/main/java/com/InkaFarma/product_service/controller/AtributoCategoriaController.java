package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.AtributoCategoria;
import com.InkaFarma.product_service.service.AtributoCategoriaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atributo-categoria")
public class AtributoCategoriaController {
    @Autowired
    private AtributoCategoriaService atributoCategoriaService;

    // Asignar atributo a categoría
    @PostMapping
    public ResponseEntity<AtributoCategoria> asignar(@RequestBody AtributoCategoria ac) {
        AtributoCategoria nuevaAsingacion = atributoCategoriaService.asignarAtributoCategoria(ac);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaAsingacion);
    }

    // Eliminar asignación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        try {
            atributoCategoriaService.eliminarAsignacion(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Listar asignaciones
    @GetMapping
    public ResponseEntity<List<AtributoCategoria>> listar() {
        return ResponseEntity.ok(atributoCategoriaService.listarAsignaciones());
    }
}
