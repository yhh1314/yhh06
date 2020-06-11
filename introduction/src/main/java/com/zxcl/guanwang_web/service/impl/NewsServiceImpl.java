package com.zxcl.guanwang_web.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zxcl.guanwang_web.dao.NewsDao;
import com.zxcl.guanwang_web.entity.DataTable;
import com.zxcl.guanwang_web.entity.News;
import com.zxcl.guanwang_web.entity.PageCondition;
import com.zxcl.guanwang_web.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(value = "newsService")
public class NewsServiceImpl implements NewsService {
    @Autowired(required = true)
    private NewsDao newsDao;

    /**
     * 返回自定义对象
     * @param condition
     * @return
     */
    @Override
    public DataTable<News> getNewsPageList(PageCondition condition) {
        Page<News> p = new Page<>(condition.getPage(), condition.getLength());
        QueryWrapper<News> entityWrapper = new QueryWrapper<News>();
        entityWrapper.orderByDesc("create_time");
        IPage<News> page=newsDao.selectPage(p,entityWrapper);
        condition.setRecordsTotal((int)page.getTotal());
        DataTable<News> dataTable=new DataTable(condition,page.getRecords());

        // PageResult<News> res=new PageResult<News>(condition,page.getRecords());
        return dataTable;
    }

    @Override
    public News getNewsById(long id) {
        //更新改条新闻被查看次数
        this.updateNewsById(id);
        return newsDao.selectById(id);

    }

    @Override
    @Transactional
    public void updateNewsById(long id) {
        newsDao.updateNewsScan(id);

    }
    @Override
    @Transactional
    public void insertNews(News news){
        newsDao.insert(news);
    }

    @Override
    @Transactional
    public void updateNewsById(News news) {
        newsDao.updateById(news);
    }

    @Override
    @Transactional
    public void delOne(long id) {
        newsDao.deleteById(id);
    }

}
