package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona,Integer> {
}
