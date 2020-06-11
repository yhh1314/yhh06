package com.zxcl.guanwang_web.controller.pages;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 页面跳转控制器
 */
@Api(value = "页面跳转控制器")
@Controller
public class PageToControler {
    //首页
    @ApiOperation(value = "首页")
    @GetMapping("/")
    public String toIndex(){
        return "/common/sy.html";
    }
    @GetMapping("/sy")
    public String index2(){
        return "/common/sy.html";
    }
    //产品中心
    @GetMapping("/cpzx")
    public String toProIntro(){
        return "/common/cpzx.html";
    }
    //联系我们
    @GetMapping("/lxwm")
    public String toConnect(){
        return "/common/lxwm.html";
    }
    //新闻中心
    @GetMapping("/xwzx")
    public String toNews(){
        return "/common/xwzx.html";
    }
    //公司介绍
    @GetMapping("/gsjs")
    public String toCompany(){
        return "/common/gsjs.html";
    }
    @GetMapping("/noncar")
    public String toNonCar(){
        return "/common/noncar.html";
    }
    @GetMapping("/madecenter")
    public String toMadeCenter(){
        return "/common/madecenter.html";
    }
    @GetMapping("/saascenter")
    public String toSaasCenter(){
        return "/common/saascenter.html";
    }
    @GetMapping("/smart")
    public String toSmart(){
        return "/common/smart.html";
    }
    @GetMapping("/dwsyym")
    public String dwsyym(){
        return "/common/dwsyym.html";
    }
    @GetMapping("/admin/login")
    public String login(){
        return "/admin/login.html";
    }
    @GetMapping("/admin/index")
    public String index(){
        return "/admin/index.html";
    }
    @GetMapping("/admin/tables")
    public String newsPage(){
        return "/admin/tables.html";
    }
    @GetMapping("/admin/addnews")
    public String addnews(){
        return "/admin/addnews.html";
    }
    @GetMapping("/editor")
    public String toEditorDemo(){
        return "/common/editor.html";
    }
}
