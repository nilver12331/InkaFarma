package com.InkaFarma.carrito_service.controller;

import com.InkaFarma.carrito_service.entity.Carrito;
import com.InkaFarma.carrito_service.entity.CarritoItem;
import com.InkaFarma.carrito_service.service.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }
    @GetMapping("/{idCliente}")
    public ResponseEntity<Carrito> obtenerCarrito(@PathVariable Integer idCliente) {
        return ResponseEntity.ok(carritoService.obtenerCarritoUsuario(idCliente));
    }
    @PostMapping("/{idCliente}/agregar")
    public ResponseEntity<Carrito> agregarProducto(@PathVariable Integer idCliente, @RequestBody CarritoItem item) {
        return ResponseEntity.ok(carritoService.agregarProducto(idCliente, item));
    }
    @PutMapping("/item/{idItem}")
    public ResponseEntity<CarritoItem> actualizarCantidad(@PathVariable Integer idItem, @RequestParam int cantidad) {
        return ResponseEntity.ok(carritoService.actualizarCantidadItem(idItem, cantidad));
    }
    @DeleteMapping("/item/{idItem}")
    public ResponseEntity<Void> eliminarItem(@PathVariable Integer idItem) {
        carritoService.eliminarItem(idItem);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{idCliente}")
    public ResponseEntity<Void> vaciarCarrito(@PathVariable Integer idCliente) {
        carritoService.vaciarCarrito(idCliente);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{idCliente}/finalizar")
    public ResponseEntity<String> finalizarCarrito(@PathVariable Integer idCliente) {
        return ResponseEntity.ok(carritoService.finalizarCarrito(idCliente));
    }
}
