package com.InkaFarma.delibery_service.controller;

import com.InkaFarma.delibery_service.dto.CoordenadasDTO;
import com.InkaFarma.delibery_service.entity.ZonaCobertura;
import com.InkaFarma.delibery_service.service.ZonaCoverturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/zonas")
public class ZonaCoberturaController {
    private final ZonaCoverturaService zonaCoberturaService;
    public ZonaCoberturaController(ZonaCoverturaService zonaCoberturaService) {
        this.zonaCoberturaService = zonaCoberturaService;
    }
    @PostMapping("/validar")
    public ResponseEntity<?> validarZona(@RequestBody CoordenadasDTO coordenadas) {
        ZonaCobertura zona = zonaCoberturaService.buscarZonaPorCoordenadas(
                coordenadas.getLatitud(),
                coordenadas.getLongitud()
        );

        if (zona != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("dentroZona", true);
            response.put("nombreZona", zona.getNombre());
            response.put("id",zona.getId());
            response.put("tiempoEntregaEstimadoMinutos",zona.getTiempoEntregaEstimadoMinutos());
            response.put("costoEnvio", zona.getCostoEnvio());
            response.put("tiempoEntrega", zona.getTiempoEntregaEstimadoMinutos());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(Collections.singletonMap("dentroZona", false));
        }
    }

    @PostMapping
    public ResponseEntity<ZonaCobertura> crearZona(@RequestBody ZonaCobertura zona) {
        ZonaCobertura nuevaZona = zonaCoberturaService.crearZona(zona);
        return ResponseEntity.ok(nuevaZona);
    }
    @GetMapping
    public ResponseEntity<List<ZonaCobertura>> listarZonas() {
        return ResponseEntity.ok(zonaCoberturaService.listarZonas());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ZonaCobertura> obtenerZonaPorId(@PathVariable Integer id) {
        return zonaCoberturaService.obtenerZonaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<ZonaCobertura> actualizarZona(
            @PathVariable Integer id,
            @RequestBody ZonaCobertura zonaActualizada) {
        try {
            ZonaCobertura zona = zonaCoberturaService.actualizarZona(id, zonaActualizada);
            return ResponseEntity.ok(zona);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/desactivar")
    public ResponseEntity<Void> desactivarZona(@PathVariable Integer id) {
        zonaCoberturaService.desactivarZona(id);
        return ResponseEntity.noContent().build();
    }
}
