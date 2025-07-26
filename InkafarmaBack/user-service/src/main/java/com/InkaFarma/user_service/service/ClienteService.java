package com.InkaFarma.user_service.service;

import com.InkaFarma.user_service.entity.Persona;
import com.InkaFarma.user_service.entity.*;
import com.InkaFarma.user_service.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.InkaFarma.user_service.repository.PersonaRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


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
    private PersonaRepository personaRepository;
    @Autowired
    private EstadoRepository estadoRepository;
    @Autowired
    private DireccionClienteRepository direccionClienteRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    private static final int ROL_CLIENTE = 1;
    private static final int ESTADO_ACTIVO = 1;

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
        String claveEncriptada = passwordEncoder.encode(usuario.getClave());
        usuario.setClave(claveEncriptada);

        // Guardar usuario (se guarda persona automáticamente si tienes cascade en @OneToOne)
        usuarioRepository.save(usuario);

        // Guardar cliente asociado a la persona del usuario
        Cliente cliente = new Cliente();
        cliente.setPersona(usuario.getPersona());
        clienteRepository.save(cliente);
    }

    // Listar todos los clientes
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // Obtener cliente por ID
    public Cliente obtenerClientePorId(Integer id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));
    }

    // Actualizar cliente
    @Transactional
    public Cliente actualizarCliente(Integer id, Cliente clienteActualizado) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + id));

        Persona personaExistente = clienteExistente.getPersona();
        Persona personaNueva = clienteActualizado.getPersona();

        if (personaExistente != null && personaNueva != null) {
            personaExistente.setNombre(personaNueva.getNombre());
            personaExistente.setApellidoPaterno(personaNueva.getApellidoPaterno());
            personaExistente.setApellidoMaterno(personaNueva.getApellidoMaterno());
            personaExistente.setDni(personaNueva.getDni());
            personaExistente.setGenero(personaNueva.getGenero());
            personaExistente.setTelefono(personaNueva.getTelefono());
            personaExistente.setCorreo(personaNueva.getCorreo());
            personaExistente.setImgPerfil(personaNueva.getImgPerfil());

            // ¡IMPORTANTE! Guardar la persona modificada
            personaRepository.save(personaExistente);
        }

        return clienteRepository.save(clienteExistente);
    }

    /*Obtener direcciones de cliente*/
    public List<DireccionCliente> obtenerDireccionesPorCliente(Integer idCliente) {
        return direccionClienteRepository.findByCliente_IdClienteAndActivoTrue(idCliente);
    }
    public DireccionCliente guardarDireccion(DireccionCliente direccionCliente) {
        direccionCliente.setActivo(true);
        direccionCliente.setPrincipal(false);
        return direccionClienteRepository.save(direccionCliente);
    }
    public boolean desactivarDireccion(Integer idDireccion) {
        Optional<DireccionCliente> optional = direccionClienteRepository.findById(idDireccion);
        if (optional.isPresent()) {
            DireccionCliente direccion = optional.get();
            direccion.setActivo(false);
            direccionClienteRepository.save(direccion);
            return true;
        }
        return false;
    }

    @Transactional
    public void marcarComoPrincipal(Integer idDireccion, Integer idCliente) {
        // Poner en false todas las direcciones del cliente
        direccionClienteRepository.marcarTodasNoPrincipales(idCliente);
        // Poner en true la dirección seleccionada
        direccionClienteRepository.marcarPrincipalPorId(idDireccion);
    }
}


