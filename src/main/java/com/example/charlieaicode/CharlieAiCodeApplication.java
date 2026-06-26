package com.example.charlieaicode;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.charlieaicode.mapper")
public class CharlieAiCodeApplication {

    public static void main(String[] args) {
        SpringApplication.run(CharlieAiCodeApplication.class, args);
    }

}
