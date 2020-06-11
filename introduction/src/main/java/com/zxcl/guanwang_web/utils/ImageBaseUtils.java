package com.zxcl.guanwang_web.utils;

import sun.misc.BASE64Decoder;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class ImageBaseUtils {

         /**
          * 对字节数组字符串进行Base64解码并生成图片
          * @param imgStr 图片数据
          * @param imgFilePath 保存图片全路径地址
          * @return
          */
    public static boolean generateImage(String imgStr, String imgFilePath) {
        if (imgStr == null) // 图像数据为空
            return false;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
        // Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }
            // 生成jpg图片
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public static String decodeBase64(String content){
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte []arry=decoder.decodeBuffer(content);
            content=new String(arry,"utf8");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return content;
    }

}
