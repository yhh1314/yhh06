package com.zxcl.guanwang_web.utils;

import com.zxcl.guanwang_web.entity.IPentity;

import java.util.List;

public class UsersProvider {
    public String insertListSql(List<IPentity> list) {
        StringBuffer sqlList = new StringBuffer();

        sqlList.append(" INSERT INTO wwp_temp VALUES ");
        for (int i = 0; i < list.size() ; i++) {
            IPentity user = list.get(i);
            if(user.getTtime()==null){
                sqlList.append(" ('").append(user.getTarea()).append("',").append("'").append(user.getTip()).append("',").append(user.getTtime())
                       .append(")");
            }else{
                sqlList.append(" ('").append(user.getTarea()).append("',").append("'").append(user.getTip()).append("',").append("'").append(user.getTtime())
                        .append("'").append(")");
            }

            if (i < list.size()-1) {
                sqlList.append(",");
            }
        }
        return sqlList.toString();
    }


}
