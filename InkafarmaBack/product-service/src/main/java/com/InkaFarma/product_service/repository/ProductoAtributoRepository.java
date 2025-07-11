package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.ProductoAtributo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoAtributoRepository extends JpaRepository<ProductoAtributo, Integer> {
    List<ProductoAtributo> findByProducto_IdProducto(int idProducto);
}
