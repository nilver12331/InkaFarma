package com.InkaFarma.api_gateway;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.List;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {
    @Value("${jwt.secret}")
    private String secretkey; // La clave secreta para verificar el token

    @Value("${config.jwt-enabled:true}") // true por defecto si no está definido
    private boolean jwtEnabled;

    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain){
        if (!jwtEnabled) {
            return chain.filter(exchange); // ⚠️ Seguridad desactivada
        }
        String path = exchange.getRequest().getURI().getPath();
        // ✅ Excluir rutas públicas del filtro JWT
        List<String> rutasPublicas = List.of(
                "/api/clientes/registrarCliente",
                "/api/usuarios/login"
        );

        if (rutasPublicas.contains(path)) {
            System.out.println(">> PATH ACTUAL: " + path);
            return chain.filter(exchange);
        }

        String authHeader=exchange.getRequest().getHeaders().getFirst("Authorization");
        if(authHeader ==null || !authHeader.startsWith("Bearer ")){
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String token=authHeader.substring(7); // Quita "Bearer "

        try{
            SecretKey key= Keys.hmacShaKeyFor(secretkey.getBytes());

            Claims claims= Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            // Puedes verificar aquí roles, expiración, etc.
            String subject=claims.getSubject();
            if(subject ==null || subject.isEmpty()){
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        }catch (Exception e){
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return  exchange.getResponse().setComplete();
        }
        return chain.filter(exchange); //Si todo esta bien sigue
    }

}
