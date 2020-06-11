package com.zxcl.guanwang_web.entity;

import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data
public class PageResult<T> {
    private int code;
    private String msg;
    private List<T> data;

    private int length=5;//页面接收数据大小
    private long recordsTotal;
    private long recordsFiltered;//过滤条件后的记录数
    private int draw=0;


    public PageResult(PageCondition obj,List<T> data){
        BeanUtils.copyProperties(obj,this);
        this.data=data;
        this.code=Result.SUCCESS;
        this.msg="";
        this.recordsFiltered=recordsTotal;
    }
}
