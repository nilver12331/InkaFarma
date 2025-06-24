package com.InkaFarma.user_service.dto;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Usuario;
import lombok.Data;

@Data
public class RegistroClienteRequest {
    private Usuario usuario;
    private Cliente cliente;
    private int idRol;
}
