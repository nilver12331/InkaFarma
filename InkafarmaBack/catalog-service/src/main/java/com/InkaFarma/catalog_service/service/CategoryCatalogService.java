package com.InkaFarma.catalog_service.service;

import com.InkaFarma.catalog_service.dto.Categoria;
import com.InkaFarma.catalog_service.service.Interface.CategoryCatalogInterface;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class CategoryCatalogService implements CategoryCatalogInterface {

    private final WebClient webClient; // o RestTemplate

    public CategoryCatalogService(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://product-service").build();
    }
    @Override
    public List<Categoria> listar_categoria() {
        return webClient
                .get()
                .uri("/api/categorias") // este es mi /api/categorias
                .retrieve()
                .bodyToFlux(Categoria.class)
                .collectList()
                .block(); // solo si estás usando programación sincrónica
    }
}
