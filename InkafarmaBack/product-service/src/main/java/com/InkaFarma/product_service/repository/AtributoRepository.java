package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.Atributo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AtributoRepository extends JpaRepository<Atributo,Integer> {
}
