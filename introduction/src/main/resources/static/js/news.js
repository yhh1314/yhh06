/**
 * 新闻页面js
 */
var modal;
$(function () {
    news.bindEvent();

})
var news={
    uoloadImgBase64Str:"",
    enable:true,
    addNews:function () {
        var self=this;
        if(!self.enable){
            return;
        }
        self.enable=false;
        var title=$("#title").val();
        var descstr=$("#descstr").val();
        var content=UE.getEditor('editor').getContent();
        var headImg=this.uoloadImgBase64Str;
        if(title=="" || descstr=="" || content =="" ||headImg=="" ){
            alert("请检查所有项不为空")
            self.enable=true;
            return;
        }
        var base64=new Base64();
        var data={
            title:title,
            descStr:descstr,
            content: base64.encode(content),
            headImg:headImg
        }

        $.post(hostAddr+"/admin/addNews",data,function (res) {
            if(res.code==0){
                alert(res.msg);
                self.enable=true;
                window.location.href=hostAddr+"/admin/tables"
            }else{
                self.enable=true;
                alert(res.msg)
            }

        });

    },
    delNews:function () {
        
    },
    editNews:function () {
        
    },
    bindEvent:function () {
        var _this=this;
        $("#addNews").bind("click",function () {
            _this.addNews();
        })
      //监听头图改变时的操作
        imgChange("headpic","uploadimg");

    }
    
}

/**
 *
 * @param inputId file input框的id
 * @param imgId 预览图片的img id
 */
function imgChange(inputId,imgId){
    var fileInput = document.getElementById(inputId);
    //选择文件
    fileInput.addEventListener('change', function() {
        //如果未传入文件则中断
        if(fileInput.files[0] == undefined) {
            return;
        }

        var file = fileInput.files[0];

        //FileReader可直接将上传文件转化为二进制流
        var reader = new FileReader();
        reader.readAsDataURL(file); //
        reader.onload = function() { //完成后this.result为二进制流
            console.log(this.result);
            //页面显示文件名
            var base64Str = this.result;
            var startNum = base64Str.indexOf("base64,");
            startNum = startNum * 1 + 7;
            //去除前部格式信息（如果有需求）
            news.uoloadImgBase64Str = base64Str.slice(startNum);
            console.log("startNum"+startNum);
            //临时存储二进制流
            $('#'+imgId).attr("src", this.result);
            AutoSize( $('#'+imgId),150,90);
        }
    });
}

