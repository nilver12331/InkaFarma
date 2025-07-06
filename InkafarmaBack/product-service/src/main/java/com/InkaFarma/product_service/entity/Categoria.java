package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "categoria")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCategoria;
    private String nombre;

    @OneToMany(mappedBy = "categoria", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<AtributoCategoria> atributoCategoriaList;

}
