$(function () {
    $.jqPaginator('#pagination', {
        totalPages: 1,
        currentPage: 1,
        visiblePages: 5,
        first: '<li class="first"><a href="javascript:;">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        last: '<li class="last"><a href="javascript:;">末页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            search(num);
        }
    });
    search(1)
})
//渲染申请列表表格
function renderTable(datas) {
    var tableHtml = "";
    for (var i in datas) {
        tableHtml += "<li class=\"w-list-item f-clearfix\"><div class=\"w-list-pic\">";
        tableHtml += " <a href=\""+hostAddr+"getNews/"+datas[i].newsId+"\" target=\"_self\" class=\"w-list-piclink\">";
        tableHtml += " <img  style=\"width: auto; height: 118px; margin-left: -36.3517px;\"  class=\"w-listpic-in\" src=\""+hostAddr+"upload/"+datas[i].headImg+"\" autofill=\"ok\" init=\"ok\"> </a></div>";
        tableHtml += "<div class=\"w-list-r\"> <div class=\"w-list-r-in\"> <h3 class=\"w-list-title\">";
        tableHtml += "<a href=\""+hostAddr+"getNews/"+datas[i].newsId+"\" target=\"_self\" class=\"w-list-titlelink\" style=\"max-height: 24px;\">"+datas[i].title+"</a>\n</h3>";
        tableHtml += " <p class=\"w-list-desc \" style=\"max-height: 44px;\">"+datas[i].descStr+"</p>";
        tableHtml += "<div class=\"w-list-bottom clearfix \">";
        tableHtml += "<span class=\"w-list-viewnum \"><i class=\"w-list-viewicon mw-iconfont\">넶</i><span class=\"AR\" data-dt=\"nvc\" data-v=\"24977\">"+datas[i].readNum+"</span></span>";
        tableHtml += " <span class=\"w-list-date \">"+datas[i].createTime+"</span></div></div> </div> </li>";
       /* tableHtml += "<td>" + datas[i].scfLoanUseAge + "</td>";*/
    }

    $("#ulList_con_18_17").html(tableHtml);
}
//分页搜索
function search(pageIndex){
    var start=(pageIndex-1)*5;
    $.ajax({ url : hostAddr + "/getNewsList",
        type : "post",
        dataType : "json",
        data:{start:start,length:5},
        success : function(datas) {
            var data=datas.data;
            var str='';
            if(datas.recordsTotal>0){//有数据后动态修改分页配置
                $('#pagination').jqPaginator('option', {
                    totalCounts: datas.recordsTotal,
                    pageSize: 5,  //每页显示的数据量
                });
            }
            if(data.length>0){
                renderTable(data);
            }else{

                $('#pagination').jqPaginator('option', {
                    totalPages: 1
                });
                renderTable(data);
            }
        },
        error:function () {
            alert("获取数据失败");
        }
    });
}