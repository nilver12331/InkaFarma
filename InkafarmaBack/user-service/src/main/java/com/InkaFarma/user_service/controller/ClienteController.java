package com.InkaFarma.user_service.controller;

import com.InkaFarma.user_service.dto.RegistroClienteRequest;
import com.InkaFarma.user_service.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    @PostMapping("/registrarCliente")
    public ResponseEntity<String> registrarCliente(@RequestBody RegistroClienteRequest request) {
        try {
            clienteService.registrarCliente(request.getUsuario(), request.getCliente(), request.getIdRol());
            return ResponseEntity.status(HttpStatus.CREATED).body("Cliente registrado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar cliente: " + e.getMessage());
        }
    }
}
