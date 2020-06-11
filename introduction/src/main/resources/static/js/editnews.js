
var id=window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);
console.log(id)
$(function () {
    $("#editNews").bind("click",function () {
        edit.editNews();
    })
    imgChange("headpic","uploadimg");
    //edit.uoloadImgBase64Str=pic;
})
var edit={
    uoloadImgBase64Str:"",
    editNews:function () {
        var title=$("#title").val();
        var descstr=$("#descstr").val();
        var content=UE.getEditor('editor').getContent();
        var headImg=this.uoloadImgBase64Str;
        if(title=="" || descstr=="" || content =="" ){
            alert("请检查所有项不为空")
            return;
        }
        //使用base64是因为uedtior的内容传值给后台后有些符号值会变化导致修改界面回显的不是html页面而是html文本，所以先转成base64存入然后显示的转码回来或者后台接收后解码
        var base64=new Base64();
        var data={
            newsId:id,
            title:title,
            descStr:descstr,
            content: base64.encode(content),
            headImg:headImg
        }

        $.post(hostAddr+"admin/edit",data,function (res) {
            if(res.code==0){
                alert(res.msg);
                window.location.href=hostAddr+"admin/tables"
            }else
                alert(res.msg)
        });

    },
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
            edit.uoloadImgBase64Str = base64Str.slice(startNum);
            console.log("startNum"+startNum);
            //临时存储二进制流
            $('#'+imgId).attr("src", this.result);
            AutoSize( $('#'+imgId),150,90);
        }
    });
}