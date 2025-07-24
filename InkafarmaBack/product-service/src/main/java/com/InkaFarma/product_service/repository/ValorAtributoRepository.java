package com.InkaFarma.product_service.repository;

import com.InkaFarma.product_service.entity.ValorAtributo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ValorAtributoRepository extends JpaRepository<ValorAtributo, Integer> {
    List<ValorAtributo> findByAtributoCategoria_Atributo_IdAtributo(int id);
}
