package com.InkaFarma.user_service.repository;

import com.InkaFarma.user_service.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Integer> { /*Usuario ->referencia al entity y Integer-> referencia a tipo de su llave primaria*/
    //Verificar usuario y contraseña
    Usuario findByUsuarioAndClave(String usuario, String clave);
}
