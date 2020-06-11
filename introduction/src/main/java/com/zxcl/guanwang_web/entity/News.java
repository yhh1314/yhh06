package com.zxcl.guanwang_web.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.Api;
import lombok.Data;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Api(value = "新闻模型")
@TableName(value = "news")
public class News {
    @TableId(value = "news_id",type = IdType.AUTO)
   private long newsId;
    private int readNum;
    private String title;
    private String descStr;
    private String content;
    private int   collNum;
    private String headImg;
    private String createTime;
    public String check(){
        String  tip="";
        if(StringUtils.isEmpty(this.title)){
            tip="标题不能为空";
        }
        if(StringUtils.isEmpty(this.descStr)){
            tip="描述不能为空";
        }
        if(StringUtils.isEmpty(this.content)){
            tip="内容不能为空";
        }
        if(StringUtils.isEmpty(this.headImg)){
            tip="头图不能为空";
        }
        return tip;
    }
    public void setCreateTime(Date date){
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        this.createTime=simpleDateFormat.format(date);
    }

}
