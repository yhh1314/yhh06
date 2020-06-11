package com.zxcl.guanwang_web.service.impl;

import com.zxcl.guanwang_web.dao.CollectionDao;
import com.zxcl.guanwang_web.entity.Coll;
import com.zxcl.guanwang_web.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(value = "collectionService")
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionDao collectionDao;
    @Transactional
    @Override
    public void collNewsByNewsId(Coll coll) {
        collectionDao.insert(coll);
    }
}
