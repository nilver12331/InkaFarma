package com.InkaFarma.product_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "producto_atributo")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoAtributo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProductoAtributo;
    @ManyToOne
    @JoinColumn(name = "id_producto",referencedColumnName = "idProducto")
    @JsonIgnore
    private Producto producto;
    @ManyToOne
    @JoinColumn(name = "id_valor_atributo",referencedColumnName = "idValorAtributo")
    private ValorAtributo valorAtributo;
}
