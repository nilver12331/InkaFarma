package com.InkaFarma.promotion_service.controller;

import com.InkaFarma.promotion_service.entity.Cupon;
import com.InkaFarma.promotion_service.service.CuponService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cupones")
public class CuponController {
    private final CuponService cuponService;

    public CuponController(CuponService cuponService) {
        this.cuponService = cuponService;
    }

    @PostMapping
    public Cupon crearCupon(@RequestBody Cupon cupon) {
        return cuponService.crearCupon(cupon);
    }

    @GetMapping
    public List<Cupon> listarTodos() {
        return cuponService.obtenerTodos();
    }
    @GetMapping("/activos")
    public List<Cupon> listarActivos() {
        return cuponService.listarCuponesActivos();
    }

    @GetMapping("/validar/{codigo}")
    public Optional<Cupon> validarCodigo(@PathVariable String codigo) {
        return cuponService.obtenerCuponPorCodigo(codigo);
    }

    @GetMapping("/{idCupon}")
    public Cupon obtenerPorId(@PathVariable Integer idCupon) {
        return cuponService.obtenerPorId(idCupon);
    }

    @PutMapping("/{idCupon}")
    public Cupon actualizar(@PathVariable Integer idCupon, @RequestBody Cupon cupon) {
        return cuponService.actualizarCupon(idCupon, cupon);
    }

    @DeleteMapping("/{idCupon}")
    public void eliminar(@PathVariable Integer idCupon) {
        cuponService.eliminarCupon(idCupon);
    }
}
