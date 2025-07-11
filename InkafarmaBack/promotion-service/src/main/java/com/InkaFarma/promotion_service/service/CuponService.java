package com.InkaFarma.promotion_service.service;

import com.InkaFarma.promotion_service.entity.Cupon;
import com.InkaFarma.promotion_service.repository.CuponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class CuponService {
    @Autowired
    private CuponRepository cuponRepository;

    public Cupon crearCupon(Cupon cupon) {
        return cuponRepository.save(cupon);
    }

    public List<Cupon> obtenerTodos(){
        return cuponRepository.findAll();
    }

    public Cupon obtenerPorId(Integer idCupon){
        return cuponRepository.findById(idCupon)
                .orElseThrow(()->new RuntimeException("Cupon no encontrado"));
    }

    public Optional<Cupon> obtenerCuponPorCodigo(String codigo) {
        return cuponRepository.findByCodigoAndActivoTrue(codigo)
                .filter(c -> !c.getFechaInicio().isAfter(LocalDate.now()) && !c.getFechaFin().isBefore(LocalDate.now()));
    }

    public List<Cupon> listarCuponesActivos() {
        return cuponRepository.findAll()
                .stream()
                .filter(c -> c.isActivo() &&
                        !c.getFechaInicio().isAfter(LocalDate.now()) &&
                        !c.getFechaFin().isBefore(LocalDate.now()))
                .collect(Collectors.toList());
    }

    public Cupon actualizarCupon(Integer idCupon, Cupon cuponActualizado) {
        Cupon cupon = cuponRepository.findById(idCupon)
                .orElseThrow(() -> new RuntimeException("Cupón no encontrado"));

        cupon.setCodigo(cuponActualizado.getCodigo());
        cupon.setDescuento(cuponActualizado.getDescuento());
        cupon.setActivo(cuponActualizado.isActivo());
        cupon.setFechaInicio(cuponActualizado.getFechaInicio());
        cupon.setFechaFin(cuponActualizado.getFechaFin());

        return cuponRepository.save(cupon);
    }

    public void eliminarCupon(Integer idCupon) {
        cuponRepository.deleteById(idCupon);
    }
}
