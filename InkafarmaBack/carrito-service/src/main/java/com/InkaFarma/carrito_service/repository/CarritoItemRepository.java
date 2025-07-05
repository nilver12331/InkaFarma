package com.InkaFarma.carrito_service.repository;

import com.InkaFarma.carrito_service.entity.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem,Integer> {

}
