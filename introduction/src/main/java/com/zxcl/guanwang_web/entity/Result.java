package com.zxcl.guanwang_web.entity;

import lombok.Data;

/**
 * 结果返回类
 */
@Data
public class Result {
    public static final int SUCCESS=0;
    public static final int ERROR=-1;
    private int code;
    private String  msg;
    private Object data;
    public Result(int code,String msg){
        this.code=code;
        this.msg=msg;
    }
    public Result(int code,String msg,Object data){
        this.code=code;
        this.msg=msg;
        this.data=data;
    }
    public Result(String msg,Object data){
        this.code=Result.SUCCESS;
        this.msg=msg;
        this.data=data;
    }
    public Result(Object data){
        this.code=Result.SUCCESS;
        this.msg="";
        this.data=data;
    }

}
