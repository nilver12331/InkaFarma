package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria",referencedColumnName = "idCategoria")
    @JsonIgnore
    private Categoria categoria;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_atributo",referencedColumnName = "idAtributo")
    @JsonIgnore
    private Atributo atributo;
}
