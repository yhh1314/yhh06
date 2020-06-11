package com.zxcl.guanwang_web.controller.ueditor;

import com.zxcl.guanwang_web.config.PublicMsg;
import com.zxcl.guanwang_web.entity.Result;
import com.zxcl.guanwang_web.entity.User;
import com.zxcl.guanwang_web.utils.ImgCache;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UeditorController {
    private static final org.apache.log4j.Logger logger = Logger.getLogger(UeditorController.class);
    @Value(value = "${upload-path}")
    private String url;
    @RequestMapping(value="/ueditor")
    @ResponseBody
    public String ueditor(HttpServletRequest request) {

        return PublicMsg.UEDITOR_CONFIG;
    }

/*
    @RequestMapping(value="/imgUpload")
    @ResponseBody
    public Ueditor imgUpload(MultipartFile upfile) {
        Ueditor ueditor = new Ueditor();
        return ueditor;
    }
*/

    /**
     * 百度编辑器里上传图片及视频等
     * @param req
     * @return
     */
    @RequestMapping(value = "/imgUpload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<String,Object> save(HttpServletRequest req){
        Map<String,Object> rs = new HashMap<String, Object>();
        MultipartHttpServletRequest mReq  =  null;
        MultipartFile file = null;
        InputStream is = null ;
        String fileName = "";
        // 原始文件名   UEDITOR创建页面元素时的alt和title属性
        String originalFileName = "";
        String filePath = "";
        try {
            mReq = (MultipartHttpServletRequest)req;
            // 从config.json中取得上传文件的ID
            file = mReq.getFile("upfile");
            // 取得文件的原始文件名称
            fileName = file.getOriginalFilename();
            originalFileName = fileName;
            String path= req.getContextPath();
            //获取图片文件的后缀名
            String type = fileName.substring(fileName.lastIndexOf("."), fileName.length());
         /*   if(!type.contains("jpg") && !type.contains("png") &&!type.contains("jpeg") &&!type.contains("gif")&&!type.contains("bmp")){
                logger.error("上传图片格式不正确");
                rs.put("state", "文件上传失败!"); //在此处写上错误提示信息，这样当错误的时候就会显示此信息
                rs.put("url","");
                rs.put("title", "");
                rs.put("original", "");
                return rs;
            }*/
            //保存到服务器上的文件名
            String trueFileName=String.valueOf(System.currentTimeMillis())+type;
            //对外访问的路径,
            String picUrl=path+"/upload/"+trueFileName;
            File dir=new File(url);
            if(!dir.exists()){
                dir.mkdirs();
            }
            //图片保存到目录中，文件名为trueFileNmae
            file.transferTo(new File(url + trueFileName));
            String id=String.valueOf(((User)req.getSession().getAttribute("user")).getUserId());
            ArrayList<String> imgList=null;
            if(!ImgCache.imgMap.containsKey(id)){
                imgList =new ArrayList<>();
                ImgCache.imgMap.put(id,imgList);
            }else
                imgList=(ArrayList<String>) ImgCache.imgMap.get(id);
            imgList.add(trueFileName);

           logger.info(String.format("id为%s的用户存储了图片：%s",id,trueFileName));
           /* imgList=(ArrayList<String>) ImgCache.imgMap.get(id);//测试
            for (String img:imgList){
                System.out.println("本地存储的名字有："+img);
            }*/
            /*你的处理图片的代码*/
            rs.put("state", "SUCCESS");// UEDITOR的规则:不为SUCCESS则显示state的内容
            rs.put("url",path+"/upload/"+trueFileName);//能访问到你现在图片的路径
            rs.put("title", originalFileName);
            rs.put("original", originalFileName);

        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            rs.put("state", "文件上传失败!"); //在此处写上错误提示信息，这样当错误的时候就会显示此信息
            rs.put("url","");
            rs.put("title", "");
            rs.put("original", "");
        }
        return rs;
    }

    /**
     * 普通的图片上传
     * @param request
     * @param pic
     * @return
     */
    @RequestMapping(value="/uploadImg",method={RequestMethod.POST})
    public @ResponseBody Result uploadImg(HttpServletRequest request,MultipartFile pic){
        //获取图片原始文件名
        String originalFileName=pic.getOriginalFilename();
        //获取后缀
        String extension=originalFileName.substring(
                originalFileName.lastIndexOf("."), originalFileName.length());
        if(!extension.contains("jpg") && !extension.contains("png") && !extension.contains("jpeg") && !extension.contains("gif")&& !extension.contains("bmp")){
            logger.error("上传图片格式不正确");
            return new Result(Result.ERROR,"上传图片格式不正确");
        }
        File dir=new File(url);
        if(!dir.exists()){
            dir.mkdirs();
        }
        String trueFileName=System.currentTimeMillis()+extension;
        String path= request.getContextPath();
        String picUrl=path+"/upload/"+trueFileName;
        //上传图片
        try {
            pic.transferTo(new File(url + trueFileName));
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
            logger.error("图片保存异常");
        }
        return new Result(Result.SUCCESS,picUrl,trueFileName);
    }

}
