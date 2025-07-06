package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.entity.ProductoAtributo;
import com.InkaFarma.product_service.repository.ProductoAtributoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoAtributoService {
    @Autowired
    private ProductoAtributoRepository productoAtributoRepository;

    public List<ProductoAtributo> obtenerPorProducto(int idProducto) {
        return productoAtributoRepository.findByProducto_IdProducto(idProducto);
    }

    public ProductoAtributo guardar(ProductoAtributo pa) {
        return productoAtributoRepository.save(pa);
    }

    public void eliminar(int id) {
        productoAtributoRepository.deleteById(id);
    }
}
