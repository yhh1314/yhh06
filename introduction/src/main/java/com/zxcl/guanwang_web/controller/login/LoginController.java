package com.zxcl.guanwang_web.controller.login;

import com.zxcl.guanwang_web.entity.Result;
import com.zxcl.guanwang_web.entity.User;
import com.zxcl.guanwang_web.service.UserService;
import com.zxcl.guanwang_web.utils.ImageVerificationCode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Api(value = "登录相关控制器")
@Controller
public class LoginController {
    private static final org.apache.log4j.Logger logger = Logger.getLogger(LoginController.class);
    @Autowired
    private UserService userService;

    @ApiOperation(value = "登录")
    @PostMapping(value = "/checkLogin")
    @ResponseBody
    public Result login(@RequestBody User user, HttpSession session,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
      User userRes=  userService.getUserByNameAndPwd(user);
      if(userRes != null){
          session.setAttribute("user",userRes);
          logger.info("用户："+userRes.getTel()+"登录成功");
          return  new Result(Result.SUCCESS,"OK");
      }else
          return  new Result(Result.ERROR,"未找到用户");

    }
    @ApiOperation(value = "管理员登录")
    @PostMapping(value = "/admin/checkLogin")
    @ResponseBody
    public Result adLogin(String userName,String password, HttpSession session,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        User u=new User();
        u.setUserName(userName);
        u.setPassword(password);
      User userRes=  userService.getUserByNameAndPwd(u);
      if(userRes != null){
          if(userRes.getUserType() == User.USER_ADMIN){
              session.setAttribute("user",userRes);
              logger.info("用户："+userRes.getTel()+"登录成功");
              return  new Result(Result.SUCCESS,"OK");
          }else{

              return  new Result(Result.ERROR,"您不是管理员，请核对账号");
          }

      }else
          return  new Result(Result.ERROR,"未找到用户");

    }
    @ApiOperation(value = "注册")
    @PostMapping(value = "/regist")
    @ResponseBody
    public Result regist(User user,String code,HttpSession session,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        if(StringUtils.isEmpty(code)){
            return new Result(Result.ERROR,"验证码不能为空");
        }
        Object qrcode=session.getAttribute("code");
        if(null == qrcode){
            return new Result(Result.ERROR,"验证码已过期");
        }
        String checkCode= qrcode.toString().toLowerCase();
        if(!checkCode.equals(code.toLowerCase())){
            return new Result(Result.ERROR,"验证码错误");
        }
        String tip=user.checkData();
        if(!"".equals(tip)){
            return  new Result(Result.ERROR,tip);
        }
        String tel="";
        if(user != null){
            tel=user.getTel();
        }
       int count= userService.findUserByAccount(tel);
       if(count>0){
           return  new Result(Result.ERROR,"该账户已被注册");
       }
       int res= userService.saveUser(user);
       if(res>0)
            return  new Result(Result.SUCCESS,"注册成功");
       else
           return  new Result(Result.ERROR,"注册失败，请稍后重试！");
    }
    @GetMapping(value = "/getCode")
    public void getVerifiCode(HttpServletRequest request, HttpServletResponse response) {
        /*
             1.生成验证码
             2.把验证码上的文本存在session中
             3.把验证码图片发送给客户端
        */
        response.setHeader("Access-Control-Allow-Origin", "*");
        ImageVerificationCode ivc = new ImageVerificationCode();     //用我们的验证码类，生成验证码类对象
        BufferedImage image = ivc.getImage();  //获取验证码
        request.getSession().setAttribute("code", ivc.getText()); //将验证码的文本存在session中
        try {
            ivc.output(image, response.getOutputStream());//将验证码图片响应给客户端
        } catch (IOException e) {
            logger.error("生成验证码失败");
            e.printStackTrace();
        }
    }
    @GetMapping("/admin/logout")

    public String logout(HttpSession session,HttpServletResponse res,HttpServletRequest req){
        res.setHeader("Access-Control-Allow-Origin", "*");
        session.invalidate();
        String context=req.getContextPath();
        return "redirect:/admin/login";
    }
    @PostMapping("/testK")
    @ResponseBody
    public String test(HttpSession session,HttpServletResponse res,HttpServletRequest req){

        return "helloworldteset";
    }
}
