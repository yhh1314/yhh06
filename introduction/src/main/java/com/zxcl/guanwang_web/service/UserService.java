package com.zxcl.guanwang_web.service;

import com.zxcl.guanwang_web.entity.User;

public interface UserService {
    public User getUserByNameAndPwd(User user);
    public int findUserByAccount(String account);

    public int saveUser(User user);
}
