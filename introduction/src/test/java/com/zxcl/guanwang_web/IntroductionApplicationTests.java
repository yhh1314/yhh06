package com.zxcl.guanwang_web;

import com.zxcl.guanwang_web.dao.IPtest;
import com.zxcl.guanwang_web.entity.IPentity;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@SpringBootTest
class IntroductionApplicationTests {
    @Autowired
    private IPtest iPtest;
    @Autowired
    SqlSessionFactory sqlSessionFactory;






    @Test
    void contextLoads() {
    }
    //最慢
/*    @Test
    public void test1(){
        String area="成都";
        for(int i=0;i<3865;i++){
            String ip=com.zxcl.guanwang_web.Test.getRandomIp();
            IPentity ipe=new IPentity();
            ipe.setTarea(area);
            ipe.setTip(ip);
            iPtest.insert(ipe);

        }


    }*/
    //批量插入，速度一般
/*    @Test
    public void batchInsert() {
        List<IPentity> list = new ArrayList<>();
        String area="成都";
        SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        IPtest mapper = sqlSession.getMapper(IPtest.class);
        for(int i=0;i<10000;i++){
            String ip=com.zxcl.guanwang_web.Test.getRandomIp();
            IPentity ipe=new IPentity();
            ipe.setTarea(area);
            ipe.setTip(ip);
            list.add(ipe);
        }
        int batchCount = 1000;//提交数量,到达这个数量就提交
        for (int i = 0; i < list.size(); i++) {
            mapper.insert(list.get(i));
            if (i != 0 && i % batchCount == 0) {
                sqlSession.flushStatements();
//                sqlSession.commit();
//                sqlSession.clearCache();
            }
        }
//        sqlSession.commit();
//        sqlSession.clearCache();
        sqlSession.flushStatements();



    }*/
    //速度最快
    @Test
    public void sqlInsert() {
        HashMap<String,Object> map=new HashMap<>();
       // map.put("2020-04-25",30);
        map.put("2020-04-26",6825);
        map.put("2020-04-27",6825);
        map.put("2020-04-28",6825);
        map.put("2020-04-29",6825);
        map.put("2020-04-30",6825);
        map.put("2020-05-01",6825);
        map.put("2020-05-02",6825);
        map.put("2020-05-03",6825);
        map.put("2020-05-04",6825);
        map.put("2020-05-05",6825);
        map.put("2020-05-06",6825);
        map.put("2020-05-07",6825);
        map.put("2020-05-08",6825);
        map.put("2020-05-09",6825);
        map.put("2020-05-10",6825);
        map.put("2020-05-11",6825);
        map.put("2020-05-12",6825);
        map.put("2020-05-13",6825);
        map.put("2020-05-14",6825);
        //map.put("2020-05-15",30);
        Set<String> set=map.keySet();
        for(String item:set){
            int num=Integer.parseInt(map.get(item).toString());
            List<IPentity> list=getList("资阳",item,num);
            iPtest.sqlInsert(list);
        }



    }
    public String getMonth(int month){
        String str=String.valueOf(month);
        if(str.length()<=1){
            str="0"+str;
        }
        return str;
    }

    /**
     *
     * @param area 地区
     * @param dateStr 时间（不带时分秒） 格式如：2020-01-05
     * @param clickNum
     * @return
     */
    public List<IPentity> getList(String area,String dateStr,int clickNum){
        List<IPentity> list = new ArrayList<>();
        for(int i=0;i<clickNum;i++){
            String ip=com.zxcl.guanwang_web.Test.getRandomIp(area);
            IPentity ipe=new IPentity();
            ipe.setTarea(area);
            ipe.setTip(ip);
            //"yyyy-MM-dd HH:mm:ss"
           ipe.setTtime(dateStr+" "+getHMS());
            list.add(ipe);

        }
        return list;
    }

    public String getHMS(){

        String hour=(int)(7+Math.random()*(14))+"";
        if(hour.length()<=1){
            hour="0"+hour;
        }
        String min=(int)(10+Math.random()*(49))+"";
        if(min.length()<=1){
            min="0"+min;
        }
        String sec=(int)(10+Math.random()*(49))+"";
        if(sec.length()<=1){
            sec="0"+sec;
        }
        return hour+":"+min+":"+sec;

    }

}
