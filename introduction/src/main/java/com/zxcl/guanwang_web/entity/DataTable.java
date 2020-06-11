package com.zxcl.guanwang_web.entity;

import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data

public class DataTable<T> {
    private int recordsTotal;
    private int recordsFiltered;//过滤条件后的记录数
    private int draw=0;
    private List<T> data;
    private int start=0;//第几条数据默认从0开始
    private int length=5;//每页大小
    private int code;
    public DataTable(PageCondition obj,List<T> data){
        BeanUtils.copyProperties(obj,this);
        this.data=data;
        this.recordsFiltered=recordsTotal;
        this.code=Result.SUCCESS;
    }
}
