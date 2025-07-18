package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Integer> {
    List<Categoria> findByEstadoTrue();
}
