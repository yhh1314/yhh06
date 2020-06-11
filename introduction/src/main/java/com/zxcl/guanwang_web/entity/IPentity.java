package com.zxcl.guanwang_web.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@TableName(value = "wwp_temp")
public class IPentity {
    @TableField(value = "tarea")
    private String tarea;
    @TableField(value = "tip")
    private String tip;
    @TableField(value = "ttime")
    private String ttime;

    public String getTtime() {
        return ttime;
    }

    public void setTtime(Date ttime) {
        if(ttime != null){
            SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            this.ttime=simpleDateFormat.format(ttime);
        }else {
            this.ttime=null;
        }


    }
    public void setTtime(String date){
        this.ttime=date;
    }

}
