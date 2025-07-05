package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.entity.Atributo;
import com.InkaFarma.product_service.repository.AtributoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtributoService {
    @Autowired
    private AtributoRepository atributoRepository;

    public List<Atributo> listarTodos() {
        return atributoRepository.findAll();
    }

    public Atributo guardar(Atributo atributo) {
        return atributoRepository.save(atributo);
    }

    public Atributo actualizar(int id, Atributo nuevoAtributo) {
        Atributo existente = atributoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Atributo no encontrado con ID: " + id));

        existente.setNombre(nuevoAtributo.getNombre());
        existente.setValorAtributos(nuevoAtributo.getValorAtributos());

        return atributoRepository.save(existente);
    }

    public Atributo obtenerPorId(int id) {
        return atributoRepository.findById(id).orElse(null);
    }
}
