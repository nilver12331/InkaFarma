package com.InkaFarma.user_service.controller;

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
    @PostMapping("/loguin")
    public ResponseEntity<?>login(@RequestBody Usuario usuario){
        Cliente cliente=usuarioService.verificarCredenciales(usuario);
        if(cliente!=null){
            return ResponseEntity.ok(cliente);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado o credenciales incorrectas");
        }
    }
}
