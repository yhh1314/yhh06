package com.zxcl.guanwang_web.utils;

import java.io.File;

public class FileUtils {

    public static final String PICTURE_JPG="jpg";
    public static final String PICTURE_PNG="jpg";
    /**
     *
     * @param type 文件类型（后缀名）
     * @return
     */
    public static  String getFileName(String type){
        String trueFileName=String.valueOf(System.currentTimeMillis());
        if(type.indexOf(".") != -1){
            return trueFileName+type;
        }else{
            return   trueFileName+"."+type;
        }

    }

    /**
     *删除文件
     * @param path 文件全路径名称
     * @return
     */
    public static void  delFile(String path){
        File file=new File(path);
        if(file.exists()){
            file.delete();
        }
    }
}
