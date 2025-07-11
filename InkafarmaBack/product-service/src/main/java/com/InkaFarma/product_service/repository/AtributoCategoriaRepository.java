package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.AtributoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtributoCategoriaRepository extends JpaRepository<AtributoCategoria,Integer> {

}
