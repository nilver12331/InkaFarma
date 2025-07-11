package com.InkaFarma.promotion_service.repository;

import com.InkaFarma.promotion_service.entity.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromocionRepository extends JpaRepository<Promocion,Integer> {
    List<Promocion> findByIdProductoAndActivoTrue(Long idProducto);
}
