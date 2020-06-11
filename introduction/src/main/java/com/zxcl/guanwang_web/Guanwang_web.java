package com.zxcl.guanwang_web;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@SpringBootApplication
public class Guanwang_web extends SpringBootServletInitializer {

    private static final org.apache.log4j.Logger logger = Logger.getLogger(Guanwang_web.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder springApplicationBuilder){
        return springApplicationBuilder.sources(Guanwang_web.class);
    }
    public static void main(String[] args) {
        SpringApplication.run(Guanwang_web.class, args);
        logger.info("程序启动");
    }
    //解决不能注入到配置文件的属性值的问题
    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {

        PropertySourcesPlaceholderConfigurer c = new PropertySourcesPlaceholderConfigurer();

        c.setIgnoreUnresolvablePlaceholders(true);

        return c;
    }


}
