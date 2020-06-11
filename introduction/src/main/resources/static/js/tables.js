
var dataTable;
var newsTable={
     lang: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
         "sZeroRecords": "没有匹配结果",
         "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
         "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
         "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
         "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    },
    init:function () {
        //初始化表格
        var _this=this;
        dataTable = $("#newsList").dataTable({
            language:_this.lang,  //提示信息
            autoWidth: false,  //禁用自动调整列宽
            stripeClasses: ["odd", "even"],  //为奇偶行加上样式，兼容不支持CSS伪类的场合
            processing: true,  //隐藏加载提示,自行处理
            serverSide: true,  //启用服务器端分页
            searching: false,  //禁用原生搜索
            orderMulti: false,  //启用多列排序
            order: [[1, 'asc']],
           bLengthChange:true,//每页多少条框体
            dom: '<f<t>lip>',//控制显示的位置
            renderer: "bootstrap",  //渲染样式：Bootstrap和jquery-ui
            pagingType: "full",  //分页样式：simple,simple_numbers,full,full_numbers
            ordering : false,
            columnDefs: [{
                "targets": 'nosort',  //列的样式名
                "orderable": false    //包含上样式名‘nosort’的禁止排序
            }],
            ajax: function (data, callback, settings) {
                //封装请求参数
                console.log(data);
                var param = {};
                param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                param.start = data.start;//开始的记录序号
                param.draw = data.draw;//开始的记录序号
                /* param.page = (data.start / data.length)+1;//当前页码
                 param.order = data.order[0]*/
                //console.log(param);
                //ajax请求数据
                $.ajax({
                    type: "POST",
                    url: hostAddr+"getNewsList",
                    cache: false,  //禁用缓存
                    data: param,  //传入组装的参数
                    dataType: "json",
                    success: function (result) {
                        //后台已经 封装好数据格式，如果格式不一样就封装返回数据
                      /*  var returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                        returnData.recordsFiltered = result.recordsFiltered;//后台不实现过滤功能，每次查询均视作全部结果
                        returnData.data = result.data;//返回的数据列表*/
                        callback(result);

                    }
                });
            },
            //列表表头字段
            columns: [
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row, meta) {
                        // 显示行号
                        var startIndex = meta.settings._iDisplayStart;
                        return startIndex + meta.row + 1;
                    },
                    width:"10%",
                },
                {"data": "headImg", render:function (data) {
                        return "<img width='60' height='36' src="+hostAddr+"upload/"+data+">";
                    },  bSortable: false, width:"15%",
                },
                { "data": "title",  bSortable: false , width:"30%",},
                { "data": "readNum" ,  bSortable: false, width:"10%",},
                { "data": "createTime",  bSortable: false, width:"20%", },
                {
                    data: null,
                    bSortable: false,
                    render: function (data, type, row, meta) {
                        return "<a href='javascript:newsTable.editPage("+row.newsId+");' style='color: #0b6cbc'>修改</a>&nbsp;&nbsp;<a href='javascript:newsTable.delOne("+row.newsId+");' style='color: red'>删除</a>";
                    }, width:"15%",
                },
            ],
            infoCallback: function(settings,start,end,max,total,pre) {
                var api = this.api();
                var pageInfo = api.page.info();
                return "共"+pageInfo.pages +"页,当前显示"+ start + "到" + end + "条记录" + ",共有"+ total + "条记录";
            }
        }).api();//此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
    },
    delOne:function (id) {
         var flat=confirm("确认删除改条新闻吗");
         if(!flat){
             return;
         }

        $.get(hostAddr+"admin/delOne/"+id,function (res) {
            if(res.code==0){
                alert("删除成功")
                window.location.href=hostAddr+"/admin/tables"
            }else{
                alert("删除失败！")
            }

        });
    },
    editPage:function (id) {
        window.location.href=hostAddr+"/admin/editPage/"+id
    },
}

$(function () {
    newsTable.init();
});