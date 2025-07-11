package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.ProductoAtributo;
import com.InkaFarma.product_service.service.ProductoAtributoService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/producto-atributo")
public class ProductoAtributoController {

    @Autowired
    private ProductoAtributoService productoAtributoService;

    @PostMapping
    public ResponseEntity<ProductoAtributo> asignar(@RequestBody ProductoAtributo pa) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoAtributoService.guardar(pa));
    }

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<ProductoAtributo>> obtenerPorProducto(@PathVariable int idProducto) {
        return ResponseEntity.ok(productoAtributoService.obtenerPorProducto(idProducto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        productoAtributoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
