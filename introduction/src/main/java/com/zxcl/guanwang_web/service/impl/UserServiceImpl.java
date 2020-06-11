package com.zxcl.guanwang_web.service.impl;

import com.zxcl.guanwang_web.dao.UserDao;
import com.zxcl.guanwang_web.entity.User;
import com.zxcl.guanwang_web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(value = "userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public User getUserByNameAndPwd(User user) {
        return userDao.getUserByNameAndPwd(user);
    }

    @Override
    public int findUserByAccount(String account) {
        return userDao.findUserByAccount(account);
    }
    @Transactional
    @Override
    public int saveUser(User user) {

       return userDao.insert(user);
    }
}
