package com.InkaFarma.promotion_service.service;

import com.InkaFarma.promotion_service.entity.Promocion;
import com.InkaFarma.promotion_service.repository.PromocionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromocionService {
    @Autowired
    private PromocionRepository promocionRepository;

    public Promocion crearPromocion(Promocion promocion) {
        return promocionRepository.save(promocion);
    }

    public List<Promocion> obtenerTodas(){
        return promocionRepository.findAll();
    }

    public Promocion obtenerPorId(Integer idPromocion){
        return promocionRepository.findById(idPromocion)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));
    }

    public  Promocion actualizarPromocion(Integer idPromocion,Promocion promocion){
        Promocion existente = promocionRepository.findById(idPromocion)
                .orElseThrow(() -> new RuntimeException("Promoción no encontrada"));

        existente.setDescripcion(promocion.getDescripcion());
        existente.setDescuento(promocion.getDescuento());
        existente.setIdProducto(promocion.getIdProducto());
        existente.setActivo(promocion.isActivo());
        existente.setFechaInicio(promocion.getFechaInicio());
        existente.setFechaFin(promocion.getFechaFin());

        return promocionRepository.save(existente);
    }

    public List<Promocion> obtenerPromocionesPorProducto(Long idProducto) {
        return promocionRepository.findByIdProductoAndActivoTrue(idProducto)
                .stream()
                .filter(p -> !p.getFechaInicio().isAfter(LocalDate.now()) && !p.getFechaFin().isBefore(LocalDate.now()))
                .collect(Collectors.toList());
    }

    public List<Promocion> listarPromocionesActivas() {
        return promocionRepository.findAll()
                .stream()
                .filter(p -> p.isActivo() &&
                        !p.getFechaInicio().isAfter(LocalDate.now()) &&
                        !p.getFechaFin().isBefore(LocalDate.now()))
                .collect(Collectors.toList());
    }

    public void eliminarPromocion(Integer idPromocion) {
        promocionRepository.deleteById(idPromocion);
    }
}
