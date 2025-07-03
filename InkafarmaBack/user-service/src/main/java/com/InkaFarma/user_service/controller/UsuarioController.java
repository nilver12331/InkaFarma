package com.InkaFarma.user_service.controller;

import com.InkaFarma.user_service.dto.ObtenerUsuarioCliente;
import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Usuario;
import com.InkaFarma.user_service.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService=usuarioService;
    }
    @PostMapping("/login-cliente")
    public ResponseEntity<?>loginCliente(@RequestBody Usuario usuario){
        ObtenerUsuarioCliente Usuariocliente=usuarioService.verificarCredencialesCliente(usuario);
        if(Usuariocliente!=null){
            return ResponseEntity.ok(Usuariocliente);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas o no esta registrado como cliente.");
        }
    }
}
