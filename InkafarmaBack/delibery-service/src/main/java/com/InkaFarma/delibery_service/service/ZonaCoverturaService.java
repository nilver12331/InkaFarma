package com.InkaFarma.delibery_service.service;

import com.InkaFarma.delibery_service.entity.ZonaCobertura;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.InkaFarma.delibery_service.repository.ZonaCoberturaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZonaCoverturaService {
    @Autowired
    private ZonaCoberturaRepository zonaCoberturaRepository;
    public ZonaCobertura buscarZonaPorCoordenadas(double lat, double lon) {
        List<ZonaCobertura> zonas = zonaCoberturaRepository.findAllByActivoTrue();

        for (ZonaCobertura zona : zonas) {
            if (estaDentroCobertura(lat, lon, zona.getCentroLatitud(), zona.getCentroLongitud(), zona.getRadioKm())) {
                return zona;
            }
        }
        return null;
    }
    private boolean estaDentroCobertura(double lat1, double lon1, double lat2, double lon2, double radioKm) {
        double R = 6371; // Radio de la Tierra
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double distancia = R * c;
        return distancia <= radioKm;
    }
}
