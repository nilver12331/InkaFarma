package com.InkaFarma.carrito_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CarritoServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarritoServiceApplication.class, args);
	}

}
