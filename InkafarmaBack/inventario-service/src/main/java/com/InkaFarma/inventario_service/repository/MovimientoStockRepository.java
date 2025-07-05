package com.InkaFarma.inventario_service.repository;

import com.InkaFarma.inventario_service.entity.MovimientoStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimientoStockRepository extends JpaRepository<MovimientoStock,Integer> {
    List<MovimientoStock> findByIdProducto(Integer idProducto);
}
