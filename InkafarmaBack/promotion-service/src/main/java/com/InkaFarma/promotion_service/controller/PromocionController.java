package com.InkaFarma.promotion_service.controller;

import com.InkaFarma.promotion_service.entity.Promocion;
import com.InkaFarma.promotion_service.service.PromocionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promociones")
public class PromocionController {
    private final PromocionService promocionService;

    public PromocionController(PromocionService promocionService) {
        this.promocionService = promocionService;
    }

    @PostMapping
    public Promocion crearPromocion(@RequestBody Promocion promocion) {
        return promocionService.crearPromocion(promocion);
    }

    @GetMapping
    public List<Promocion> listarTodas() {
        return promocionService.obtenerTodas();
    }

    @GetMapping("/activas")
    public List<Promocion> listarActivas() {
        return promocionService.listarPromocionesActivas();
    }

    @GetMapping("/{id}")
    public Promocion obtenerPorId(@PathVariable Integer id) {
        return promocionService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Promocion actualizar(@PathVariable Integer id, @RequestBody Promocion promocion) {
        return promocionService.actualizarPromocion(id, promocion);
    }
    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<Promocion>> obtenerPromocionesPorProducto(@PathVariable Long idProducto) {
        List<Promocion> promociones = promocionService.obtenerPromocionesPorProducto(idProducto);
        return ResponseEntity.ok(promociones);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        promocionService.eliminarPromocion(id);
    }
}
