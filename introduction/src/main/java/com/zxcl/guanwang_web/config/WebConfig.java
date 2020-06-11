package com.zxcl.guanwang_web.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ContentVersionStrategy;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.Arrays;
import java.util.List;

@Configuration
@Component
public class WebConfig implements WebMvcConfigurer {

    private static final List<String> EXCLUDE_PATH= Arrays.asList("/","/admin/adlogin","/ueditor/**","/swagger-resources/**","/index.html","/swagger-ui.html/**","/admin/login","/admin/checkLogin","/checkLogin","/css/**","/js/**","/assets/**","/Administration/**","/Content/**","/contents/**","/Designer/**","/prevsf/**","/pubsf/**","/Scripts/**","/sitefiles10104/**","/static/**");
    @Value(value = "${upload-path}")
    private String url;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        /* *  对根目录和静态文件不需要进行拦截，如果对根目录（即登录页面）进行拦截，将会导致循环重定向
         * 如果静态资源不在static下，指定一个自定义的文件夹存放资源文件，
         * 也会被拦截器拦截即使设置了addResourceLocations("classpath:/test/")
         * 排除了拦截器拦截的路径也不行,静态资源不能放其他位置*/


        registry.addInterceptor(loginInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(EXCLUDE_PATH);
    }
    @Bean
    public LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /** 和/*的区别是前者可以多重路径，后者只能一层 即前者：/a/b/c/d.js可以匹配到,后者：/a后面不能加子路径否则匹配不了
        VersionResourceResolver versionResourceResolver = new VersionResourceResolver()
                .addVersionStrategy(new ContentVersionStrategy(), "/**");
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/")//表示static路径下的文件访问路径映射为/**，
                .setCachePeriod(2592000).resourceChain(true).addResolver(versionResourceResolver);//比如：static/js/a.js就会映射为 项目名/js/a.js
        registry.addResourceHandler("swagger-ui.html")//即物理路径：classpath:/static/=/》
                .addResourceLocations("classpath:/META-INF/resources/");//这是swagger的位置
        registry.addResourceHandler("upload/**")//即物理路径：classpath:/static/=/》
                .addResourceLocations("file:/"+url);
    }
}
