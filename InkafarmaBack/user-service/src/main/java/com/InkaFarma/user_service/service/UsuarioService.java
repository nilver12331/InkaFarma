package com.InkaFarma.user_service.service;

import com.InkaFarma.user_service.dto.ObtenerUsuarioCliente;
import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Rol;
import com.InkaFarma.user_service.entity.Usuario;
import com.InkaFarma.user_service.entity.UsuarioRol;
import com.InkaFarma.user_service.repository.ClienteRepository;
import com.InkaFarma.user_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired     /* Permite Inyectar los metodos del repositorio sin la necesidad de crear una clase */
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    public static final int ROL_CLIENTE = 1;
    public static final int ESTADO_ACTIVO=1;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    public ObtenerUsuarioCliente verificarCredencialesCliente(Usuario usuario) {
        String user = usuario.getUsuario();
        String password = usuario.getClave();

        // Buscar por nombre de usuario
        Usuario usuarioEncontrado = usuarioRepository.findByUsuario(user);

        // Validar existencia
        if (usuarioEncontrado == null)
        {
            System.out.print("Usuario no encontrado");
            return null;
        }
        // Validar contraseña (encriptada)
        if (!passwordEncoder.matches(password, usuarioEncontrado.getClave())) {
            System.out.print("Contrase no coincide");
            return null;
        }

            //Validar si el estado del usuario es activo
        if(usuarioEncontrado.getEstado().getIdEstado()!=ESTADO_ACTIVO) {
            System.out.print("El estado del usuario no es activo");
            return null;
        }

        boolean tieneRolCliente = usuarioEncontrado.getRoles()
                .stream()
                .anyMatch(rolU -> rolU.getRol().getIdRol() == ROL_CLIENTE);
        //Validar si tiene el rol de cliente

        if (!tieneRolCliente) return null;

        Cliente cliente = clienteRepository.findByPersonaIdPersona(usuarioEncontrado.getPersona().getIdPersona());
            //Validar si esta refistrado en la tabla cliente
        if (cliente == null) return null;

        ObtenerUsuarioCliente obtenerUsuarioCliente = new ObtenerUsuarioCliente();
        obtenerUsuarioCliente.setIdCliente(cliente.getIdCliente());
        obtenerUsuarioCliente.setGenero(usuarioEncontrado.getPersona().getGenero());
        obtenerUsuarioCliente.setCorreo(usuarioEncontrado.getPersona().getCorreo());
        obtenerUsuarioCliente.setNombre(usuarioEncontrado.getPersona().getNombre());
        obtenerUsuarioCliente.setApellidoMaterno(usuarioEncontrado.getPersona().getApellidoMaterno());
        obtenerUsuarioCliente.setApellidoPaterno(usuarioEncontrado.getPersona().getApellidoPaterno());
        obtenerUsuarioCliente.setImgPerfil(usuarioEncontrado.getPersona().getImgPerfil());
        obtenerUsuarioCliente.setDni(usuarioEncontrado.getPersona().getDni());
        return obtenerUsuarioCliente;
    }

    //Metodo original Primero
    public Usuario recuperarPorCorreo(String correo) {
        return usuarioRepository.findByPersonaCorreo(correo);
    }

    // NUEVO MÉTODO: Recuperar y actualizar contraseña temporal
    public String recuperarYActualizarClavePorCorreo(String correo) {
        Usuario usuario = usuarioRepository.findByPersonaCorreo(correo);
        if (usuario == null) {
            return null;
        }

        String claveTemporal = generarClaveTemporal();
        String claveEncriptada = passwordEncoder.encode(claveTemporal);
        usuario.setClave(claveEncriptada);
        usuarioRepository.save(usuario);

        return claveTemporal;
    }

    private String generarClaveTemporal() {
        return "Temp" + (int)(Math.random() * 9000 + 1000);  // Ejemplo: Temp4572
    }

    public boolean actualizarClavePorCorreo(String correo, String nuevaClave) {
        System.out.println("Recibido correo: " + correo); // Para asegurarte de lo que llega

        Usuario usuario = usuarioRepository.findByPersonaCorreo(correo);

        if (usuario == null) {
            System.out.println("No se encontró usuario con el correo: " + correo);
            return false;
        }

        String claveEncriptada = passwordEncoder.encode(nuevaClave);
        usuario.setClave(claveEncriptada);
        usuarioRepository.save(usuario);
        return true;
    }



}
