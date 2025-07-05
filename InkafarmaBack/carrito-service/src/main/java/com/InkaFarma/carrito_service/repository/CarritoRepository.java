package com.InkaFarma.carrito_service.repository;

import com.InkaFarma.carrito_service.entity.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito,Integer> {
    Optional<Carrito> findByIdClienteAndActivoTrue(Integer idCliente);
}
