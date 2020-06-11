package com.zxcl.guanwang_web.controller.news;


import com.zxcl.guanwang_web.entity.*;
import com.zxcl.guanwang_web.service.CollectionService;
import com.zxcl.guanwang_web.service.NewsService;
import com.zxcl.guanwang_web.utils.FileUtils;
import com.zxcl.guanwang_web.utils.ImageBaseUtils;
import com.zxcl.guanwang_web.utils.ImgCache;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

@Api(value = "新闻模块")
@Controller
public class NewsController {
    private static final org.apache.log4j.Logger logger = Logger.getLogger(NewsController.class);
    @Autowired(required = true)
    private NewsService newsService;
    @Autowired(required = true)
    private CollectionService collectionService;
    @Value("${upload-path}")
    private String url;

    @ApiOperation(value = "查询新闻分页列表",notes = "分页数据")
    @PostMapping("/getNewsList")
    @ResponseBody
    public DataTable<News> getNewsPageList(PageCondition page){
        DataTable<News> result= newsService.getNewsPageList(page);
       return  result;
    }
    @ApiOperation(value = "查询一条新闻并跳转页面")
    @GetMapping("/getNews/{newsId}")
    public String getNewsById(@PathVariable("newsId") Integer newsId, Model model){
        News news=newsService.getNewsById(newsId);

        model.addAttribute("news",news);
        return "/common/news.html";
    }

    @ApiOperation(value = "修改一条新闻")
    @GetMapping("/admin/editPage/{newsId}")
    public String editPage(@PathVariable("newsId") Integer newsId, Model model){
        News news=newsService.getNewsById(newsId);
        model.addAttribute("news",news);
        return "/admin/editnews.html";
    }
    @ApiOperation(value = "修改提交")
    @PostMapping("/admin/edit")
    @ResponseBody
    public Result edit(News news,HttpServletRequest  req){
        News storenews=newsService.getNewsById(news.getNewsId());
        if(storenews !=null){
            news.setReadNum(storenews.getReadNum());
            news.setCollNum(storenews.getCollNum());

            //先将base64字符串转为图片，数据库存储图片名字既可
            if(!StringUtils.isEmpty(news.getHeadImg())){
                String name=FileUtils.getFileName(FileUtils.PICTURE_JPG);
                String path=url+name;
                ImageBaseUtils.generateImage(news.getHeadImg(),path);
                news.setHeadImg(name);
            }else{
                news.setHeadImg(storenews.getHeadImg());
            }

            newsService.updateNewsById(news);
            String content=news.getContent();
      /*      BASE64Decoder decoder = new BASE64Decoder();
            try {
                byte []arry=decoder.decodeBuffer(content);
                content=new String(arry,"utf8");
            } catch (IOException e) {
                e.printStackTrace();
            }*/
            content=ImageBaseUtils.decodeBase64(content);
            String id=String.valueOf(((User)req.getSession().getAttribute("user")).getUserId());
            //ArrayList<String> list=(ArrayList)session.getAttribute("imgList");

            ArrayList<String> list=(ArrayList)ImgCache.imgMap.get(id);
            //如果不包含的 图片就删掉
            if(list != null){
                for (String li:list){
                    if(!content.contains(li)){
                        FileUtils.delFile(url+li);
                        logger.info(String.format("为id为%s的用户自动删除了未提交的图片:%s",id,li));
                    }

                }
                //session.removeAttribute("imgList");
                ImgCache.imgMap.get(id).clear();
            }
            return new Result(Result.SUCCESS,"更新成功");
        }
        return new Result(Result.ERROR,"更新内容不存在");
    }
    @ApiOperation(value = "删除一条新闻")
    @GetMapping("/admin/delOne/{newsId}")
    @ResponseBody
    public Result delOne(@PathVariable("newsId") Integer newsId){
        News news=newsService.getNewsById(newsId);
        if(news !=null){
            newsService.delOne(newsId);//删除新闻未删除对应的头图和新闻内容中的图片

            return new Result(Result.SUCCESS,"删除成功");
        }
        return new Result(Result.ERROR,"删除内容不存在");
    }
    @ApiOperation(value = "收藏新闻")
    @GetMapping("/colletionNews/{newsId}")
    @ResponseBody
    @LoginRequired
    public Result colletionNews(@PathVariable("newsId") Integer newsId, HttpServletRequest req){
        News news=newsService.getNewsById(newsId);
        User user=(User)req.getSession().getAttribute("user");

        if(news != null){
            Coll c=new Coll();
            c.setNewsId(news.getNewsId());
            c.setCrtTime(new Date());
            c.setUserId(user.getUserId());
            collectionService.collNewsByNewsId(c);
            return new Result(Result.SUCCESS,"收藏成功");
        }
        return new Result(Result.ERROR,"收藏失败");

    }
    @ApiOperation(value = "添加新闻")
    @PostMapping("/admin/addNews")
    @ResponseBody
    public Result addNews(News news, HttpSession session){
        String tip=news.check();
        if(!StringUtils.isEmpty(tip)){
            return new Result(Result.ERROR,"请检查所有项不能为空");
        }
        String name=FileUtils.getFileName(FileUtils.PICTURE_JPG);
        String path=url+name;
        try {
            //先将base64字符串转为图片，数据库存储图片名字既可
            ImageBaseUtils.generateImage(news.getHeadImg(),path);
            news.setHeadImg(name);
            news.setCollNum(0);
            news.setReadNum(0);
            news.setCreateTime(new Date());
            newsService.insertNews(news);
        }catch (Exception e){
            logger.error("添加新闻失败");
            e.printStackTrace();
            FileUtils.delFile(path);
            return new Result(Result.ERROR,"添加新闻失败");
        }
        String id=String.valueOf(((User)session.getAttribute("user")).getUserId());
        String content=news.getContent();
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte []arry=decoder.decodeBuffer(content);
            content=new String(arry,"utf8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        //ArrayList<String> list=(ArrayList)session.getAttribute("imgList");
        ArrayList<String> list=(ArrayList<String>)ImgCache.imgMap.get(id);
        //如果不包含的 图片就删掉
        if(list != null){
            for (String li:list){
                if(!content.contains(li)){
                    FileUtils.delFile(url+li);
                    logger.info(String.format("为id为%s的用户自动删除了未提交的图片:%s",id,li));
                }

            }
            //session.removeAttribute("imgList");
            ImgCache.imgMap.get(id).clear();
        }

        return new Result(Result.SUCCESS,"添加成功");
    }
}
