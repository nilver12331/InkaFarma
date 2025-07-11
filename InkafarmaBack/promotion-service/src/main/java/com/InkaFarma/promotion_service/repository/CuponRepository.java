package com.InkaFarma.promotion_service.repository;

import com.InkaFarma.promotion_service.entity.Cupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CuponRepository extends JpaRepository<Cupon,Integer> {
    Optional<Cupon> findByCodigoAndActivoTrue(String codigo);
}
