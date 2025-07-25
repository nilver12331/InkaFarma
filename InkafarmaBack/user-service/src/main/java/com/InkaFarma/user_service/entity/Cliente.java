package com.InkaFarma.user_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCliente;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_persona",referencedColumnName = "idPersona")
    private Persona persona;

}
