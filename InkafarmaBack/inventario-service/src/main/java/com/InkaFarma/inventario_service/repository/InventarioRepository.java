package com.InkaFarma.inventario_service.repository;

import com.InkaFarma.inventario_service.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario,Integer> {

}
