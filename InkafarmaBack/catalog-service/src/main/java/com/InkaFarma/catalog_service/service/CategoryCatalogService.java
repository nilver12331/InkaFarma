package com.InkaFarma.catalog_service.service;

import com.InkaFarma.catalog_service.dto.Categoria;
import com.InkaFarma.catalog_service.service.Interface.CategoryCatalogInterface;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class CategoryCatalogService implements CategoryCatalogInterface {

    private final WebClient webClient;

    public CategoryCatalogService(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://product-service").build();
    }

    @Override
    public List<Categoria> listar_categoria() {
        return webClient
                .get()
                .uri("/api/category/categorias") // ¡Importante! URI correcto
                .retrieve()
                .bodyToFlux(Categoria.class)
                .collectList()
                .block();
    }
}
