/*
jqueryvalidator验证:
1.jquery.validator.js已经被邵巍改写过了，所以只能使用当前版本
2.添加一个验证方法如 "check_input"
    jQuery.validator.addMethod("check_input", function (value, element, parameters) {
        return true/false;
    }
3.在控件的FormDataModel.ValidateModel.CustomValTypeName字段赋值，则会使用该验证方法验证
4.验证方法请使用全小写，请使用"_"进行分词，如checkInput请写成"check_input"
5.如果是使用required进行验证的话会自动识别验证方法required_formcontroltype(如formtext的required验证就是required_formtext)
    *

*/

//required validator
jQuery.validator.addMethod("required_formtext", function (value, element) {
    if (element.nodeName.toLowerCase() === "select") {
        // could be an array for select-multiple or a string, both are fine this way
        var val = $(element).val();
        return val && val.length > 0;
    }
    if (this.checkable(element)) {
        return this.getLength(value, element) > 0;
    }
    return $.trim(value).length > 0;
});
jQuery.validator.addMethod("required_matrix", function (value, element) {
    var rows = $(element).find('.matrixRow');
    var isOk = true;
    rows.each(function (i) {
        var len = $(this).find("input:checked").length;
        if (len == 0) {
            isOk = false;
            return false;
        }
    });
    return isOk;
});
jQuery.validator.addMethod("required_formaddress", function (value, element, required) {
    var val = $.trim(value);
    var detail = $("#" + element.id + "_detail");
    var detailvalid = true;
    if (detail.length > 0) {
        var detailval = $.trim($("#" + element.id + "_detail").val());
        detailvalid = detailval.length > 0;
    }
    var isOk = val.length > 0 && detailvalid;
    if (!isOk) {
        if (detail.length > 0) {
            detail.parent().toggleClass("error", !detailvalid);
        }
    }

    return isOk;
});
jQuery.validator.addMethod("required_formupload", function (value, element) {
    var hasInQueue = $(element).attr("data-queue") == "true";
    if (hasInQueue) {
        alert("当前有文件正在上传，请稍后提交！");
        return false;
    }
    return $.trim(value).length > 0;
});
jQuery.validator.addMethod("mobile", function (value, element) {
    var val = $.trim(value);
    var isOk = /^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(val);
    return isOk || (val.length == 0);
});
jQuery.validator.addMethod("identitycard", function (value, element) {
    var val = $.trim(value);
    var isOk = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(val);
    return isOk || (val.length == 0);
});
jQuery.validator.addMethod("qq", function (value, element) {
    var val = $.trim(value);
    var isOk = /(^[1-9][0-9]{4,}$)/.test(val);
    return isOk || (val.length == 0);
});
jQuery.validator.addMethod("chinese", function (value, element) {
    var val = $.trim(value);
    var isOk = /(^[\u4e00-\u9fa5]*$)/.test(val);
    return isOk || (val.length == 0);
});
jQuery.validator.addMethod("english", function (value, element) {
    var val = $.trim(value);
    var isOk = /(^[A-Za-z\s]*$)/.test(val);
    return isOk || (val.length == 0);
});
jQuery.validator.addMethod("formcheckbox", function (value, element) {
    var $me = this;
    var minselectitem = $(element).attr("minselectitem");
    minselectitem = parseInt(minselectitem);
    var maxselectitem = $(element).attr("maxselectitem");
    maxselectitem = parseInt(maxselectitem);
    var isRequired = $(element).attr("isrequired");

    var answerLength = 0;
    var parentElement = $(element).parent();
    $(parentElement).find(".w-checkbox-item").each(function () {
        if ($(this).hasClass("checked")) {
            answerLength = answerLength + 1;
        }
    });
    if (answerLength == 0)
    {
        if (isRequired == "0") //如果没有选择且非必填 直接返回
        {
            return true;
        }
    }
    if (answerLength < minselectitem) {
        var message = $.validator.messages["formcheckboxmin"];
        $me.settings.messages[element.name] = $.validator.format(message, minselectitem);
        return false;
    }
    if (answerLength > maxselectitem) {
        var message = $.validator.messages["formcheckboxmax"];
        $me.settings.messages[element.name] = $.validator.format(message, maxselectitem);
        return false;
    }
    return true;
});

jQuery.validator.addMethod("required_formimgradio", function (value, element) {
    var isValidate = false;
    var parentElement = $(element).parent();
    $(parentElement).find(".w-radio-item").each(function () {
        if ($(this).hasClass("checked"))
        {
            isValidate = true;
        }
    });
    return isValidate;
});

jQuery.validator.addMethod("required_formradio", function (value, element) {
    var isValidate = false;
    var parentElement = $(element).parent();
    $(parentElement).find(".w-radio-item").each(function () {
        if ($(this).hasClass("checked")) {
            isValidate = true;
        }
    });
    return isValidate;
});

jQuery.validator.addMethod("required_formimgcheckbox", function (value, element) {
    var isValidate = false;
    var parentElement = $(element).parent();
    $(parentElement).find(".w-checkbox-item").each(function () {
        if ($(this).hasClass("checked")) {
            isValidate = true;
        }
    });
    return isValidate;
});

jQuery.validator.addMethod("required_formcheckbox", function (value, element) {
    var isValidate = false;
    var parentElement = $(element).parent();
    $(parentElement).find(".w-checkbox-item").each(function () {
        if ($(this).hasClass("checked")) {
            isValidate = true;
        }
    });
    return isValidate;
});
