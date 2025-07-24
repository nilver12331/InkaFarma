package com.InkaFarma.delibery_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class DeliberyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliberyServiceApplication.class, args);
	}

}
