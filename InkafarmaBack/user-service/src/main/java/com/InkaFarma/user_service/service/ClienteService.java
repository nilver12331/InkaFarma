package com.InkaFarma.user_service.service;

import com.InkaFarma.user_service.entity.*;
import com.InkaFarma.user_service.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ClienteService {
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioRolRepository usuarioRolRepository;
    @Autowired
    private EstadoRepository estadoRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    private static final int ROL_CLIENTE = 1;
    private static final int ESTADO_ACTIVO=1;
    @Transactional
    public void registrarCliente(Usuario usuario) {
        // Verificar que el usuario no exista (por nombre de usuario, no por clave)
        if (usuarioRepository.findByUsuario(usuario.getUsuario()) != null) {
            throw new RuntimeException("El usuario ya existe. Intente con otro nombre de usuario.");
        }
        // Obtener el rol cliente
        Rol rolCliente = rolRepository.findById(ROL_CLIENTE)
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        // Obtener el estado ACTIVO
        Estado estadoUsuario = estadoRepository.findByIdEstado(ESTADO_ACTIVO)
                .orElseThrow(() -> new RuntimeException("Estado ACTIVO no encontrado"));

        // Asignar estado al usuario
        usuario.setEstado(estadoUsuario);

        // Preparar relación usuario-rol
        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(rolCliente);

        // Asignar lista de roles al usuario
        usuario.setRoles(Collections.singletonList(usuarioRol));

        //Encriptamos la clave del usuario
        String claveEncriptada=passwordEncoder.encode(usuario.getClave());
        usuario.setClave(claveEncriptada);

        // Guardar usuario (se guarda persona automáticamente si tienes cascade en @OneToOne)
        usuarioRepository.save(usuario);

        // Guardar cliente asociado a la persona del usuario
        Cliente cliente = new Cliente();
        cliente.setPersona(usuario.getPersona());
        clienteRepository.save(cliente);
    }
}
