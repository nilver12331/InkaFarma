package com.InkaFarma.order_service.repository;

import com.InkaFarma.order_service.entity.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenRepository extends JpaRepository<Orden,Integer> {
}
