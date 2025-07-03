package com.InkaFarma.product_service.entity;

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
    @ManyToOne
    @JoinColumn(name = "id_atributo",referencedColumnName = "idAtributo")
    private Atributo atributo;
    private String valor;
}
