package com.InkaFarma.user_service.service;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Rol;
import com.InkaFarma.user_service.entity.Usuario;
import com.InkaFarma.user_service.entity.UsuarioRol;
import com.InkaFarma.user_service.repository.ClienteRepository;
import com.InkaFarma.user_service.repository.RolRepository;
import com.InkaFarma.user_service.repository.UsuarioRepository;
import com.InkaFarma.user_service.repository.UsuarioRolRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    @Transactional
    public void registrarCliente(Usuario usuario, Cliente cliente, int idRol){
        //Buscamos el rol
        Rol rol=rolRepository.findByIdRol(idRol)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        //Guardar el usuario
        usuarioRepository.save(usuario);

        //Asociamos el cliente al usuario
        cliente.setUsuario(usuario);
        clienteRepository.save(cliente);

        //Crear la relacion usuario-rol
        UsuarioRol usuarioRol=new UsuarioRol();
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(rol);

        //Guardamos el usuarioRol
        usuarioRolRepository.save(usuarioRol);
    }
}
