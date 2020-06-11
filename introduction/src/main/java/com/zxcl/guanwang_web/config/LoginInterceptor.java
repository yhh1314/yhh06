package com.zxcl.guanwang_web.config;


import com.zxcl.guanwang_web.entity.LoginRequired;
import com.zxcl.guanwang_web.entity.Result;
import com.zxcl.guanwang_web.entity.User;
import net.sf.json.JSONObject;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
        String url=request.getServletPath();
        String context=request.getContextPath();
       /* User user1=new User();
        user1.setUserId(1);
        user1.setUserType(1);
        user1.setUserName("yhh");
        request.getSession().setAttribute("user",user1);*/
        User user =(User) request.getSession().getAttribute("user");
        if(url.contains("/admin")){
            if (user == null) {
               response.sendRedirect(context+"/admin/login");
                return false;
            } else {
                if(user.getUserType() !=User.USER_ADMIN){//普通用户
                    request.getSession().invalidate();//登录用户如果之前已经以普通用户登录，就删除之前的登录信息并跳转到登录页
                    response.sendRedirect(context+"/admin/login");
                    return false;
                }
                // 已登录，放行
                return true;
            }
        }
        if(handler instanceof HandlerMethod) {
                HandlerMethod h = (HandlerMethod)handler;

                LoginRequired a=h.getMethodAnnotation(LoginRequired.class);
                if(a !=null){//有注解必须登录
                    if (user == null) {
                        writeRes(new Result(Result.ERROR,"用户还未登录！"),response);
                        return false;
                    } else {
                        // 已登录，放行
                        return true;
                    }
                }else{
                    return true;
                }
        }else{
            return true;
        }

     }
     public void writeRes(Result result,HttpServletResponse response){
         //将实体对象转换为JSON Object转换
         JSONObject responseJSONObject = JSONObject.fromObject(result);
         response.setCharacterEncoding("UTF-8");
         response.setContentType("application/json; charset=utf-8");
         PrintWriter out = null;
         try {
             out = response.getWriter();
             out.append(responseJSONObject.toString());
         } catch (IOException e) {
             e.printStackTrace();
         } finally {
             if (out != null) {
                 out.close();
             }
         }

     }
}
