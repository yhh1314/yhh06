package com.zxcl.guanwang_web.entity;

import lombok.Data;

@Data
public class PageCondition {
   private int start=0;//第几条数据默认从0开始
    private int length=5;//每页大小
    private int recordsTotal;
    private Object queryObj;
    private int draw=0;


    public int getPage(){
        int p=(start/length)+1;
        return p;
    }
}
