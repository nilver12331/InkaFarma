package com.InkaFarma.order_service.service;

import com.InkaFarma.order_service.dto.*;
import com.InkaFarma.order_service.entity.EstadoOrden;
import com.InkaFarma.order_service.entity.Orden;
import com.InkaFarma.order_service.entity.OrdenItem;
import com.InkaFarma.order_service.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public OrdenDTO confirmarOrden(Integer idCliente, CheckoutRequestDTO request) {

        // 1. Obtener productos del carrito
        List<ItemResumenDTO> items = obtenerCarrito(idCliente);

        if (items.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        // 2. Validar y reservar stock
        for (ItemResumenDTO item : items) {
            validarStock(item);
            reservarStock(item);
        }

        // 3. Calcular subtotales con descuentos de producto
        double subtotal = 0.0;
        List<OrdenItem> ordenItems = new ArrayList<>();

        for (ItemResumenDTO item : items) {
            double precioUnitario = item.getPrecioUnitario();
            double descuentoProducto = item.getDescuento(); // en porcentaje
            double precioConDescuento = precioUnitario * (1 - descuentoProducto);

            double subtotalItem = precioConDescuento * item.getCantidad();
            subtotal += subtotalItem;

            OrdenItem oi = new OrdenItem();
            oi.setIdProducto(item.getIdProducto());
            oi.setNombreProducto(item.getNombreProducto());
            oi.setCantidad(item.getCantidad());
            oi.setPrecioUnitario(precioUnitario);
            oi.setDescuento(descuentoProducto);
            oi.setSubtotal(subtotalItem);
            ordenItems.add(oi);
        }

        // 4. Descuento de cupón
        double descuentoCupon = 0.0;
        if (request.getCodigoCupon() != null) {
            double porcentajeCupon = validarCupon(request.getCodigoCupon());
            descuentoCupon = subtotal * porcentajeCupon;
        }

        // 5. Costo de envío (por defecto si no viene en el request)
        double costoEnvio = (request.getCostoEnvio() != null) ? request.getCostoEnvio() : 5.50;

        // 6. Calcular total
        double total = subtotal - descuentoCupon + costoEnvio;

        // 7. Crear y guardar la orden
        Orden orden = new Orden();
        orden.setIdCliente(idCliente);
        orden.setFechaCreacion(LocalDateTime.now());
        orden.setSubtotal(subtotal);
        orden.setDescuentoCupon(descuentoCupon);
        orden.setCostoEnvio(costoEnvio);
        orden.setTotal(total);
        orden.setEstado(EstadoOrden.PENDIENTE_PAGO);
        orden.setTipoComprobante(request.getTipoComprobante());
        orden.setRuc(request.getRuc());
        orden.setRazonSocial(request.getRazonSocial());
        orden.setDomicilioLegal(request.getDomicilioLegal());

        // Asociar items
        ordenItems.forEach(item -> item.setOrden(orden));
        orden.setItems(ordenItems);

        ordenRepository.save(orden);

        // 8. Vaciar carrito
        finalizarCarrito(idCliente);

        // 9. Devolver DTO
        return mapToOrdenDTO(orden);
    }

    private List<ItemResumenDTO> obtenerCarrito(Integer idCliente) {
        CarritoDTO carrito = webClientBuilder.build()
                .get()
                .uri("http://carrito-service/api/carrito/{idCliente}", idCliente)
                .retrieve()
                .bodyToMono(CarritoDTO.class)
                .block();

        if (carrito == null || carrito.getItems() == null) {
            return List.of();
        }

        return carrito.getItems().stream()
                .map(item -> new ItemResumenDTO(
                        item.getIdProducto(),
                        item.getNombreProducto(),
                        item.getCantidad(),
                        item.getPrecio(),          // ← precioUnitario
                        item.getDescuento(),       // ← descuento
                        (item.getPrecio() * item.getCantidad()) * (1 - item.getDescuento()) // subtotal con descuento
                ))
                .toList();
    }
    private void validarStock(ItemResumenDTO item) {
        Boolean stockValido = webClientBuilder.build()
                .get()
                .uri("http://inventario-service/api/inventario/{idProducto}",item.getIdProducto())
                .retrieve()
                .bodyToMono(InventarioDTO.class)
                .map(inv -> inv.getStockDisponible() >= item.getCantidad())
                .block();

        if (!Boolean.TRUE.equals(stockValido)) {
            throw new RuntimeException("Stock insuficiente para uno o más productos.");
        }
    }
    private void reservarStock(ItemResumenDTO item) {
        webClientBuilder.build()
                .put()
                .uri("http://inventario-service/api/inventario/reservar-stock/{idProducto}?nuevoStockReservado={cantidad}",
                        item.getIdProducto(),
                        item.getCantidad())
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
    private double validarCupon(String codigoCupon) {
        CuponDTO cupon = webClientBuilder.build()
                .get()
                .uri("http://promotion-service/api/cupones/validar/{codigo}", codigoCupon)
                .retrieve()
                .bodyToMono(CuponDTO.class)
                .block();
        if (cupon != null && cupon.isActivo()) {
            return cupon.getDescuento();
        }
        return 0.0;
    }

    private void finalizarCarrito(Integer idCliente) {
        webClientBuilder.build()
                .post()
                .uri("http://carrito-service/api/carrito/{idCliente}/finalizar", idCliente)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    private OrdenDTO mapToOrdenDTO(Orden orden) {
        OrdenDTO dto = new OrdenDTO();
        dto.setIdOrden(orden.getIdOrden());
        dto.setIdCliente(orden.getIdCliente());
        dto.setFechaCreacion(orden.getFechaCreacion());
        dto.setSubtotal(orden.getSubtotal());
        dto.setDescuentoCupon(orden.getDescuentoCupon());
        dto.setCostoEnvio(orden.getCostoEnvio());
        dto.setTotal(orden.getTotal());
        dto.setEstado(orden.getEstado());
        dto.setTipoComprobante(orden.getTipoComprobante());
        dto.setRuc(orden.getRuc());
        dto.setRazonSocial(orden.getRazonSocial());
        dto.setDomicilioLegal(orden.getDomicilioLegal());

        // Mapeo de items
        List<ItemResumenDTO> items = orden.getItems().stream().map(item -> {
            ItemResumenDTO dtoItem = new ItemResumenDTO();
            dtoItem.setIdProducto(item.getIdProducto());
            dtoItem.setNombreProducto(item.getNombreProducto());
            dtoItem.setCantidad(item.getCantidad());
            dtoItem.setPrecioUnitario(item.getPrecioUnitario());
            dtoItem.setDescuento(item.getDescuento());   // <-- Debe mapear el campo de la entidad
            dtoItem.setSubtotal(item.getSubtotal());     // <-- Debe mapear el campo de la entidad
            return dtoItem;
        }).toList();

        return dto;
    }
}
