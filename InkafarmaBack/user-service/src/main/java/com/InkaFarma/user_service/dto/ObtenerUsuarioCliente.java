package com.InkaFarma.user_service.dto;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObtenerUsuarioCliente {
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String dni;
    private String genero;
    private String correo;
    private String imgPerfil;
    private int idCliente;
}
