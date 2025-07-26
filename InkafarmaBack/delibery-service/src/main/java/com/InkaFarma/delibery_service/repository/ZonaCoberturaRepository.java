package com.InkaFarma.delibery_service.repository;

import com.InkaFarma.delibery_service.entity.ZonaCobertura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZonaCoberturaRepository extends JpaRepository<ZonaCobertura,Integer> {
    List<ZonaCobertura> findAllByActivoTrue();
    List<ZonaCobertura> findByActivoTrue();
}
