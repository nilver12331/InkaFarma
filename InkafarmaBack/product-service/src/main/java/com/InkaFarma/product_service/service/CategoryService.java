package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.entity.Categoria;
import com.InkaFarma.product_service.repository.CategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoriaRepository categoriaRepository;
    /*Listar Categorias */
    public List<Categoria> obtenerCategorias(){
        return categoriaRepository.findByEstadoTrue();
    }

    /*Guardar Categoria */
    public Categoria crearCategoria(Categoria categoria) {
        categoria.setIdCategoria(null); // asegura que sea nuevo
        categoria.setEstado(true);
        return categoriaRepository.save(categoria);
    }
    /*Actualizar Categorias*/
    public Categoria actualizarCategoria(Integer id, Categoria categoria) {
        if (!categoriaRepository.existsById(id)) {
            throw new EntityNotFoundException("No existe la categoría con ID: " + id);
        }
        categoria.setIdCategoria(id);
        return categoriaRepository.save(categoria);
    }
    /*Obtener CateogriaPorId*/
    public Categoria obtenerPorId(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    /*Eliminar Categoria*/
    public void eliminarCategoria(Integer id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No existe la categoría con ID: " + id));
        categoria.setEstado(false);
        categoriaRepository.save(categoria);
    }

}
