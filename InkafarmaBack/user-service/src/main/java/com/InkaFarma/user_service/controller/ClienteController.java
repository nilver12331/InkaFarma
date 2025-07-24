package com.InkaFarma.user_service.controller;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.DireccionCliente;
import com.InkaFarma.user_service.entity.Usuario;
import com.InkaFarma.user_service.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Registrar un Cliente
    @PostMapping("/registrarCliente")
    public ResponseEntity<String> registrarCliente(@RequestBody Usuario request) {
        try {
            clienteService.registrarCliente(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Cliente registrado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar cliente: " + e.getMessage());
        }
    }

    // Listar todos los clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    // Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> obtenerClientePorId(@PathVariable Integer id) {
        try {
            Cliente cliente = clienteService.obtenerClientePorId(id);
            return ResponseEntity.ok(cliente);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Actualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Integer id, @RequestBody Cliente clienteActualizado) {
        try {
            Cliente cliente = clienteService.actualizarCliente(id, clienteActualizado);
            return ResponseEntity.ok(cliente);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/direcciones/{idCliente}")
    public ResponseEntity<List<DireccionCliente>> listarDireccionesPorCliente(@PathVariable Integer idCliente) {
        List<DireccionCliente> direcciones = clienteService.obtenerDireccionesPorCliente(idCliente);
        if (direcciones.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(direcciones);
    }

    @PostMapping("/registrarDireccion")
    public ResponseEntity<DireccionCliente> guardarDireccion(@RequestBody DireccionCliente direccionCliente) {
        DireccionCliente guardada = clienteService.guardarDireccion(direccionCliente);
        return ResponseEntity.ok(guardada);
    }
    @PutMapping("/direccionDesactivar/{id}")
    public ResponseEntity<String> desactivarDireccion(@PathVariable Integer id) {
        boolean resultado = clienteService.desactivarDireccion(id);
        if (resultado) {
            return ResponseEntity.ok("Dirección desactivada correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/direccion/principal")
    public ResponseEntity<String> establecerDireccionPrincipal(
            @RequestParam Integer idDireccion,
            @RequestParam Integer idCliente) {

        clienteService.marcarComoPrincipal(idDireccion, idCliente);
        return ResponseEntity.ok("Dirección marcada como principal");
    }
}
