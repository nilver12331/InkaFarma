package com.InkaFarma.order_service.controller;

import com.InkaFarma.order_service.dto.CheckoutRequestDTO;
import com.InkaFarma.order_service.dto.OrdenDTO;
import com.InkaFarma.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping("/confirmar/{idCliente}")
    public ResponseEntity<OrdenDTO> confirmarOrden(
            @PathVariable Integer idCliente,
            @RequestBody CheckoutRequestDTO request) {
        OrdenDTO orden = orderService.confirmarOrden(idCliente, request);
        return ResponseEntity.ok(orden);
    }
}
