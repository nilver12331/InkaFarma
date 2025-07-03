package com.InkaFarma.product_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atributo_categoria")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtributoCategoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAtributoCatengoria;
    @ManyToOne
    @JoinColumn(name = "id_categoria",referencedColumnName = "idCategoria")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "id_atributo",referencedColumnName = "idAtributo")
    private Atributo atributo;
}
