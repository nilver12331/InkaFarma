package com.InkaFarma.inventario_service.service;

import com.InkaFarma.inventario_service.entity.Inventario;
import com.InkaFarma.inventario_service.entity.MovimientoStock;
import com.InkaFarma.inventario_service.repository.InventarioRepository;
import com.InkaFarma.inventario_service.repository.MovimientoStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;
    @Autowired
    private MovimientoStockRepository movimientoStockRepository;

    public Inventario agregarInventario(int idProducto, int stockDisponible, int stockReservado) {
        Inventario inventario = new Inventario();
        inventario.setIdProducto(idProducto);
        inventario.setStockDisponible(stockDisponible);
        inventario.setStockReservado(stockReservado);
        inventario.setUltimaActualizacion(LocalDateTime.now());

        return inventarioRepository.save(inventario);
    }

    public Inventario obtenerInventarioPorProducto(int idProducto) {
        Inventario inventario = inventarioRepository.findById(idProducto)
                .orElseThrow(() -> new NoSuchElementException("Inventario no encontrado para el producto con ID: " + idProducto));

        inventario.setStockDisponible(inventario.getStockDisponible() - inventario.getStockReservado());
        if (inventario.getStockDisponible() < 0) {
            inventario.setStockDisponible(0); // Evitar stock negativo
        }
        return inventario;

    }

    public Inventario reservarStock(int idProducto, int nuevoStockReservado) {
        if (nuevoStockReservado < 0) {
            throw new IllegalArgumentException("El stock reservado no puede ser negativo.");
        }

        Inventario inventario = inventarioRepository.findById(idProducto)
                .orElseThrow(() -> new NoSuchElementException("Inventario no encontrado para el producto con ID: " + idProducto));

        inventario.setStockReservado(inventario.getStockReservado() + nuevoStockReservado);
        inventario.setUltimaActualizacion(LocalDateTime.now());

        MovimientoStock movimiento = new MovimientoStock();
        movimiento.setIdProducto(idProducto);
        movimiento.setCantidad(nuevoStockReservado);
        movimiento.setMotivo("Reserva para Venta");
        movimiento.setTipo("RESERVA");
        movimiento.setFecha(LocalDateTime.now());

        movimientoStockRepository.save(movimiento);
        return inventarioRepository.save(inventario);
    }

    public Inventario liberarStockReservado(int idProducto) {
        Inventario inventario = inventarioRepository.findById(idProducto)
                .orElseThrow(() -> new NoSuchElementException("Inventario no encontrado para el producto con ID: " + idProducto));

        inventario.setStockReservado(0);
        inventario.setUltimaActualizacion(LocalDateTime.now());

        return inventarioRepository.save(inventario);
    }

    public Inventario confirmarVenta(int idProducto, int cantidadVendida) {
        if (cantidadVendida <= 0) {
            throw new IllegalArgumentException("La cantidad vendida debe ser mayor que cero.");
        }

        Inventario inventario = inventarioRepository.findById(idProducto)
                .orElseThrow(() -> new NoSuchElementException("Inventario no encontrado para el producto con ID: " + idProducto));

        if (inventario.getStockDisponible() < cantidadVendida) {
            throw new IllegalStateException("Stock disponible insuficiente para la venta.");
        }

        if (inventario.getStockReservado() < cantidadVendida) {
            throw new IllegalStateException("Stock reservado insuficiente para liberar la venta.");
        }

        inventario.setStockDisponible(inventario.getStockDisponible() - cantidadVendida);
        inventario.setStockReservado(inventario.getStockReservado() - cantidadVendida);
        inventario.setUltimaActualizacion(LocalDateTime.now());
        inventarioRepository.save(inventario);

        MovimientoStock movimiento = new MovimientoStock();
        movimiento.setIdProducto(idProducto);
        movimiento.setCantidad(cantidadVendida);
        movimiento.setMotivo("Venta");
        movimiento.setTipo("SALIDA");
        movimiento.setFecha(LocalDateTime.now());

        movimientoStockRepository.save(movimiento);

        return inventario;
    }

    public List<MovimientoStock> obtenerMovimientos(int idProducto) {
        return movimientoStockRepository.findByIdProducto(idProducto);
    }

    public Inventario realizarAjusteManual(int idProducto, int cantidad, String motivo, String tipo) {
        // Buscar inventario existente
        Optional<Inventario> optionalInventario = inventarioRepository.findById(idProducto);
        Inventario inventario;

        if (optionalInventario.isPresent()) {
            // Ya existe: actualizar stock
            inventario = optionalInventario.get();
            int nuevoStock = 0;

            if(tipo.equals("SALIDA")){
                nuevoStock = inventario.getStockDisponible() - cantidad;

                if (nuevoStock < 0) {
                    throw new IllegalArgumentException("No hay suficiente stock para realizar la salida.");
                }
                inventario.setStockDisponible(nuevoStock);
            }else{
                nuevoStock = inventario.getStockDisponible() + cantidad;
                inventario.setStockDisponible(nuevoStock);
            }

            if (nuevoStock < 0) {
                throw new IllegalArgumentException("El ajuste generaría un stock negativo.");
            }


            inventario.setUltimaActualizacion(LocalDateTime.now());

        } else {
            // No existe: crear nuevo inventario
            if (cantidad < 0) {
                throw new IllegalArgumentException("No se puede crear inventario con stock negativo.");
            }

            inventario = new Inventario();
            inventario.setIdProducto(idProducto);
            inventario.setStockDisponible(cantidad);
            inventario.setStockReservado(0);
            inventario.setUltimaActualizacion(LocalDateTime.now());
        }

        inventarioRepository.save(inventario);

        // Registrar movimiento
        MovimientoStock movimiento = new MovimientoStock();
        movimiento.setIdProducto(idProducto);
        movimiento.setCantidad(cantidad);
        movimiento.setMotivo(motivo);
        movimiento.setTipo(tipo != null ? tipo : "AJUSTE");
        movimiento.setFecha(LocalDateTime.now());

        movimientoStockRepository.save(movimiento);

        return inventario;
    }


}
