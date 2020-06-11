package com.zxcl.guanwang_web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@TableName(value = "coll")
public class Coll {
    @TableId(value = "id",type = IdType.AUTO)
    private int id;
    private int userId;
    private String crtTime;
    private long newsId;
    public void setCrtTime(Date date){
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.crtTime=simpleDateFormat.format(date);
    }
}
