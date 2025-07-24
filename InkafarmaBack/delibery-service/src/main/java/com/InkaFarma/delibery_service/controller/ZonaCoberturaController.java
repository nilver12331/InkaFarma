package com.InkaFarma.delibery_service.controller;

import com.InkaFarma.delibery_service.dto.CoordenadasDTO;
import com.InkaFarma.delibery_service.entity.ZonaCobertura;
import com.InkaFarma.delibery_service.service.ZonaCoverturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
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
}
