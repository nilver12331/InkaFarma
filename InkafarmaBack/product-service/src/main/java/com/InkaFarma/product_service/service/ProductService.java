package com.InkaFarma.product_service.service;

import com.InkaFarma.product_service.dto.ProductoConAtributosDTO;
import com.InkaFarma.product_service.dto.ProductoMapper;
import com.InkaFarma.product_service.entity.Categoria;
import com.InkaFarma.product_service.entity.ImagenProducto;
import com.InkaFarma.product_service.entity.Producto;
import com.InkaFarma.product_service.repository.CategoriaRepository;
import com.InkaFarma.product_service.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private ProductoMapper productoMapper;
    public void registrarProducto(String nombre, String descripcion, double precio, boolean activo,
                                  int idCategoria, MultipartFile[] imagenes) {

        Producto producto = new Producto();
        producto.setNombre(nombre);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setActivo(activo);
        // IMPRIME la ruta absoluta donde se guardará
        System.out.println(Paths.get("uploads").toAbsolutePath());
        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        producto.setCategoria(categoria);

        List<ImagenProducto> listaImagenes = new ArrayList<>();

        for (MultipartFile archivo : imagenes) {
            if (!archivo.isEmpty()) {
                try {
                    String nombreArchivo = UUID.randomUUID() + "_" + archivo.getOriginalFilename();
                    Path ruta = Paths.get("uploads/" + nombreArchivo);
                    Files.createDirectories(ruta.getParent());
                    Files.write(ruta, archivo.getBytes());

                    ImagenProducto imagen = new ImagenProducto();
                    imagen.setUrlimagen(nombreArchivo); // Solo guarda el nombre del archivo
                    imagen.setProducto(producto);
                    imagen.setEsPrincipal(false); // Puedes definir cuál es principal

                    listaImagenes.add(imagen);

                } catch (IOException e) {
                    throw new RuntimeException("Error al guardar imagen", e);
                }
            }
        }

        producto.setImagenProductoList(listaImagenes);
        productoRepository.save(producto);
    }

    public Producto cambiarEstado(int idProducto, boolean nuevoEstado) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setActivo(nuevoEstado);
        return productoRepository.save(producto);
    }


    public ProductoConAtributosDTO obtenerProductoPorId(int idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return productoMapper.mapearProducto(producto);
    }

    public Producto editarProducto(int idProducto, String nombre, String descripcion, double precio,
                                   boolean activo, int idCategoria, MultipartFile[] nuevasImagenes) {

        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(nombre);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setActivo(activo);

        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        producto.setCategoria(categoria);

        List<ImagenProducto> nuevasImagenesList = new ArrayList<>();

        for (MultipartFile archivo : nuevasImagenes) {
            if (!archivo.isEmpty()) {
                try {
                    String nombreArchivo = UUID.randomUUID() + "_" + archivo.getOriginalFilename();
                    Path ruta = Paths.get("uploads/" + nombreArchivo);
                    Files.createDirectories(ruta.getParent());
                    Files.write(ruta, archivo.getBytes());

                    ImagenProducto imagen = new ImagenProducto();
                    imagen.setUrlimagen(ruta.toString());
                    imagen.setProducto(producto);
                    imagen.setEsPrincipal(false);

                    nuevasImagenesList.add(imagen);
                } catch (IOException e) {
                    throw new RuntimeException("Error al guardar imagen", e);
                }
            }
        }

        // Agregar nuevas imágenes sin eliminar las anteriores
        if (producto.getImagenProductoList() == null) {
            producto.setImagenProductoList(new ArrayList<>());
        }

        producto.getImagenProductoList().addAll(nuevasImagenesList);

        return productoRepository.save(producto);
    }

    public void cambiarImagenPrincipal(int idProducto, int idImagen) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        for (ImagenProducto imagen : producto.getImagenProductoList()) {
            imagen.setEsPrincipal(imagen.getIdImagenProducto() == idImagen);
        }

        productoRepository.save(producto);
    }
    public List<ProductoConAtributosDTO> listarProductos(){
        List<Producto> productos=productoRepository.findByActivoTrue();
        return productos.stream()
                .map(productoMapper::mapearProducto) // correcto: referencia al método
                .collect(Collectors.toList());
    }

    public List<ProductoConAtributosDTO> listarProductosPorIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty()) return Collections.emptyList();

        List<Producto> productos = productoRepository.findByIdProductoInAndActivoTrue(ids);
        return productos.stream()
                .map(productoMapper::mapearProducto)
                .collect(Collectors.toList());
    }
}
