package com.zxcl.guanwang_web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zxcl.guanwang_web.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<User> {
    public User getUserByNameAndPwd(User user);

    /**
     *
     * @param tel 电话号码
     * @return 用户数量
     */
    public int findUserByAccount(String tel);
}
