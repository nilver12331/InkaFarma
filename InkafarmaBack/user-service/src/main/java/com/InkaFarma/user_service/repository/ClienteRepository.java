package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.Cliente;
import com.InkaFarma.user_service.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente,Integer> {


    Cliente findByPersonaIdPersona(Integer idPersona);
}
