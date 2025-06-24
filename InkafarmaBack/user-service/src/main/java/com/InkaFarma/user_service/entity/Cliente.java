package com.InkaFarma.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCliente;
    @OneToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "idUsuario")
    private Usuario usuario;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    @Column(length = 8, unique = true) // Define VARCHAR(8) en la BD
    private String dni;
    private String genero;
    @Column(length = 9)
    private String telefono;
    @Column(unique = true)
    private String correo;
    @Column(columnDefinition = "TEXT") // Define tipo TEXT en la BD
    private String imgPerfil;
}
