package com.zxcl.guanwang_web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zxcl.guanwang_web.entity.IPentity;
import com.zxcl.guanwang_web.utils.UsersProvider;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IPtest extends BaseMapper<IPentity> {
    @InsertProvider(type = UsersProvider.class, method = "insertListSql")
    public void sqlInsert(List<IPentity> list);

}
