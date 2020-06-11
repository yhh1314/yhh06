/**
 *
 */
!function ins_getPrice() {
    setTimeout(function () {
        function Monitor(){
            //mode1 by xxj 2019/2/25
            //检测人保页面是否销售渠道信息加载错误，如果加载错误，自动刷新当前页面。
            var maindocument = window.frames['main'].frames['page'].document;
            var prpCmain_agentCode=maindocument.getElementById('prpCmain.agentCode');
            var prpCmain_agentCode_value=prpCmain_agentCode.value;
            if(prpCmain_agentCode_value){
                if(isNaN(prpCmain_agentCode_value.substring(0,5))){
                    alert('保行天下提示：当前页面加载异常（请注意渠道代码信息是否错误），正在为您重新加载!');
                    window.frames['main'].frames['page'].location.reload();
                    //processMenuClick(this);setLocation(this);
                }
            }
        }
        Monitor();
        var maindocument = window.frames['main'].frames['page'].document;
        var bxtx_buttonPremiumForFG_button = maindocument.getElementById('buttonPremiumForFG-button');
        bxtx_buttonPremiumForFG_button.onclick = SavePrice_bxtx;
        function SavePrice_bxtx() {
            bxtx_buttonPremiumForFG_button.onclick = SavePrice_bxtx;
            setTimeout(function () {
                var bxtx_itemKindSpecialSumPremium = maindocument.getElementById('prpCitemKindsTemp.itemKindSpecialSumPremium');
                if (bxtx_itemKindSpecialSumPremium.value.length < 1) {
                    if (!bxtx_buttonPremiumForFG_button) {
                        return;
                    }
                    else {
                        bxtx_buttonPremiumForFG_button.onclick = SavePrice_bxtx;
                    }
                    return;
                    //bxtx_buttonPremiumForFG_button.onclick=SavePrice_bxtx;
                }
                else {
                    try {
                        var mainDoc = window.frames['main'].frames['page'].document;

                        var info = new Object();

                        var inquiryCvrgManuals = null;//人工报价自选险别
                        var inquiryManual = new Object();// 人工报价的询价单基础信息
                        inquiryManual.palteNo = mainDoc.getElementById('prpCitemCar.licenseNo').value; //车牌号
                        inquiryManual.lastyearInsuranceCompany = '';//上年投保的保险公司编码
                        inquiryManual.insuranceCvrgType = '';//投保险种类型 1 按上年投保 2自选
                        var voteInsurance = new Object();//投保人
                        var recognizee = new Object();//被保人

                        var inquiryTargetManual = new Object();//人工报价的标的信息
                        inquiryTargetManual.palteNo = mainDoc.getElementById('prpCitemCar.licenseNo').value;   //车牌号

                        inquiryTargetManual.frmNo = mainDoc.getElementById('prpCitemCar.frameNo').value; //车架号
                        inquiryTargetManual.engNo = mainDoc.getElementById('prpCitemCar.engineNo').value; //发动机号
                        inquiryTargetManual.modelCodeType = ''; //车型精友库标志，A套，B套
                        inquiryTargetManual.modelCde = mainDoc.getElementById('prpCitemCar.modelCode').value; //精友车型编码
                        inquiryTargetManual.fstRegNo = mainDoc.getElementById('prpCitemCar.enrollDate').value;  // 初登日期
                        inquiryTargetManual.vehicleName = mainDoc.getElementById('prpCitemCar.brandName').value;   //车型名称
                        inquiryTargetManual.seatNum = mainDoc.getElementById('prpCitemCar.seatCount').value;   //座位数
                        inquiryTargetManual.displacement = mainDoc.getElementById('prpCitemCar.exhaustScale').value;  //车辆排量
                        inquiryTargetManual.areaCode = mainDoc.getElementById('queryArea').value;  //行驶区域,投保区域
                        inquiryTargetManual.vehiclePrice = mainDoc.getElementById('prpCitemCar.purchasePrice').value;  //新车购置价
                        inquiryTargetManual.newVehicleFlag = mainDoc.getElementById('prpCfixation_View').innerHTML.indexOf('新车') >= 0 ? 1 : 0;   //新车标识 1 新车 0旧车
                        inquiryTargetManual.chgOwnerFlag = mainDoc.getElementById('prpCitemCar.transferVehicleFlag1').checked == true ? 1 : 0; //过户车标识 1 过户车 0 否
                        inquiryTargetManual.chgOwnerDate = inquiryTargetManual.chgOwnerFlag == 1 ? mainDoc.getElementById('prpCitemCar.transferDate').value : '';  //过户日期
                        inquiryTargetManual.drivingReg = '';    //指定行驶区域
                        inquiryTargetManual.remark = '';    //备注
                        inquiryTargetManual.serialNumber = '';  //序列号

                        var allMan = mainDoc.getElementById('insertInsuredRow').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
                        var date = new Date() + '';
                        for (var i = 0; i < allMan; i++) {
                            var carMan = mainDoc.getElementById('insertInsuredRow').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
                            if (carMan.innerHTML.indexOf('车主') >= 0) {
                                inquiryTargetManual.ownerName = mainDoc.getElementById('prpCinsureds[' + i + '].insuredName').value;//车主姓名
                                inquiryTargetManual.ownerCertNo = mainDoc.getElementById('prpCinsureds[' + i + '].drivingLicenseNo').value;//车主身份证号
                                var t = inquiryTargetManual.ownerCertNo;
                                // inquiryTargetManual.ownerBirthday = t.substring(6).substring(0,4)+'-'+ t.substring(6).substring(4,6)+ '-' + t.substring(6).substring(6, 8); //车主出生年月
                                inquiryTargetManual.ownerBirthday = ''; //车主出生年月
                                inquiryTargetManual.ownerSex = mainDoc.getElementById('prpCinsureds[' + i + '].sex').value; //车主性别(1-男士 2-女士)
                                inquiryTargetManual.ownerAge = mainDoc.getElementById('prpCinsureds[' + i + '].age').value;//车主年龄
                                inquiryTargetManual.certfCdeType = mainDoc.getElementById('prpCinsureds[' + i + '].identifyType').value;//证件类型    01身份证
                            }
                            if (carMan.innerHTML.indexOf('投保人') >= 0) {
                                var man = new Object();
                                man.customerName = mainDoc.getElementById('prpCinsureds[' + i + '].insuredName').value;    //姓名
                                man.customerCardId = mainDoc.getElementById('prpCinsureds[' + i + '].drivingLicenseNo').value;  //身份证号码
                                man.certfCdeType = mainDoc.getElementById('prpCinsureds[' + i + '].identifyType').value;//证件类型
                                //man.tel = carMan.getElementsByTagName('input')[43].value; //电话号码
                                man.proCode = ''; //省份编码
                                man.cityCode = '';//城市编码
                                man.linkAddress = mainDoc.getElementById('prpCinsureds[' + i + '].insuredAddress').value;//详细地址
                                man.customerType = '1';   //身份类型 1投保人,2被保人
                                man.isVhlOwner = carMan.innerHTML.indexOf('车主') >= 0 ? 1 : 0; //是否同车主 1是,0否
                                voteInsurance = man;
                            }
                            if (carMan.innerHTML.indexOf('被保险人') >= 0) {
                                var man = new Object();
                                man.customerName = mainDoc.getElementById('prpCinsureds[' + i + '].insuredName').value;    //姓名
                                man.customerCardId = mainDoc.getElementById('prpCinsureds[' + i + '].drivingLicenseNo').value;  //身份证号码
                                man.certfCdeType = mainDoc.getElementById('prpCinsureds[' + i + '].identifyType').value;//证件类型
                                //man.tel = carMan.getElementsByTagName('input')[43].value; //电话号码
                                man.proCode = ''; //省份编码
                                man.cityCode = '';//城市编码
                                man.linkAddress = mainDoc.getElementById('prpCinsureds[' + i + '].insuredAddress').value;//详细地址
                                man.customerType = '2';   //身份类型 1投保人,2被保人
                                man.isVhlOwner = carMan.innerHTML.indexOf('车主') >= 0 ? 1 : 0; //是否同车主 1是,0否
                                recognizee = man;
                            }
                        }

                        inquiryTargetManual.marketDate = '';//年款
                        inquiryTargetManual.ton = '';//货车（核定载质量）KG
                        inquiryTargetManual.vhlUsageCode = '';//车辆使用性质+车辆用途:t_base使用性质细分


                        var inquiryQuotaManual = new Object();//人工报价报价汇总表
                        inquiryQuotaManual.insId = '';  //保险公司编码
                        inquiryQuotaManual.totalPrm = mainDoc.getElementById('prpCmain.sumPremium1').value;  //保单报价总价

                        // 交强险 单交01  单商10  交商共保11
                        if (mainDoc.getElementById('isBICI').value == '01' || mainDoc.getElementById('isBICI').value == '11') {
                            // info.jq = new Object();
                            inquiryQuotaManual.taxPrm = mainDoc.getElementById('sumPayTax1').value;  //车船税
                            // inquiryQuotaManual.tciPrm = mainDoc.getElementById('prpCitemKindCI.benchMarkPremium').value;  //交强险保费--标准保费
                            inquiryQuotaManual.tciPrm = mainDoc.getElementById('prpCitemKindCI.premium').value;  //交强险保费--折后保费 2018-02-08 by zlp
                            inquiryManual.tciInsuranceBgnDate = mainDoc.getElementById('prpCmainCI.startDate').value;//交强险起期
                            // + ' '
                            // + mainDoc.getElementById('prpCmainCI.startHour').value  + ':' //时
                            // + mainDoc.getElementById('prpCmainCI.startMinute').value;       //分
                            inquiryManual.tciInsuranceEndDate = mainDoc.getElementById('prpCmainCI.endDate').value; //交强险止期
                            // + ' '
                            // + mainDoc.getElementById('prpCmainCI.endHour').value  + ':'  //时
                            // + mainDoc.getElementById('prpCmainCI.endMinute').value;;    //分
                        }

                        // //商业险明细险种code对照表
                        var codeTable = {
                            '050202': '机动车损失保险',
                            '050930': '机动车损失保险 -- 不计免赔',
                            '050501': '机动车全车盗抢保险',
                            '050932': '机动车全车盗抢保险 -- 不计免赔',
                            '050602': '机动车第三者责任保险',
                            '050931': '机动车第三者责任保险 -- 不计免赔',
                            '050711': '机动车车上人员责任保险(司机)',
                            '050933': '机动车车上人员责任保险(司机) -- 不计免赔',
                            '050712': '机动车车上人员责任保险(乘客)',
                            '050934': '机动车车上人员责任保险(乘客) -- 不计免赔',
                            '050211': '车身划痕损失险',
                            '050937': '车身划痕损失险 -- 不计免赔',
                            '050232': '玻璃单独破碎险',
                            '050253': '指定修理厂险',
                            '050311': '自燃损失险',
                            '050935': '自燃损失险 -- 不计免赔',
                            '050461': '发动机涉水损失险',
                            '050938': '发动机涉水损失险 -- 不计免赔',
                            '050261': '新增加设备损失险',
                            '050936': '新增加设备损失险 -- 不计免赔',
                            '050801': '车上货物责任险',
                            '050939': '车上货物责任险 -- 不计免赔',
                            '050643': '精神损害抚慰金责任险',
                            '050917': '精神损害抚慰金责任险 -- 不计免赔',
                            '050441': '修理期间费用补偿险',
                            '050451': '机动车损失保险无法找到第三方特约险',
                        }


                        //bxtx险种-险别编码对照表
                        var nameCodeTable = {
                            '机动车损失保险': '030006',
                            '机动车损失保险 -- 不计免赔': '033102',
                            '机动车全车盗抢保险': '030061',
                            '机动车全车盗抢保险 -- 不计免赔': '033104',
                            '机动车第三者责任保险': '030018',
                            '机动车第三者责任保险 -- 不计免赔': '033103',
                            '机动车车上人员责任保险(司机)': '030001',
                            '机动车车上人员责任保险(司机) -- 不计免赔': '033105',
                            '机动车车上人员责任保险(乘客)': '030009',
                            '机动车车上人员责任保险(乘客) -- 不计免赔': '033110',
                            '车身划痕损失险': '032601',
                            '车身划痕损失险 -- 不计免赔': '033106',
                            '玻璃单独破碎险': '030004',
                            '指定修理厂险': '032618',
                            '自燃损失险': '030012',
                            '自燃损失险 -- 不计免赔': '033107',
                            '发动机涉水损失险': '032608',
                            '发动机涉水损失险 -- 不计免赔': '033109',
                            '新增加设备损失险': '030021',
                            '新增加设备损失险 -- 不计免赔': '033018',
                            '车上货物责任险': '033002',
                            '车上货物责任险 -- 不计免赔': '033017',
                            '精神损害抚慰金责任险': '033004',
                            '精神损害抚慰金责任险 -- 不计免赔': '033019',
                            '修理期间费用补偿险': '033007',
                            '机动车损失保险无法找到第三方特约险': '033008',
                        }

                        //商业险
                        if (mainDoc.getElementById('isBICI').value == '10' || mainDoc.getElementById('isBICI').value == '11') {
                            // info.sy.standardPremium = $('#standardPremium').text();//标准保费
                            //inquiryQuotaManual.vciPrm = mainDoc.getElementById('prpCmain.sumNetPremium').value; //商险保费 (净保费)
                            inquiryQuotaManual.vciPrm = mainDoc.getElementById('prpCmain.sumPremium').value; //商险保费 (总保费) 2018-01-08 by zlp

                            inquiryManual.vciInsuranceBgnDate = mainDoc.getElementById('prpCmain.startDate').value; //商业险起期
                            // + ' '
                            // + mainDoc.getElementById('prpCmain.startHour').value  + ':' //时
                            // + mainDoc.getElementById('prpCmain.startMinute').value;     //分
                            inquiryManual.vciInsuranceEndDate = mainDoc.getElementById('prpCmain.endDate').value;   //商业险止期
                            // + ' '
                            // + mainDoc.getElementById('prpCmain.endHour').value  + ':' //时
                            // + mainDoc.getElementById('prpCmain.endMinute').value;     //分

                            inquiryQuotaManual.discount = mainDoc.getElementById('prpCmain.discount').value;    //折扣  商险实际折扣率

                            var list = [];

                            var mainLength = mainDoc.getElementById('itemKindMain').getElementsByTagName('tbody')[0].children.length;   //主险表
                            var specLength = mainDoc.getElementById('itemKindSpecial').getElementsByTagName('tbody')[0].children.length;//不计免赔表
                            for (var m = 0; m < mainLength; m++) {
                                if (mainDoc.getElementById('prpCitemKindsTemp[' + m + '].premium').value) {   //有保费说明选了该险种
                                    var mainIn = mainDoc.getElementById('itemKindMain').getElementsByTagName('tbody')[0].children[m].children[0];
                                    var firstK = mainIn.innerHTML.indexOf('[');
                                    var endK = mainIn.innerHTML.indexOf(']');
                                    var index = mainIn.innerHTML.substring(firstK + 1, endK); //下标

                                    var kindCode = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].kindCode').value;    //险种编码
                                    var item = new Object();
                                    // item.cvrgId = kindCode ;  //人保险别编码
                                    item.cvrgName = codeTable[kindCode];  //险别名称
                                    item.cvrgId = nameCodeTable[item.cvrgName]; //bxtx险别编码
                                    item.insId = ''; //保险公司编码
                                    item.cvrgPrem = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].premium').value;  //保费
                                    if (item.cvrgName.indexOf('乘客') >= 0) {
                                        item.cvrgAmountOne = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].unitAmount').value;   //每座保额
                                    } else {
                                        item.cvrgAmount = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].amount').value;  //保额
                                    }
                                    item.excldDeductible = 0;//是否投了不计免赔 0:否 1:是 默认无不计免赔
                                    //不计免赔项
                                    for (var s = 0; s < specLength; s++) {
                                        var special = mainDoc.getElementById('itemKindSpecial').getElementsByTagName('tbody')[0].children[s].children[0];
                                        var firstKs = special.innerHTML.indexOf('[');
                                        var endKs = special.innerHTML.indexOf(']');
                                        var indexs = special.innerHTML.substring(firstKs + 1, endKs); //下标
                                        var kindCodes = mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].kindCode').value;    //险种编码
                                        if (codeTable[kindCodes].indexOf(item.cvrgName) >= 0
                                            && mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].premium').value) {   //有保费说明选了该险种
                                            item.excldDeductible = '1';
                                            var items = new Object();
                                            // items.cvrgId = kindCodes ;  //人保险别编码
                                            items.cvrgName = codeTable[kindCodes];  //险别名称
                                            items.cvrgId = nameCodeTable[items.cvrgName]; //bxtx险别编码
                                            items.insId = ''; //保险公司编码
                                            items.cvrgPrem = mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].premium').value;  //保费
                                            list.push(items);
                                        }
                                    }
                                    list.push(item);
                                }
                            }
                            var subLength = mainDoc.getElementById('itemKindSub').getElementsByTagName('tbody')[0].children.length; //附加险表
                            for (var m = 0; m < subLength; m++) {
                                var special = mainDoc.getElementById('itemKindSub').getElementsByTagName('tbody')[0].children[m].children[0];
                                var firstK = special.innerHTML.indexOf('[');
                                var endK = special.innerHTML.indexOf(']');
                                var index = special.innerHTML.substring(firstK + 1, endK); //下标

                                if (mainDoc.getElementById('prpCitemKindsTemp[' + index + '].premium').value > 0) {   //有保费说明选了该险种
                                    var kindCode = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].kindCode').value;    //险种编码
                                    var item = new Object();
                                    // item.cvrgId = kindCode ;  //人保险别编码
                                    item.cvrgName = codeTable[kindCode];  //险别名称
                                    item.cvrgId = nameCodeTable[item.cvrgName]; //bxtx险别编码
                                    item.insId = ''; //保险公司编码
                                    item.cvrgPrem = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].premium').value;  //保费
                                    if (item.cvrgName.indexOf('玻璃') >= 0) {
                                        glsType = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].modeCode').value;  //玻璃类型 1 国产 2 进口
                                        item.glsType = (glsType.indexOf('2') == 0 ? 2 : 1); //人保玻璃 国产10  国产特殊材质11  进口20 进口特殊材质21
                                    } else {
                                        item.cvrgAmount = mainDoc.getElementById('prpCitemKindsTemp[' + index + '].amount').value;  //保额
                                        item.excldDeductible = 0;//是否投了不计免赔 0:否 1:是 默认无不计免赔
                                    }
                                    //不计免赔项
                                    for (var s = 0; s < specLength; s++) {
                                        var special = mainDoc.getElementById('itemKindSpecial').getElementsByTagName('tbody')[0].children[s].children[0];
                                        //alert(special.innerHTML);
                                        var firstKs = special.innerHTML.indexOf('[');
                                        var endKs = special.innerHTML.indexOf(']');
                                        var indexs = special.innerHTML.substring(firstKs + 1, endKs); //下标
                                        var kindCodes = mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].kindCode').value;    //险种编码
                                        //    if(kindCodes=='050939')
                                        //alert(codeTable[kindCodes]+':'+item.cvrgName);
                                        if (codeTable[kindCodes].indexOf(item.cvrgName) >= 0
                                            && mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].premium').value) {   //有保费说明选了该险种
                                            item.excldDeductible = '1';
                                            var items = new Object();
                                            // items.cvrgId = kindCodes ;  //人保险别编码
                                            items.cvrgName = codeTable[kindCodes];  //险别名称
                                            items.cvrgId = nameCodeTable[items.cvrgName]; //bxtx险别编码
                                            items.insId = ''; //保险公司编码
                                            items.cvrgPrem = mainDoc.getElementById('prpCitemKindsTemp[' + indexs + '].premium').value;  //保费
                                            list.push(items);
                                        }
                                    }
                                    list.push(item);
                                }
                            }
                        }

                        inquiryCvrgManuals = list;
                        info.inquiryManual = inquiryManual;
                        info.inquiryTargetManual = inquiryTargetManual;
                        info.inquiryCvrgManuals = inquiryCvrgManuals;
                        info.inquiryQuotaManual = inquiryQuotaManual;
                        info.voteInsurance = voteInsurance;
                        info.recognizee = recognizee;
                        window.top.myExtension.SavePricePA(decodeUnicode(JSON.stringify(info)), 'zbtf');
                        //window.top.myExtension.SavePrice(decodeUnicode(JSON.stringify(info)));
                    } catch (e) {

                    }


                    function decodeUnicode(str) {
                        str = str.replace(/\\/g, '%');
                        str = unescape(str);
                        str = str.replace(/%/g, '');
                        str = str.replace('\'[', '[');
                        str = str.replace('""[', '[');
                        str = str.replace(']""', ']');
                        str = str.replace(']\'', ']');
                        return str;
                    }
                }
            }, 3000);
        }
    }, 2000);
}();

