package com.zxcl.guanwang_web.service;

import com.zxcl.guanwang_web.entity.DataTable;
import com.zxcl.guanwang_web.entity.News;
import com.zxcl.guanwang_web.entity.PageCondition;

public interface NewsService {
    public DataTable<News> getNewsPageList(PageCondition condition);
    public News getNewsById(long id);
    public void updateNewsById(long id);
    public void insertNews(News news);
    public void updateNewsById(News news);
    public void delOne(long id);

}
