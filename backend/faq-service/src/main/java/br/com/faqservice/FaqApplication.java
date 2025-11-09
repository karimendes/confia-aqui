package br.com.faqservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"br.com.faqservice", "br.com.commonlib"})
public class FaqApplication {
    public static void main(String[] args) {
        SpringApplication.run(FaqApplication.class, args);
    }
}