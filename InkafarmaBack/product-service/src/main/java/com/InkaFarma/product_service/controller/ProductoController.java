package com.InkaFarma.product_service.controller;

import com.InkaFarma.product_service.dto.ProductoConAtributosDTO;
import com.InkaFarma.product_service.entity.Categoria;
import com.InkaFarma.product_service.entity.Producto;
import com.InkaFarma.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private final ProductService productoService;
    public ProductoController(ProductService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<ProductoConAtributosDTO>> listarProductos(){
        List<ProductoConAtributosDTO> productosDTO=productoService.listarProductos();
        return ResponseEntity.ok(productosDTO);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registrarProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") double precio,
            @RequestParam("activo") boolean activo,
            @RequestParam("idCategoria") int idCategoria,
            @RequestParam("imagenes") MultipartFile[] imagenes
    ) {
        productoService.registrarProducto(nombre, descripcion, precio, activo, idCategoria, imagenes);
        return ResponseEntity.ok("Producto registrado exitosamente.");
    }

    // Editar producto con imágenes adicionales
    @PutMapping("/{idProducto}")
    public ResponseEntity<Producto> editarProducto(
            @PathVariable int idProducto,
            @RequestParam String nombre,
            @RequestParam String descripcion,
            @RequestParam double precio,
            @RequestParam boolean activo,
            @RequestParam int idCategoria,
            @RequestParam(value = "imagenes", required = false) MultipartFile[] imagenes) {

        Producto actualizado = productoService.editarProducto(idProducto, nombre, descripcion, precio, activo, idCategoria, imagenes != null ? imagenes : new MultipartFile[0]);
        return ResponseEntity.ok(actualizado);
    }

    // Obtener producto por ID
    @GetMapping("/{idProducto}")
    public ResponseEntity<ProductoConAtributosDTO> obtenerProductoPorId(@PathVariable int idProducto) {
        try {
            ProductoConAtributosDTO productoDTO = productoService.obtenerProductoPorId(idProducto);
            return ResponseEntity.ok(productoDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Cambiar estado del producto (activo/inactivo)
    @PutMapping("/{idProducto}/estado")
    public ResponseEntity<Producto> cambiarEstado(
            @PathVariable int idProducto,
            @RequestParam boolean estado) {

        Producto actualizado = productoService.cambiarEstado(idProducto, estado);
        return ResponseEntity.ok(actualizado);
    }

    // Cambiar imagen principal del producto
    @PutMapping("/{idProducto}/imagen-principal/{idImagen}")
    public ResponseEntity<Void> cambiarImagenPrincipal(
            @PathVariable int idProducto,
            @PathVariable int idImagen) {

        productoService.cambiarImagenPrincipal(idProducto, idImagen);
        return ResponseEntity.noContent().build();
    }
        @PostMapping("/por-ids")
    public ResponseEntity<List<ProductoConAtributosDTO>> obtenerPorIds(@RequestBody List<Integer> ids) {
        List<ProductoConAtributosDTO> productos = productoService.listarProductosPorIds(ids);
        return ResponseEntity.ok(productos);
    }
}