/**
 * 续保页面执行js
 * @returns {boolean}
 */
function shutWin() {
    var obj = window.opener.prototype;
    var arrChk = document.getElementsByName('ichkbox');
    var arrPolicyNo = document.getElementsByName('ipolicyNo');
    var _policyno = '';
    var _othFlag = '';
    var _oldComCode = '';
    var _nowComCode = '';
    for (var i = 0; i < arrChk.length; i++) {
        if (arrChk[i].checked == true) {
            _policyno = arrPolicyNo[i].value;
        }
    }
    if (_policyno != null && _policyno != '') {
        var callback = {
            success: function (res) {
                var tax = [];
                tax = YAHOO.lang.JSON.parse(res.responseText);
                for (var i = 0; i < tax.data.length; i++) {
                    //modify by cj 20100906 续保调整 start
                    var renewalFlag = tax.data[i].renewalFlag;
                    if (renewalFlag != null && renewalFlag == '1') {
                        var _proposalNo = tax.data[i].proposalNo;
                        if (confirm('该单不在续保参数配置天数范围内，为非续保保单,是否按复制处理？')) {
                            //obj.param = renewalFlag;
                            //obj.param = obj.param + _proposalNo;
                            window.opener.location.href = '/prpall/business/copyProposal.do?bizNo=' + _proposalNo;
                            window.close();
                        }
                        //modify by cj 20100906 续保调整 end
                    } else {
                        var riskCode = tax.data[i].riskCode;
                        if (riskCode == 'DAZ') {
                            var premium = tax.data[i].premium;
                            if (premium < 0) {
                                errorMessage('保单条款产品为“尊贵人生”，且商业保费小于尊贵人生最低保费限制, 则不允许续保尊贵人生条款！');
                                return false;
                            }
                        }
                        var contractNo = tax.data[i].contractNo;
                        if (contractNo != null && trim(contractNo) != '') {
                            if (!confirm('该车上年在团单下投保，是否按个单续保？')) {
                                return false;
                            }
                        }
                        document.getElementById('prpCrenewalVo.othFlag').value = tax.data[i].othFlag;
                        _othFlag = document.getElementById('prpCrenewalVo.othFlag').value;
                        _oldComCode = tax.data[i].oldComCode;
                        _nowComCode = tax.data[i].nowComCode;
                        if (_othFlag.substring(2, 3) == '0' && _othFlag.substring(3, 4) == '0') {
                            if (_oldComCode.substring(0, 6) == _nowComCode.substring(0, 6) && _oldComCode != _nowComCode) {
                                if (confirm('确认要续保兄弟公司业务吗？')) {
                                    //obj.param = _policyno;
                                    window.opener.location.href = '/prpall/business/editRenewalCopy.do?bizNo=' + _policyno;
                                    window.close();
                                }
                            } else {
                                //obj.param = _policyno;
                                window.opener.location.href = '/prpall/business/editRenewalCopy.do?bizNo=' + _policyno;
                                window.close();
                            }
                        } else {
                            errorMessage('该保单已退保或注销，不能续保！');
                            return false;
                        }
                    }
                }
            },
            failure: function (res) {
            }
        }
        var transaction = YAHOO.util.Connect.asyncRequest('POST', '/prpall/business/editCheckRenewal.do?bizNo=' + _policyno, callback, null);

    } else {
        errorMessage('请输入查询信息，选择需要续保的保单！');
        return false;
    }
}
function shutWin1() {
    var obj = window.dialogArguments.prototype;
    var arrChk = document.getElementsByName("ichkbox");
    var arrPolicyNo = document.getElementsByName("ipolicyNo");
    var _policyno = "";
    var _othFlag = "";
    var _oldComCode = "";
    var _nowComCode = "";
    for (var i = 0; i < arrChk.length; i++) {
        if (arrChk[i].checked == true) {
            _policyno = arrPolicyNo[i].value;
        }
    }
    if(_policyno != null && _policyno != ""){
        var callback ={
            success: function(res)
            {
                var tax = [];
                tax = YAHOO.lang.JSON.parse(res.responseText);
                for(var i=0;i<tax.data.length;i++){
                    //modify by cj 20100906 续保调整 start
                    var renewalFlag = tax.data[i].renewalFlag;
                    if(renewalFlag != null && renewalFlag == "1"){
                        var _proposalNo = tax.data[i].proposalNo;
                        if(confirm("该单不在续保参数配置天数范围内，为非续保保单,是否按复制处理？")){
                            obj.param = renewalFlag;
                            obj.param = obj.param + _proposalNo;
                            window.close();
                        }
                        //modify by cj 20100906 续保调整 end
                    }else{
                        var riskCode = tax.data[i].riskCode;
                        if(riskCode == "DAZ"){
                            var premium = tax.data[i].premium;
                            if(premium < 0){
                                errorMessage("保单条款产品为“尊贵人生”，且商业保费小于尊贵人生最低保费限制, 则不允许续保尊贵人生条款！");
                                return false;
                            }
                        }
                        var contractNo = tax.data[i].contractNo;
                        if(contractNo!=null&&trim(contractNo)!=""){
                            if(!confirm("该车上年在团单下投保，是否按个单续保？")){
                                return false;
                            }
                        }
                        document.getElementById("prpCrenewalVo.othFlag").value = tax.data[i].othFlag;
                        _othFlag = document.getElementById("prpCrenewalVo.othFlag").value;
                        _oldComCode = tax.data[i].oldComCode;
                        _nowComCode = tax.data[i].nowComCode;
                        var renewalPolicyNo=tax.data[i].policyNo;
                        if(_othFlag.substring(2,3) == "0" && _othFlag.substring(3,4) == "0"){
                            if(_oldComCode.substring(0,6) == _nowComCode.substring(0,6) && _oldComCode != _nowComCode){
                                if(confirm("确认要续保兄弟公司业务吗？")){
                                    _policyno=renewalPolicyNo;
                                    obj.param = _policyno;
                                    window.close();
                                }
                            }else{
                                obj.param = renewalPolicyNo;
                                window.close();
                            }
                        }else{
                            errorMessage("该保单已退保或注销，不能续保！");
                            return false;
                        }
                    }
                }
            },
            failure: function(res)
            {
            }
        }
        var transaction = YAHOO.util.Connect.asyncRequest('POST',"/prpall/business/editCheckRenewal.do?bizNo="+_policyno, callback,null);

    }else{
        errorMessage("请输入查询信息，选择需要续保的保单！");
        return false;
    }
}

