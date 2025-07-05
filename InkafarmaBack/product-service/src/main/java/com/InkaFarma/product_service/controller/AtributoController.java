package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.Atributo;
import com.InkaFarma.product_service.service.AtributoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atributos")
public class AtributoController {
    @Autowired
    private AtributoService atributoService;

    @GetMapping
    public List<Atributo> listarAtributos() {
        return atributoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Atributo> obtenerAtributoPorId(@PathVariable int id) {
        Atributo atributo = atributoService.obtenerPorId(id);
        if (atributo != null) {
            return ResponseEntity.ok(atributo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Atributo crearAtributo(@RequestBody Atributo atributo) {
        return atributoService.guardar(atributo);
    }

    @PutMapping("/{id}")
    public Atributo actualizarAtributo(@PathVariable int id, @RequestBody Atributo atributo) {
        return atributoService.actualizar(id, atributo);
    }
}
