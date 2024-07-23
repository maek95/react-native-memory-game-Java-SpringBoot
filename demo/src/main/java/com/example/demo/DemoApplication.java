package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 'Run Java' in this file!

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args); // bootstraps the Spring Boot application which contains all application-wide configurations such as the Highscore endpoint etc!
	}


	// just some testing:
	// http://localhost:8080/hello 
	@CrossOrigin(origins = "*")		// allow all origins
	@GetMapping("/hello")
	public String hello(@RequestParam (value="name", defaultValue = "springboot") String name) {
		return String.format("{\"message\": \"Hello %s\"}", name); // Return JSON formatted string... {"message": "Hello springboot"}
	}

	

}
