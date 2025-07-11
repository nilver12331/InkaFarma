package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "valor_atributo")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValorAtributo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idValorAtributo;
    private String valor;
    @ManyToOne
    @JoinColumn(name = "id_atributo")
    @JsonBackReference
    private Atributo atributo;

}
