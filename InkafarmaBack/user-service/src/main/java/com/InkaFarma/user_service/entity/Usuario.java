package com.InkaFarma.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "usuario")
@Data/*Genara automaticamente los metodos comunes que normalmente, @Getter y @Setter, @ToString(), @EqualsAndHashCode(), etx */
@NoArgsConstructor  /*Genera un constructor vacio*/
@AllArgsConstructor /*Genera un constructor con todos los campos*/
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    private String usuario;
    private String clave;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_persona",referencedColumnName = "idPersona")
    private Persona persona;
    @ManyToOne
    @JoinColumn(name = "id_estado",referencedColumnName = "idEstado")
    private Estado estado;
    //Atributos de la clase que no van hacer mapeados
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<UsuarioRol> roles;

}
