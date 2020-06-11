package com.zxcl.guanwang_web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zxcl.guanwang_web.entity.News;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NewsDao  extends BaseMapper<News> {


    void updateNewsScan(long id);
}
