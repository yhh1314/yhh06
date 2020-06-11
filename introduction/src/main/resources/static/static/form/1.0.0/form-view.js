var xnForm;
(function (xnForm) {
    var isMobile = (function () {
        var userAgentInfo = navigator.userAgent,
            Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
            flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return !flag;
    }());
    xnForm.isMobile = isMobile;
    var address = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            arrCity: [],
            callback: function () { }
        };
        option = $.extend({}, defaultoption, option);
        if (option.selector == "") {
            throw "none selector";
            return;
        }
        var context = {};
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        function mobileSelect() {
            var ms = new MobileSelect({
                trigger: context.option.selector,
                title: '地区选择',
                wheels: [
                    {
                        data: context.option.arrCity
                    }
                ],
                keyMap: {
                    id: 'type',
                    value: 'name',
                    childs: 'sub'
                },
                onShow: function () {
                    $("#smv_Main").height($("#smv_Main").height() + 200);
                    $("body").on("touchmove", function (event) {
                        event.preventDefault;
                    }, false)
                },
                onHide: function () {
                    $("#smv_Main").height($("#smv_Main").height() - 200);
                    $("body").off("touchmove");
                },
                callback: function (indexArr, data) {
                    context.wrapper.find(".errMsg").hide();
                    context.wrapper.find(".error").removeClass("error");
                    context.option.callback(indexArr, data);
                }
            })
        }
        context.mobileSelect = mobileSelect;
        function pcSelect() {
            var toggleList = function () {
                context.wrapper.find(".w-address-list").toggle();
                var margintop = context.wrapper.find(".w-address-listinput").outerHeight(true) - parseInt(context.wrapper.find(".w-address-listinput").css("border-width"));
                context.wrapper.find(".w-address-list").css("margin-top", margintop);
            }
            context.selector.parent().click(toggleList);
            context.wrapper.find(".form-control-mask").click(toggleList);
            var wheels = context.wrapper.find(".w-address-list-content");
            var titles = context.wrapper.find(".w-address-list-title");
            function showCity() {
                wheels.find(".w-address-content-item:eq(1)").html("");
                var provinceindex = parseInt(wheels.find(".w-address-content-item:eq(0)").attr("eid")) || 0;
                wheels.find(".w-address-content-item:eq(1)").removeAttr("eid");
                var province = context.option.arrCity[provinceindex];
                if (!province.sub || province.sub.length == 0) {
                    return;
                }
                for (var i = 0; i < province.sub.length; i++) {
                    var item = province.sub[i];
                    var classinner = item.type == undefined ? "leaf" : "";
                    if (item.name == "请选择") {
                        classinner = "f-hide";
                    }
                    wheels.find(".w-address-content-item:eq(1)").append('<div class="w-address-content-inner ' + classinner + '" style="width: 25%;"><a href="javascript:;">' + item.name + '</a></div>');
                }
                if (province.sub.length == 1) {
                    wheels.find(".w-address-content-item:eq(1)").find(".w-address-content-inner").click();
                }
            }
            function showArea() {
                wheels.find(".w-address-content-item:eq(2)").html("");
                var provinceindex = parseInt(wheels.find(".w-address-content-item:eq(0)").attr("eid")) || 0;
                var province = context.option.arrCity[provinceindex];
                if (!province.sub || province.sub.length == 0) {
                    return;
                }
                var cityindex = parseInt(wheels.find(".w-address-content-item:eq(1)").attr("eid")) || 0;
                var city = province.sub[cityindex];
                if (!city.sub || city.sub.length == 0) {
                    return;
                }
                for (var i = 0; i < city.sub.length; i++) {
                    var item = city.sub[i];
                    var classinner = item.type == undefined ? "leaf" : "";
                    if (item.name == "请选择") {
                        classinner = "f-hide";
                    }
                    wheels.find(".w-address-content-item:eq(2)").append('<div class="w-address-content-inner ' + classinner + '" style="width: 25%;"><a href="javascript:;">' + item.name + '</a></div>');
                }
            }
            var province = context.option.arrCity[0];
            wheels.find(".w-address-content-item:eq(0)").html("");
            for (var i = 0; i < context.option.arrCity.length; i++) {
                var item = context.option.arrCity[i];
                var classinner = item.type == undefined ? "leaf" : "";
                if (item.name == "请选择") {
                    classinner = "f-hide";
                }
                wheels.find(".w-address-content-item:eq(0)").append('<div class="w-address-content-inner ' + classinner + '" style="width: 25%;"><a href="javascript:;">' + item.name + '</a></div>');
            }
            titles.on("click", ".w-address-title-item:eq(0)", function () {
                titles.find(".w-address-title-item:eq(0)").addClass("current").siblings().removeClass("current")
                wheels.find(".w-address-content-item:eq(0)").addClass("current").siblings().removeClass("current")
            });
            titles.on("click", ".w-address-title-item:eq(1)", function () {
                var eid = wheels.find(".w-address-content-item:eq(0)").attr("eid");
                if (!eid) {
                    return;
                }
                titles.find(".w-address-title-item:eq(1)").addClass("current").siblings().removeClass("current")
                wheels.find(".w-address-content-item:eq(1)").addClass("current").siblings().removeClass("current")
            });
            titles.on("click", ".w-address-title-item:eq(2)", function () {
                var eid = wheels.find(".w-address-content-item:eq(1)").attr("eid");
                if (!eid) {
                    return;
                }
                titles.find(".w-address-title-item:eq(2)").addClass("current").siblings().removeClass("current");
                wheels.find(".w-address-content-item:eq(2)").addClass("current").siblings().removeClass("current");
            });
            wheels.on("click", ".w-address-content-item:eq(0) >.w-address-content-inner", function () {
                wheels.find(".w-address-content-item:eq(0)").attr("eid", $(this).index());
                if ($(this).hasClass("leaf")) {
                    return;
                }
                titles.find(".w-address-title-item:eq(1)").addClass("current").siblings().removeClass("current");
                wheels.find(".w-address-content-item:eq(1)").addClass("current").siblings().removeClass("current");
                showCity();
            });
            wheels.on("click", ".w-address-content-item:eq(1) >.w-address-content-inner", function () {
                wheels.find(".w-address-content-item:eq(1)").attr("eid", $(this).index());
                if ($(this).hasClass("leaf")) {
                    return;
                }
                titles.find(".w-address-title-item:eq(2)").addClass("current").siblings().removeClass("current");
                wheels.find(".w-address-content-item:eq(2)").addClass("current").siblings().removeClass("current");
                showArea();
            });
            wheels.on("click", ".w-address-content-inner.leaf", function () {
                var area = $(this).text();
                var address = area;
                var provinceindex = parseInt(wheels.find(".w-address-content-item:eq(0)").attr("eid")) || 0;
                var province = context.option.arrCity[provinceindex];
                if (province.sub && province.sub.length > 0) {
                    var cityindex = parseInt(wheels.find(".w-address-content-item:eq(1)").attr("eid")) || 0;
                    var city = province.sub[cityindex];
                    if (province.name != city.name) {
                        address = city.name + " " + address;
                    }
                }
                if (province.name != area) {
                    address = province.name + " " + address;
                }
                context.selector.val(address).click();
                context.wrapper.find(".errMsg").hide();
                context.wrapper.find(".error").removeClass("error");
            });
        }
        context.pcSelect = pcSelect;
        context.select = function () {
            if (xnForm.isMobile) {
                mobileSelect();
            } else {
                pcSelect();
            }
        }
        context.select();
        return context;
    }
    xnForm.address = address;
    var upload = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            errSelector: "",
            arrCity: [],
            callback: function () { }
        };
        option = $.extend({}, defaultoption, option);
        var context = {};
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errSelector = $(context.option.errSelector);
        //小程序上传需要取siteid
        var siteId = getQueryString("siteId");
        var uploader = WebUploader.create({
            auto: true,
            swf: "/static/webuploader/0.1.5/Uploader.swf",
            server: "/FormRunTime/BatchUpload?siteId=" + siteId,
            pick: context.option.selector + "_uploader",
            resize: false,
            fileSingleSizeLimit: 10 * 1024 * 1024,  // 10 M
            fileNumLimit: 5
        });
        function getFileIco(filetype) {
            var imgName;
            switch (filetype) {
                case "mp3":
                case "cd":
                case "wav":
                case "aiff":
                case "au":
                case "wma":
                case "ogg":
                case "mp3pro":
                case "real":
                case "ape":
                case "module":
                case "midi":
                case "vqf":
                case "flac":
                    imgName = "audio.png";
                    break;
                case "ini":
                case "config":
                case "conf":
                    imgName = "conf.png";
                    break;
                case "xls":
                case "xlsx":
                    imgName = "excel.png";
                    break;
                case "cs":
                case "apk":
                    imgName = "file.png";
                    break;
                case "html":
                case "htm":
                    imgName = "html.png";
                    break;
                case "png":
                case "jpg":
                case "jpeg":
                case "ico":
                case "bmp":
                case "gif":
                case "psd":
                case "raw":
                case "tiff":
                case "pcx":
                case "tga":
                case "exif":
                case "fpx":
                case "svg":
                case "cdr":
                case "pcd":
                case "dxf":
                case "ufo":
                case "eps":
                case "ai":
                case "hdri":
                    imgName = "img.png";
                    break;
                case "eml":
                    imgName = "mail.png";
                    break;
                case "pdf":
                    imgName = "pdf.png";
                    break;
                case "ppt":
                case "pptx":
                    imgName = "ppt.png";
                    break;
                case "txt":
                    imgName = "txt.png";
                    break;
                case "avi":
                case "rmvb":
                case "rm":
                case "asf":
                case "divx":
                case "mpg":
                case "mpeg":
                case "mpe":
                case "wmv":
                case "mp4":
                case "mkv":
                case "vob":
                case "swf":
                case "flv":
                    imgName = "video.png";
                    break;
                case "doc":
                case "docx":
                    imgName = "word.png";
                    break;
                case "zip":
                case "rar":
                case "7z":
                    imgName = "zip.png";
                    break;
                default:
                    imgName = "unknown.png";
                    break;
            }
            return imgName;
        }
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        } 
        function buildProgress(file) {
            var progress = $('<li class="w-upload-item" data-id="' + file.id + '">'
                + '<div class="w-item-inner">'
                + ' <img src="/Content/FileIco/' + getFileIco(file.ext) + '">'
                + ' <i class="w-close mw-iconfont">&#xa158;</i>'
                + ' <i class="mw-iconfont w-ok">&#xb079;</i>'
                + ' <span class="w-file-message">'
                + '     <span class="w-file-text">'
                + '         <span class="w-file-text-inner">'
                + '             <span>' + file.name + '</span>'
                + '             <span class="w-file-size">（' + WebUploader.Base.formatSize(file.size) + '）</span>'
                + '         </span>'
                + '     </span>'
                + ' </span>'
                + '</div>'
                + '<div class="w-upload-animain" style="width: 1%"></div>'
                + "</li>");

            context.wrapper.find(".w-upload-list").append(progress);
            return progress;
        }
        function getOrBuildProgress(file) {
            var fileItem = context.wrapper.find(".w-upload-list").find("li[data-id='" + file.id + "']");
            if (fileItem.length == 0) {
                fileItem = buildProgress(file);
            }
            return fileItem;
        }
        function fileProgress(fileItem, percentage) {
            fileItem.find(".w-upload-animain").css("width", percentage * 100 + "%");
        }
        function flushData() {
            var uploadFileId = new Array();
            context.wrapper.find(".w-upload-list").children().each(function () {
                var fileId = $(this).attr("data-fileid");
                if (fileId) {
                    uploadFileId.push($(this).attr("data-fileid"));
                }
            });
            if (uploadFileId.length == 0) {
                context.wrapper.find(".w-upload-list").hide();
            }
            context.selector.val(uploadFileId.join(","));
            var stats = uploader.getStats();
            context.selector.attr("data-queue", stats.progressNum + stats.queueNum > 0);
            showStyle();
        }
        function showStyle() {
            if (context.wrapper.find(".w-upload-list > li.w-upload-item").length >= 5) {
                context.wrapper.find(".w-upload-weight-style").addClass("disabled");
                context.wrapper.find("input[type=file]").attr("disabled", "disabled");
            } else {
                context.wrapper.find(".w-upload-weight-style").removeClass("disabled");
                context.wrapper.find("input[type=file]").removeAttr("disabled");
            }
        }
        // 当有文件被添加进队列的时候
        uploader.on("fileQueued", function (file) {
            var fileItem = getOrBuildProgress(file);
            context.wrapper.find(".w-upload-list").show();
            context.selector.attr("data-queue", true);
            context.errSelector.hide();
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on("uploadProgress", function (file, percentage) {
            var fileItem = getOrBuildProgress(file);
            fileProgress(fileItem, percentage);
            fileItem.find(".w-close").show();
            context.errSelector.hide();
        });
        uploader.on('uploadSuccess', function (file, response) {
            var fileItem = getOrBuildProgress(file);
            fileProgress(fileItem, 1);
            fileItem.find(".w-ok").show();
            fileItem.find(".w-close").hide();
            if (response.IsSuccess) {
                for (var i = 0; i < response.FileList.length; i++) {
                    var fileinfo = response.FileList[i];
                    fileItem.attr("data-fileid", fileinfo.Id);
                }
            }
        });
        uploader.on('uploadError', function (file) {
        });
        uploader.on('error', function (type) {
            switch (type) {
                case "Q_EXCEED_NUM_LIMIT":
                    showStyle();
                    context.errSelector.next().html($.validator.messages.formuploadselectedlimit).show();
                    setTimeout(function () {
                        context.errSelector.next().html("").hide();
                    }, 2000);
                    break;
                case "F_EXCEED_SIZE":
                    context.errSelector.next().html($.validator.messages.formuploadsizelimit).show();
                    setTimeout(function () {
                        context.errSelector.next().html("").hide();
                    }, 2000);
                    break;
            }
        });
        uploader.on('uploadComplete', function (file) {
            var fileItem = getOrBuildProgress(file);
            flushData();
            setTimeout(function () {
                fileItem.find(".w-upload-animain").remove();
                fileItem.find(".w-ok").hide();
                fileItem.find(".w-close").show();
            }, 2000);
        });
        context.wrapper.find(".w-upload-list").on("click", ".w-close", function () {
            var fileItem = $(this).closest(".w-upload-item");
            uploader.cancelFile(fileItem.attr("data-id"));
            fileItem.remove();
            flushData();
        });
        return context;
    }
    xnForm.upload = upload;
    var submit = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            callback: function () { }
        };
        option = $.extend({}, defaultoption, option);
        var submitLazyContainer = 0;
        function refreshFormHeight() {
            if (submitLazyContainer) {
                clearTimeout(submitLazyContainer);
                submitLazyContainer = 0;
            }
            submitLazyContainer = setTimeout(listenFormHeight, 200);
        }
        var context = {};
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errSelector = $(context.option.errSelector);
        context.form = context.wrapper.closest(".g-view");
        context.reset = $(context.option.wrapper.replace("#smv_", "#reset_"));
        function validate(op) {
            var gv = $(op.wrapper).closest(".g-view");
            var formpanel = gv.closest(".esmartMargin");
            if (op.validateOption) {
                op.validateOption.ignore = "";
                if (formpanel.length == 1) {
                    listenFormHeight();
                    op.validateOption.showErrors = function () {
                        refreshFormHeight();
                        this.defaultShowErrors();
                    };
                }
                gv.find('#smartForm').validate(op.validateOption);

                setInterval(listenFormHeight, 2000);
            }
        }
        validate(context.option);
        context.selector.attr("beginTime", (new Date()).getTime());

        context.selector.click(function () {
            var $button = $(this);
            if ($button.hasClass("disabled")) {
                return false;
            }
            var $form = context.form.find("#smartForm");
            $form.find(".errMsg").hide();
            if ($form.valid()) {
                $button.addClass("disabled");
                $.ajax({
                    cache: false,
                    url: "/FormRunTime/CheckFormCollect",
                    type: "post",
                    data: { formId: context.form.find("#currentFormId").val() },
                    dataType: "json",
                    success: function (result) {
                        if (!result.Error) {
                            var formBeginTime = context.selector.attr("beginTime");
                            var formEndTime = (new Date()).getTime();
                            var postData = context.wrapper.closest('#smartForm').serialize();
                            if (postData.length > 0) {
                                postData = postData + "&"
                            }
                            postData = postData + "ftxt_AnswerDuration=" + (formEndTime - formBeginTime);
                            var postUrl = context.form.find('#smartForm').attr("action");
                            $.ajax({
                                cache: false,
                                url: postUrl,
                                type: "post",
                                data: postData,
                                dataType: "json",
                                success: function (result) {
                                    if (!result.IsValid) {
                                        for (var i = 0; i < result.Errors.length; i++) {
                                            var item = result.Errors[i];
                                            var errorContainer = context.form.find("#errLbl_ftxt_" + item.ControlId);
                                            if (errorContainer.length > 0) {
                                                if (item.Error != undefined && item.Error != "") {
                                                    errorContainer.text(item.Error);
                                                }
                                                errorContainer.addClass("error").show();
                                                context.form.find(errorContainer)[0].scrollIntoView();
                                            }
                                        }
                                        $button.removeClass("disabled");
                                    }
                                    else {
                                        if (!result.Error) {
                                            var sucessDesc = context.selector.attr("data-success");
                                            var redirecturl = context.selector.attr("data-redirecturl");
                                            if (sucessDesc != null && sucessDesc != undefined && sucessDesc != "") {
                                                context.form.find("#formpostsucess .u-text").html(sucessDesc);
                                            }
                                            else {
                                                sucessDesc = $.validator.messages["formsucess_Default"];
                                                if (sucessDesc != null && sucessDesc != undefined && sucessDesc != "") {
                                                    context.form.find("#formpostsucess .u-text").html(sucessDesc);
                                                }
                                            }
                                            var dialog = context.form.find("#formpostsucess").clone();
                                            dialog.appendTo("body").show();
                                            xnForm.initClientCookie();
                                            setTimeout(function () {
                                                dialog.hide();
                                                if (redirecturl != undefined && redirecturl != "") {
                                                    if (redirecturl.toLowerCase().substr(0, 4) == "http" || redirecturl.toLowerCase().substr(0, 1) == "/") {
                                                        window.location.href = redirecturl;
                                                    }
                                                    else {
                                                        window.location.href = "http://" + redirecturl;
                                                    }
                                                }
                                                else {
                                                    window.location.reload();
                                                }
                                            }, 2000);
                                        }
                                        else {
                                            context.form.find("#formposterror .u-text").html(result.Message);
                                            var dialog = context.form.find("#formposterror").clone();
                                            dialog.appendTo("body").show();
                                            setTimeout(function () {
                                                dialog.hide();
                                                $button.removeClass("disabled");
                                            }, 2000);
                                        }
                                    }
                                },
                                error: function () {
                                    $button.removeClass("disabled");
                                }
                            });
                        }
                        else {
                            var message = $.validator.messages["formerror_" + result.FormCollectResult.FormCollectFeedback] || result.FormCollectResult.FormCollectFeedback;
                            context.form.find("#formposterror .u-text").html(message);
                            var dialog = context.form.find("#formposterror").clone();
                            dialog.appendTo("body").show();
                            setTimeout(function () {
                                dialog.hide();
                                $button.removeClass("disabled");
                            }, 2000);
                        }
                    },
                    error: function () {
                        $button.removeClass("disabled");
                    }
                });
            } else {
                var errItem = $form.find(".errMsg:visible").closest(".esmartMargin");
                if (errItem.length > 0)
                    errItem[0].scrollIntoView()
            }

            return false;
        });
        context.reset.click(function () {
            console.log("reset");
            // 所有表单输入全部置为空
            $("input[name^='ftxt_']").val("");
            //输入框
            //$(".w-input-weight-inner").val("");
            //文本框
            $(".w-textarea-weight-inner").val("");
            //下拉框
            //$(".w-select-weight-inner").val("");
            //图片单选、单选
            $(".w-radio-item.checked").removeClass("checked");
            //图片多选、多选
            $(".w-checkbox-item.checked").removeClass("checked");
            //评分
            $(".w-grade-weight-style").find("a.current").removeClass("current");
            //上传
            $(".w-upload-list").find(".w-close").each(function () { $(this).click(); });
            $(".error").removeClass("error");
            $(".errMsg").hide();
        });
        function listenFormHeight() {
            var formpanel = context.form.closest(".esmartMargin");
            if (formpanel.length == 0)
                return;
            var height = formpanel.height();

            if (height <= 200) {
                return;
            }
            var di = formpanel.data("di");
            if (!di) {
                formpanel.data("di", height).data("do", height);
                console.log("初始化高度：" + height);
                return;
            }
            var heightbefore = formpanel.data("do");
            if (height == heightbefore) {
                console.log("高度无变化：" + height);
                return;
            }
            formpanel.smrecompute("recomputeTo", [height, heightbefore]);
            $(window).trigger("resize");
            formpanel.data("do", height);
            console.log("重新计算高度：" + height);
        }

        $.get('/pagevisit/FormPageViewInCrease', { formId: $('#currentFormId').val(), forcedWriteIn: true }, function () { }, "json");

        return context;
    }
    xnForm.submit = submit;
    var formTitle = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            callback: function () { }
        };
        option = $.extend({}, defaultoption, option);
        var context = {};
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
    }
    xnForm.formTitle = formTitle;
    var formCheckBox = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            errorElement: "",
            valueField: "",
            isItemRandom: false,
            callback: function () { }
        };
        var context = {};
        option = $.extend({}, defaultoption, option);
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errorElement = $(context.option.errorElement);
        context.valueField = $(context.option.valueField);

        if (context.option.isItemRandom) {
            var itemArray = [];
            context.selector.find(".w-checkbox-item").each(function () {
                itemArray.push({ order: Math.random(), html: $(this).prop("outerHTML") });
                $(this).remove();
            });
            for (var i = 0; i < itemArray.length; i++) {
                for (var j = 0; j < i; j++) {
                    if (itemArray[i].order > itemArray[j].order) {
                        var item = {};
                        item.order = itemArray[i].order;
                        item.html = itemArray[i].html;
                        itemArray[i].order = itemArray[j].order;
                        itemArray[i].html = itemArray[j].html;
                        itemArray[j].order = item.order;
                        itemArray[j].html = item.html;
                    }
                }
            }
            for (var i = 0; i < itemArray.length; i++) {
                context.selector.find(".w-checkbox-weight-style").append(itemArray[i].html);
            }
        }
        context.selector.find(".w-checkbox-item").unbind("click").bind("click", function () {
            var item = $(this);
            if (item.hasClass('checked')) {
                item.removeClass("checked");
            }
            else {
                item.addClass("checked");
            }

            var checkBoxValue = [];
            context.selector.find(".w-checkbox-item").each(function () {
                if ($(this).hasClass("checked")) {
                    var itemText = $(this).find(".w-checkbox-inner-right").text();
                    itemText = encodeURIComponent(itemText);
                    checkBoxValue.push(itemText);
                }
            });
            context.valueField.val(checkBoxValue.join(","));
            context.errorElement.hide();
            return false;
        });
    }
    xnForm.formCheckBox = formCheckBox;
    var formRadio = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            errorElement: "",
            valueField: "",
            isItemRandom: false,
            callback: function () { }
        };
        var context = {};
        option = $.extend({}, defaultoption, option);
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errorElement = $(context.option.errorElement);
        context.valueField = $(context.option.valueField);

        if (context.option.isItemRandom) {
            var itemArray = [];
            context.selector.find(".w-radio-item").each(function () {
                itemArray.push({ order: Math.random(), html: $(this).prop("outerHTML") });
                $(this).remove();
            });
            for (var i = 0; i < itemArray.length; i++) {
                for (var j = 0; j < i; j++) {
                    if (itemArray[i].order > itemArray[j].order) {
                        var item = {};
                        item.order = itemArray[i].order;
                        item.html = itemArray[i].html;
                        itemArray[i].order = itemArray[j].order;
                        itemArray[i].html = itemArray[j].html;
                        itemArray[j].order = item.order;
                        itemArray[j].html = item.html;
                    }
                }
            }
            for (var i = 0; i < itemArray.length; i++) {
                context.selector.find(".w-radio-weight-style").append(itemArray[i].html);
            }
        }
        context.selector.find(".w-radio-item").unbind("click").bind("click", function () {
            var item = $(this);
            item.siblings().removeClass("checked");
            item.addClass("checked");
            var itemText = item.find(".w-radio-inner-right").text();
            itemText = encodeURIComponent(itemText);
            context.valueField.val(itemText);
            context.errorElement.hide();
            return false;
        });
    }
    xnForm.formRadio = formRadio;
    var formImgCheckBox = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            errorElement: "",
            valueField: "",
            imgField: "",
            isItemRandom: false,
            callback: function () { }
        };
        var context = {};
        option = $.extend({}, defaultoption, option);
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errorElement = $(context.option.errorElement);
        context.valueField = $(context.option.valueField);
        context.imgField = $(context.option.imgField);
        if (context.option.isItemRandom) {
            var itemArray = [];
            context.selector.find(".w-checkbox-item").each(function () {
                itemArray.push({ order: Math.random(), html: $(this).prop("outerHTML") });
                $(this).remove();
            });
            for (var i = 0; i < itemArray.length; i++) {
                for (var j = 0; j < i; j++) {
                    if (itemArray[i].order > itemArray[j].order) {
                        var item = {};
                        item.order = itemArray[i].order;
                        item.html = itemArray[i].html;
                        itemArray[i].order = itemArray[j].order;
                        itemArray[i].html = itemArray[j].html;
                        itemArray[j].order = item.order;
                        itemArray[j].html = item.html;
                    }
                }
            }
            for (var i = 0; i < itemArray.length; i++) {
                context.selector.find(".w-checkbox-weight-style").append(itemArray[i].html);
            }
        }
        context.selector.find(".w-checkbox-item").unbind("click").bind("click", function () {
            var item = $(this);
            if (item.hasClass('checked')) {
                item.removeClass("checked");
            }
            else {
                item.addClass("checked");
            }

            var checkBoxValue = [];
            var checkBoxImgValue = [];
            context.selector.find(".w-checkbox-item").each(function () {
                if ($(this).hasClass("checked")) {
                    var itemText = $(this).find(".w-checkbox-inner-right").text();
                    var itemImg = $(this).find("img").attr("src");
                    itemText = encodeURIComponent(itemText);
                    itemImg = encodeURIComponent(itemImg);
                    checkBoxValue.push(itemText);
                    checkBoxImgValue.push(itemImg);
                }
            });
            context.valueField.val(checkBoxValue.join(","));
            context.imgField.val(checkBoxImgValue.join(","));
            context.errorElement.hide();
            return false;
        });
        $checkbox = context.selector.find('.w-checkbox-item');
        $checkbox.find('input').on('click', function () {
            if ($(this).prop('checked')) {
                $(this).closest('.w-checkbox-item').addClass('checked');
            } else {
                $(this).closest('.w-checkbox-item').removeClass('checked')
            }
        })
        var isPc = (function () {
            if ($checkbox.parents(".g-mobile-inner").length > 0)
            {
                return false;
            }
            var userAgentInfo = navigator.userAgent,
                Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
                flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        })();
        var dom = '<div class="w-image-checkbox-toBig" style="height:100%;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.75);text-align:center;display:none;z-index:999999">'
            + '<i class="mw-iconfont" style="position:absolute;top:10px;right:10px;font-size:24px;color:#eee;cursor:pointer">&#xa158;</i>'
            + '<div style="height:100%;display:inline-block;vertical-align: middle"></div>'
            + '<img src="" style="max-width85%;max-width:85%;max-height:85%;vertical-align: middle">'
            + '</div>';

        $checkbox.find('.w-imgTobig-box').off().on('click', function () {
            var srcStr = $(this).parent().find('img')[0].src;
            $('body').append(dom);
            $('.w-image-checkbox-toBig').find('img')[0].src = srcStr;
            $('.w-image-checkbox-toBig').fadeIn(300).find('.mw-iconfont').on('click', function () {
                $('.w-image-checkbox-toBig').fadeOut(300, function () {
                    $('.w-image-checkbox-toBig').remove();
                })
            });
            return false;
        });

        if (!isPc) {
            var imgWidth = $checkbox.find('.w-checkbox-weight-image').width();
            var ckimg = $checkbox.find('.w-checkbox-weight-image').find('img').css({
                objectFit: 'cover'
            });
            if (imgWidth > 0) {
                ckimg.css({
                    width: imgWidth,
                    height: imgWidth,
                });
            }

            $checkbox.addClass('mw-mobile');
        }
    }
    xnForm.formImgCheckBox = formImgCheckBox;
    var formImgRadio = function (option) {
        var defaultoption = {
            wrapper: "",
            selector: "",
            errorElement: "",
            valueField: "",
            imgField: "",
            isItemRandom: false,
            callback: function () { }
        };
        var context = {};
        option = $.extend({}, defaultoption, option);
        context.option = option;
        context.wrapper = $(context.option.wrapper);
        context.selector = $(context.option.selector);
        context.errorElement = $(context.option.errorElement);
        context.valueField = $(context.option.valueField);
        context.imgField = $(context.option.imgField);
        if (context.option.isItemRandom) {
            var itemArray = [];
            context.selector.find(".w-radio-item").each(function () {
                itemArray.push({ order: Math.random(), html: $(this).prop("outerHTML") });
                $(this).remove();
            });
            for (var i = 0; i < itemArray.length; i++) {
                for (var j = 0; j < i; j++) {
                    if (itemArray[i].order > itemArray[j].order) {
                        var item = {};
                        item.order = itemArray[i].order;
                        item.html = itemArray[i].html;
                        itemArray[i].order = itemArray[j].order;
                        itemArray[i].html = itemArray[j].html;
                        itemArray[j].order = item.order;
                        itemArray[j].html = item.html;
                    }
                }
            }
            for (var i = 0; i < itemArray.length; i++) {
                context.selector.find(".w-radio-weight-style").append(itemArray[i].html);
            }
        }
        context.selector.find(".w-radio-item").unbind("click").bind("click", function () {
            var item = $(this);
            item.siblings().removeClass("checked");
            item.addClass("checked");
            var itemText = item.find(".w-radio-inner-right").text();
            var itemImg = item.find("img").attr("src");
            itemText = encodeURIComponent(itemText);
            itemImg = encodeURIComponent(itemImg);
            context.valueField.val(itemText);
            context.imgField.val(itemImg);
            context.errorElement.hide();
            return false;
        });
        $radio = context.selector.find('.w-radio-item');
        $radio.find('input').on('click', function () {
            $(this).closest('.w-radio-weight').find('.w-radio-item').removeClass('checked');
            $(this).closest('.w-radio-item').addClass('checked');

        });
        var isPc = (function () {
            if ($radio.parents(".g-mobile-inner").length > 0) {
                return false;
            }
            var userAgentInfo = navigator.userAgent,
                Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
                flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        })();

        var dom = '<div class="w-image-radio-toBig" style="height:100%;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.75);text-align:center;display:none;z-index:999999">'
            + '<i class="mw-iconfont" style="position:absolute;top:10px;right:10px;font-size:24px;color:#eee;cursor:pointer">&#xa158;</i>'
            + '<div style="height:100%;display:inline-block;vertical-align: middle"></div>'
            + '<img src="" style="max-width85%;max-width:85%;max-height:85%;vertical-align: middle">'
            + '</div>';

        $radio.find('.w-imgTobig-box').off().on('click', function () {
            var srcStr = $(this).parent().find('img')[0].src;
            $('body').append(dom);
            $('.w-image-radio-toBig').find('img')[0].src = srcStr;
            $('.w-image-radio-toBig').fadeIn(300).find('.mw-iconfont').on('click', function () {
                $('.w-image-radio-toBig').fadeOut(300, function () {
                    $('.w-image-radio-toBig').remove();
                })
            });
            return false;
        });

        if (!isPc) {
            var imgWidth = $radio.find('.w-radio-weight-image').width();
            var imgHeight = $radio.find('.w-radio-weight-image').height();
            if (imgHeight == imgWidth) {
                var ckimg = $radio.find('.w-radio-weight-image').find('img').css({
                    objectFit: 'cover'
                });
                if (imgWidth > 0) {
                    ckimg.css({
                        width: imgWidth,
                        height: imgWidth,
                    });
                }
                $radio.addClass('mw-mobile');
            }
        }
    }
    xnForm.formImgRadio = formImgRadio;
    var initClientCookie = function () {
        var curDate = new Date();
        //当前时间戳  
        var curTamp = curDate.getTime();

        //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态  
        var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;

        //当日已经过去的时间（毫秒）  
        var passedTamp = curTamp - curWeeHours;

        //当日剩余时间  
        var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
        var leftTime = new Date();
        leftTime.setTime(leftTamp + curTamp);
        //创建cookie  
        var formId = $("#currentFormId").val();
        var cookieName = "__lastSubmit__" + formId + "__";

        var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
        if (!document.cookie.match(reg)) {
            document.cookie = cookieName + "=" + curTamp + ";expires=" + leftTime.toGMTString() + ";path=/";
        }
    }
    xnForm.initClientCookie = initClientCookie;

    

    $.get("/home/GetFormIpInfo", {}, function (r) {
        var currentForm = $("#smartForm");
        currentForm.append('<input type="hidden" name="formHiddenProvinceName" value="' + r.Province + '" />');
        currentForm.append('<input type="hidden" name="formHiddenCityName" value="' + r.City + '" />');
        currentForm.append('<input type="hidden" name="formHiddenCountryName" value="' + r.Country + '" />'); 

    }, "json");
}(xnForm || (xnForm = {})));