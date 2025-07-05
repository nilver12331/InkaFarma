package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.entity.AtributoCategoria;
import com.InkaFarma.product_service.repository.AtributoCategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtributoCategoriaService {
    @Autowired
    private AtributoCategoriaRepository atributoCategoriaRepository;

    public AtributoCategoria asignarAtributoCategoria(AtributoCategoria atributoCategoria) {
        return atributoCategoriaRepository.save(atributoCategoria);
    }

    public void eliminarAsignacion(int id) {
        if (atributoCategoriaRepository.existsById(id)) {
            atributoCategoriaRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Asignación no encontrada con ID: " + id);
        }
    }

    public List<AtributoCategoria> listarAsignaciones() {
        return atributoCategoriaRepository.findAll();
    }
}
