package com.InkaFarma.inventario_service.controller;

import com.InkaFarma.inventario_service.entity.Inventario;
import com.InkaFarma.inventario_service.entity.MovimientoStock;
import com.InkaFarma.inventario_service.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/inventario")
public class InventarioController {

    @Autowired
    private final InventarioService inventarioService;
    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    @PostMapping("/agregar-inventario")
    public ResponseEntity<Inventario> agregarInventario(
            @RequestParam int idProducto,
            @RequestParam int stockDisponible,
            @RequestParam(required = false, defaultValue = "0") int stockReservado) {
        try {
            Inventario nuevoInventario = inventarioService.agregarInventario(idProducto, stockDisponible, stockReservado);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoInventario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{idProducto}")
    public ResponseEntity<Inventario> obtenerStockPorProducto(
            @PathVariable int idProducto) {
        try {
            Inventario inventario = inventarioService.obtenerInventarioPorProducto(idProducto);
            return ResponseEntity.ok(inventario);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/reservar-stock/{idProducto}")
    public ResponseEntity<Inventario> reservarStock(
            @PathVariable int idProducto,
            @RequestParam int nuevoStockReservado) {
        try {
            Inventario inventario = inventarioService.reservarStock(idProducto, nuevoStockReservado);
            return ResponseEntity.ok(inventario);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/liberar-reserva/{idProducto}")
    public ResponseEntity<Inventario> liberarStockReservado(
            @PathVariable int idProducto) {
        try {
            Inventario inventario = inventarioService.liberarStockReservado(idProducto);
            return ResponseEntity.ok(inventario);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/confirmar-venta/{idProducto}")
    public ResponseEntity<Inventario> confirmarVenta(
            @PathVariable int idProducto,
            @RequestParam int cantidadVendida) {
        try {
            Inventario inventario = inventarioService.confirmarVenta(idProducto, cantidadVendida);
            return ResponseEntity.ok(inventario);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/movimientos/{idProducto}")
   public ResponseEntity<List<MovimientoStock>> obtenerMovimientos(
           @PathVariable int idProducto) {
        List<MovimientoStock> movimientos = inventarioService.obtenerMovimientos(idProducto);

        if (movimientos.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 si no hay movimientos
        }

        return ResponseEntity.ok(movimientos);
    }

    @PutMapping("/ajuste-manual/{idProducto}")
    public ResponseEntity<Inventario> realizarAjusteManual(
            @PathVariable int idProducto,
            @RequestParam int cantidad,
            @RequestParam String motivo,
            @RequestParam String tipo
            ) {
        try {
            Inventario inventario = inventarioService.realizarAjusteManual(idProducto, cantidad, motivo, tipo);
            return ResponseEntity.ok(inventario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }



}
