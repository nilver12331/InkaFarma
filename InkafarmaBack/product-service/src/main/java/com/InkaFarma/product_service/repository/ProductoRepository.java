package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.Categoria;
import com.InkaFarma.product_service.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Integer> {
    List<Producto> findByActivoTrue();
}
