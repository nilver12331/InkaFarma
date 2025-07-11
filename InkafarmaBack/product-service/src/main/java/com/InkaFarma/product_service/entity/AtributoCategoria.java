package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @JsonBackReference
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_atributo")
    private Atributo atributo;

}

