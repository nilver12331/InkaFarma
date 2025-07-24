package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.entity.ValorAtributo;
import com.InkaFarma.product_service.repository.ValorAtributoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ValorAtributoService {
    @Autowired
    private ValorAtributoRepository valorAtributoRepository;

    public List<ValorAtributo> listarPorAtributo(int idAtributo) {
        return valorAtributoRepository.findByAtributoCategoria_Atributo_IdAtributo(idAtributo);
    }

    public ValorAtributo guardar(ValorAtributo valorAtributo) {
        return valorAtributoRepository.save(valorAtributo);
    }

    public ValorAtributo obtenerPorId(int id) {
        return valorAtributoRepository.findById(id).orElse(null);
    }
}
