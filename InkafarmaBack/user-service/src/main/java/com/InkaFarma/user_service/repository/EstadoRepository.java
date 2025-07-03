package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadoRepository  extends JpaRepository<Estado,Integer> {
    Optional<Estado> findByIdEstado(int idEstado);
}
