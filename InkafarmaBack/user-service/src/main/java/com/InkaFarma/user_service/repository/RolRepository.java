package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol,Integer> {
     Optional<Rol> findByIdRol(int idRol);
}
