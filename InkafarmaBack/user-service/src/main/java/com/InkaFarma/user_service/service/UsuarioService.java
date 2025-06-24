package com.InkaFarma.user_service.service;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Usuario;
import com.InkaFarma.user_service.repository.ClienteRepository;
import com.InkaFarma.user_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired     /* Permite Inyectar los metodos del repositorio sin la necesidad de crear una clase */
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    public Cliente verificarCredenciales(Usuario usuario){
        String user=usuario.getUsuario();
        String password=usuario.getClave();
        Usuario usuarioEncontrado=usuarioRepository.findByUsuarioAndClave(user,password);
        if (usuarioEncontrado != null) {
            return  clienteRepository.findByUsuarioIdUsuario(usuarioEncontrado.getIdUsuario());  // Devuelve el Cliente asociado
        }
        return null;
    }
}
