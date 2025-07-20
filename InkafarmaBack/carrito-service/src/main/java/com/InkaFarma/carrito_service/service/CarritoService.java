package com.InkaFarma.carrito_service.service;

import com.InkaFarma.carrito_service.entity.Carrito;
import com.InkaFarma.carrito_service.entity.CarritoItem;
import com.InkaFarma.carrito_service.repository.CarritoItemRepository;
import com.InkaFarma.carrito_service.repository.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private  final CarritoItemRepository carritoItemRepository;
    @Autowired
    private final CarritoRepository carritoRepository;


    public CarritoService(CarritoRepository carritoRepository, CarritoItemRepository carritoItemRepository) {
        this.carritoRepository = carritoRepository;
        this.carritoItemRepository = carritoItemRepository;
    }


    public Carrito obtenerCarritoUsuario(Integer idCliente) {

        /*Busca si el usuario tiene activo y si existe el carrito*/
        Optional<Carrito> carritoExistente = carritoRepository.findByIdClienteAndActivoTrue(idCliente);
        if (carritoExistente.isPresent()) { //si existe
            return carritoExistente.get();  //devuelve el carrito
        } else {
            //si no existe
            Carrito nuevo = new Carrito();
            nuevo.setIdCliente(idCliente);
            nuevo.setActivo(true);
            nuevo.setItems(new ArrayList<>());
            return carritoRepository.save(nuevo);
        }
    }

    /*Agregar un item en mi lista de mi carrito*/
    public Carrito agregarProducto(Integer idCliente, CarritoItem item) {
        Carrito carrito = obtenerCarritoUsuario(idCliente);

        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(i -> i.getIdProducto().equals(item.getIdProducto()))
                .findFirst();

        if (itemExistente.isPresent()) {
            CarritoItem existente = itemExistente.get();
            existente.setCantidad(existente.getCantidad() + item.getCantidad());
            carritoItemRepository.save(existente);
        } else {
            item.setCarrito(carrito);
            carrito.getItems().add(carritoItemRepository.save(item));
        }

        return carritoRepository.save(carrito);
    }

    public Carrito quitarProducto(Integer idCliente, Long idProducto) {
        Carrito carrito = obtenerCarritoUsuario(idCliente);

        Optional<CarritoItem> itemExistente = carrito.getItems().stream()
                .filter(i -> i.getIdProducto().equals(idProducto))
                .findFirst();

        if (itemExistente.isPresent()) {
            CarritoItem existente = itemExistente.get();
            int nuevaCantidad = existente.getCantidad() - 1;

            if (nuevaCantidad > 0) {
                existente.setCantidad(nuevaCantidad);
                carritoItemRepository.save(existente);
            } else {
                // Eliminar el ítem si la cantidad llega a 0
                carrito.getItems().remove(existente);
                carritoItemRepository.delete(existente);
            }
        }

        return carritoRepository.save(carrito);
    }

    public CarritoItem actualizarCantidadItem(Integer idItem, int cantidad) {
        CarritoItem item = carritoItemRepository.findById(idItem)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));
        item.setCantidad(cantidad);
        return carritoItemRepository.save(item);
    }
    public void eliminarItem(Integer idItem) {
        carritoItemRepository.deleteById(idItem);
    }
    public void vaciarCarrito(Integer idCliente) {
        /*Obtener la lista de items de carrito*/
        Carrito carrito = carritoRepository.findByIdClienteAndActivoTrue(idCliente)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carrito.getItems().clear();
        carritoRepository.save(carrito);
    }

    public String finalizarCarrito(Integer idCliente) {
        Carrito carrito = obtenerCarritoUsuario(idCliente);
        if (carrito.getItems().isEmpty()) {
            throw new RuntimeException("Carrito vacío");
        }
        carrito.setActivo(false);
        carritoRepository.save(carrito);
        // Aquí podrías generar una orden en el order-service
        return "Carrito finalizado correctamente";
    }

}
