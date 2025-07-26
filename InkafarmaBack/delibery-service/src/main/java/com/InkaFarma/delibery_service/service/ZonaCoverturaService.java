package com.InkaFarma.delibery_service.service;

import com.InkaFarma.delibery_service.entity.ZonaCobertura;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.InkaFarma.delibery_service.repository.ZonaCoberturaRepository;

import java.util.List;
import java.util.Optional;

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

    public ZonaCobertura crearZona(ZonaCobertura zona) {
        zona.setActivo(true);
        return zonaCoberturaRepository.save(zona);
    }
    public ZonaCobertura actualizarZona(Integer id, ZonaCobertura zonaActualizada) {
        return zonaCoberturaRepository.findById(id)
                .map(zona -> {
                    zona.setNombre(zonaActualizada.getNombre());
                    zona.setDistrito(zonaActualizada.getDistrito());
                    zona.setCentroLatitud(zonaActualizada.getCentroLatitud());
                    zona.setCentroLongitud(zonaActualizada.getCentroLongitud());
                    zona.setRadioKm(zonaActualizada.getRadioKm());
                    zona.setCostoEnvio(zonaActualizada.getCostoEnvio());
                    zona.setTiempoEntregaEstimadoMinutos(zonaActualizada.getTiempoEntregaEstimadoMinutos());
                    zona.setActivo(zonaActualizada.getActivo());
                    return zonaCoberturaRepository.save(zona);
                }).orElseThrow(() -> new RuntimeException("Zona no encontrada con ID: " + id));
    }

    public Optional<ZonaCobertura> obtenerZonaPorId(Integer id) {
        return zonaCoberturaRepository.findById(id);
    }

    public List<ZonaCobertura> listarZonas() {
        return zonaCoberturaRepository.findByActivoTrue();  // Solo devuelve las activas
    }

    public void desactivarZona(Integer id) {
        zonaCoberturaRepository.findById(id).ifPresent(zona -> {
            zona.setActivo(false);
            zonaCoberturaRepository.save(zona);
        });
    }
}
