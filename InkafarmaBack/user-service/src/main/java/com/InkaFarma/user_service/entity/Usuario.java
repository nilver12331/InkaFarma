package com.InkaFarma.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "usuario")
@Data  /*Genara automaticamente los metodos comunes que normalmente, @Getter y @Setter, @ToString(), @EqualsAndHashCode(), etx */
@NoArgsConstructor  /*Genera un constructor vacio*/
@AllArgsConstructor /*Genera un constructor con todos los campos*/
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;
    String usuario;
    String clave;

    /*Atributos de la clase que no van hacer mapeados*/
    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Cliente cliente;
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<UsuarioRol> roles;
}