function browsePolicyNo() {

    var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Sel = YAHOO.util.Selector, layout = null;
    //var obj = window.dialogArguments.prototype;
    var arrChk = document.getElementsByName("ichkbox");
    var arrPolicyNo = document.getElementsByName("ipolicyNo");
    var _policyno = "";
    var _othFlag = "";
    for (var i = 0; i < arrChk.length; i++) {
        if (arrChk[i].checked == true) {
            _policyno = arrPolicyNo[i].value;
        }
    }
    if(_policyno != null && _policyno != ""){

        if(_policyno.substring(1,4)=='DAA'||_policyno.substring(1,4)=='DZA'||_policyno.substring(1,4)=='DAV'){
            var url = "/prpall/business/browseRenewalPolicy.do?bizNo="+_policyno;
            window.open(url,'_browse','width=1300,height=800,menubar=no,toolbar=no,location=no,directories=no,status=no, scrollbars=yes,resizable=yes');
        }else{
            var url = "/prpall/business/browsePolicyNo.do?bizNo="+_policyno;
            //window.showModalDialog(url, window, "resizable:yes;dialogHide:yes;help:no;status:no;scroll:no;dialogWidth:800px;dialogHeight:600px");
            window.showModalDialog(url,window,"dialogHeight:700px;dialogWidth:1000px;center:yes;resizable:no;status:no;scroll:yes;help:no");
        }
    }else{
        errorMessage("请输入查询信息，选择需要浏览的保单！");
        return false;
    }

}

