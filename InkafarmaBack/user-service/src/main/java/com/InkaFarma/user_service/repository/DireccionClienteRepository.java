package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.DireccionCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DireccionClienteRepository extends JpaRepository<DireccionCliente,Integer> {
    List<DireccionCliente> findByCliente_IdClienteAndActivoTrue(Integer idCliente);
    @Modifying
    @Query("UPDATE DireccionCliente d SET d.principal = false WHERE d.cliente.idCliente = :idCliente")
    void marcarTodasNoPrincipales(@Param("idCliente") Integer idCliente);
    @Modifying
    @Query("UPDATE DireccionCliente d SET d.principal = true WHERE d.id = :idDireccion")
    void marcarPrincipalPorId(@Param("idDireccion") Integer idDireccion);
}
