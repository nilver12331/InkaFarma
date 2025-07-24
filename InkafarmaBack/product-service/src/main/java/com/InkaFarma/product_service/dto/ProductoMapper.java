package com.InkaFarma.product_service.dto;

import com.InkaFarma.product_service.entity.Atributo;
import com.InkaFarma.product_service.entity.ImagenProducto;
import com.InkaFarma.product_service.entity.Producto;
import com.InkaFarma.product_service.entity.ValorAtributo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductoMapper {
    public ProductoConAtributosDTO mapearProducto(Producto producto) {
        ProductoConAtributosDTO dto = new ProductoConAtributosDTO();

        dto.setIdProducto(producto.getIdProducto());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setMasBuscado(producto.isMasBuscado());
        dto.setDestacado(producto.isDestacado());
        dto.setActivo(producto.isActivo());

        // Aquí agregas el idCategoria
        dto.setIdCategoria(producto.getCategoria().getIdCategoria());
        dto.setNombreCategoria(producto.getCategoria().getNombre());

        // Imágenes
        dto.setImagenes(producto.getImagenProductoList().stream()
                .map(img -> {
                    ImagenProductoDTO imgDto = new ImagenProductoDTO();
                    imgDto.setUrlImagen(img.getUrlimagen());
                    imgDto.setEsPrincipal(img.isEsPrincipal());
                    return imgDto;
                })
                .collect(Collectors.toList()));

        // Atributos
        List<AtributoValorDTO> atributos = producto.getProductoAtributoList().stream()
                .map(pa -> {
                    ValorAtributo va = pa.getValorAtributo();
                    Atributo atributo = va.getAtributoCategoria().getAtributo();

                    AtributoValorDTO avDTO = new AtributoValorDTO();
                    avDTO.setIdAtributo(atributo.getIdAtributo());
                    avDTO.setNombreAtributo(atributo.getNombre());
                    avDTO.setIdValorAtributo(va.getIdValorAtributo());
                    avDTO.setValor(va.getValor());

                    return avDTO;
                })
                .collect(Collectors.toList());
        dto.setAtributos(atributos);
        return dto;
    }
}
