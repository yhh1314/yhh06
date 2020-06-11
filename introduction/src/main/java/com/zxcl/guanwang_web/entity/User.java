package com.zxcl.guanwang_web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.ToString;
import org.springframework.util.StringUtils;

import java.util.List;

@Data
@ToString
@TableName(value = "user")
public class User {
    public static  final  int USER_ADMIN=1;
    public static  final  int USER_COM=0;
    @TableId(value = "user_id",type = IdType.AUTO)
    private int userId;
    private String userName;
    private String  password;
    @TableField(exist=false)
    private String  confirmPassword;
    private String  tel;
    private String applyContent;
    private String  mail;
    private int  userType;//用户类型0-普通用户，1-管理员
    private List<News> newsList;
    public String checkData(){
        String tip="";
        if(StringUtils.isEmpty(this.getTel())){
            tip="电话号码不能为空";
            return tip;
        }
        if(StringUtils.isEmpty(this.getPassword())){
            tip="密码不能为空";
            return tip;
        }
        if(StringUtils.isEmpty(this.getPassword())){
            tip="确认密码不能为空";
            return tip;
        }
        if(!password.equals(confirmPassword)){
            tip="两次密码不一致";
        }
        return tip;
    }
}
