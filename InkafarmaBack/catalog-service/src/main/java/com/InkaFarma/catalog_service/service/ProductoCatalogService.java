package com.InkaFarma.catalog_service.service;

import com.InkaFarma.catalog_service.dto.Producto;
import com.InkaFarma.catalog_service.dto.ProductoAtributo;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service

public class ProductoCatalogService {

    private final WebClient webClient;

    public ProductoCatalogService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://product-service").build();
    }

    public List<ProductoAtributo> obtenerAtributosDeProducto(int idProducto) {
        return webClient.get()
                .uri("/api/producto-atributo/producto/" + idProducto)
                .retrieve()
                .bodyToFlux(ProductoAtributo.class)
                .collectList()
                .block();
    }
    public List<Producto> obtenerListProducto(){
        return webClient.get()
                .uri("/api/productos")
                .retrieve()
                .bodyToFlux(Producto.class)
                .collectList()
                .block();
    }
}
