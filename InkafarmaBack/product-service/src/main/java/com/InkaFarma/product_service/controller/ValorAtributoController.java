package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.entity.ValorAtributo;
import com.InkaFarma.product_service.service.ValorAtributoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/valor-atributo")
public class ValorAtributoController {

    @Autowired
    private ValorAtributoService valorAtributoService;

    @PostMapping
    public ResponseEntity<ValorAtributo> crear(@RequestBody ValorAtributo valor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(valorAtributoService.guardar(valor));
    }

    @GetMapping("/atributo/{idAtributo}")
    public ResponseEntity<List<ValorAtributo>> listarPorAtributo(@PathVariable int idAtributo) {
        return ResponseEntity.ok(valorAtributoService.listarPorAtributo(idAtributo));
    }
}
