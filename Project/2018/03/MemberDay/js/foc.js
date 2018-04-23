var prizeId = 0,prizeName = '',prizeCode = 0,is_checked = true,Brefid = 471118487,
backTime = $('#ServerTime').val()?$('#ServerTime').val().replace(/\-/g,'/'):'';
// backTime = '2018/04/17 22:00:02';
//时间格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//URL
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
             theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//备份时间计时
function updateTime(startTime){
    var sT = startTime;
    if(typeof(sT) == 'string'){
        sT = new Date(startTime);
    }
    var t = sT.getTime();
    var dd = setInterval(function(){
        t = t+1000;
        backTime = new Date(t).Format("yyyy/MM/dd hh:mm:ss");
    },1000);
}
//手机号检查
function check_p(p){
    var p = p.replace(/\D/g,'');
    if(p != ''){
        if((/^1(3|4|5|7|8)\d{9}$/.test(p))){
            if((/^17(0|1)\d{8}$/.test(p))){
              return 2;
            }else{
              return 1;
            }

        }else{
            return '*请输入正确的手机号';
        }
    }else{
        return '*请输入手机号';
    }
}
//输入检查
function check_n(name){
    if(name != ''){
        if(name.length == 1){
            return '*姓名不能少于两个字';
        }else if(name.length>1&&name.length<50){
            var reg=/\s/g;//空格
            var pattern = /^[\u4e00-\u9fa5A-z]+$/;

            if(!reg.test(name)){
                //没有空格
                if(/[\u4e00-\u9fa5]/.test(name)){
                    for (var d = "", r = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？]"), c = 0; c < name.length; c++) {
                        var p = name.substr(c, 1);
                        null == p.match(/^[\u4E00-\u9FA5A-Za-z\u2f00-\u2f03\/]+$/) && null == p.match(/\s/) && (d += p),
                        p.match(r) && (d += p)
                    }
                    if (name.indexOf("/") > -1 && /^[\u4E00-\u9FFF]+$/.test(name)){
                      return '*英文姓名请输入英文或拼音';
                    }else if ("" != d) {
                        for (var c = 0; c < d.length; c++){
                          var nn = false;
                        }
                        if(nn == false){
                          return '*姓名不可输入特殊字符';
                        }
                    }else{
                      return 1;
                    }
                  }else if (!/^[a-zA-Z]+\/[a-zA-Z]+$/.test(name)){
                    if(/^[0-9]+.?[0-9]*$/.test(name) || /[^a-zA-Z0-9\_\u4e00-\u9fa5]/.test(name)){
                      return '*姓名不可输入特殊字符';
                    }else if(name.indexOf("/")==-1){
                      return '*英文姓名，姓和名必须以/号隔开';
                    }else{
                      return '*姓名不可输入特殊字符';
                    }
                  }else if( /^[a-zA-Z]+\/[a-zA-Z]+$/.test(name) && name.length > 26){
                    return '*英文姓名，长度不得超过26个字符';
                  }else{
                        return 1;
                    }
                // if(pattern.test(name)){
                //     //正确
                //     return 1;
                // }else{
                //     return '*请输入正确的乘机人姓名';
                // }
            }else{
                return '*姓名不能有空格哦';
            }

        }else{
            return '*请输入正确的姓名';
        }
    }else{
        return '*请输入姓名';
    }
}

//后领奖
function sendInfo(p,code,n){
    $.ajax({
        url: 'Receive.html',
        dataType: 'json',
        data:{
            record:recode,
            name:n.toUpperCase(),
            phoneNo:p,
            validateCode:code,
        },
        type: 'POST',
        success: function(res) {
            // res.RspCode = 500;
            switch(res.RspCode){
                case 200:
                  if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    if(tyIndex != undefined){
                      app.prizeList_2[tyIndex].Status = 1;
                      // $('.list_2 ul li').eq(tyIndex).find('button').attr('class','yet').html('立即使用');
                    }
                  switch(app.p3Index){
                        case 0:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_1.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_1.png',
                                btn_1:'立即使用',
                                btn_2:'点击查看'
                            }
                        break;
                        case 1:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_1.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_2.png',
                                btn_1:'立即使用',
                                btn_2:'点击查看'
                            }
                        break;
                        case 2:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_3.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/t.png',
                                btn_1:'知道啦',
                                btn_2:''
                            }
                        break;
                    }
                    showPop('suc');
                break;
                case 500:
                  if(tyIndex != undefined){
                    app.prizeList_2[tyIndex].Status = 1;
                  }
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'您已经领取过啦！<br>请不要重复领取哦~',
                        btn:'知道啦'
                    }
                    showPop('fail');
                break;
                case 303:
                    if(tyIndex != undefined){
                    $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
                  }
                    app.input.tips_1 = '*请填写手机号';
                break;
                case 301:
                  if(tyIndex != undefined){
                    $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
                  }
                    app.input.tips_1 = '*请填写验证码';
                break;
                case 302:
                    if(tyIndex != undefined){
                    $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
                  }
                    app.input.tips_1 = '*请输入正确的验证码 ';
                break;
                default:
                  if(tyIndex != undefined){
                  $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
                }
                  if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                  app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'抱歉，活动太火爆啦！<br>请稍后重试，或至我的奖品领取',
                        btn:'知道啦'
                    }
                    showPop('fail');

            }

        },
        error: function(res){
          if(tyIndex != undefined){
          $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
        }
        },
        complete: function() {
          app.input.class='yes';
          app.input.name='提交领券';
        }
    });
}

    $(document).on("keyup",'#zheng',function(){
         var val = $(this).val().replace(/[^\s\d]/g,'');
         $(this).val(val);
     });
    //清空输入错误提示
    $(document).on('click','input',function(){
        app.input.tips_1 = '';
        app.input.tips_2 = '';
        app.input.tips_3 = '';
        app.input.tips_4 = '';
    })
    //清空输入错误提示
    $(document).on('click','textarea',function(){
        app.input.tips_5 = '';
    })
    //手机号格式化
    $(document).on("keyup",'.phone',function(){
         var val = $(this).val().replace(/[^\s\d]/g,'').replace(/(^(\d{3})|(\d{4}))(?=[^\s])/g,'$1 ');
         $(this).val(val);
     });

    //关闭服务条款
    $(document).on('click','.service .service_back_btn',function(){
        $(".service").css('display','none');
        $(".page_1").css('display','block');
        $('body').css({position:'fixed','overflow':'auto'});
    })
    //勾选
    $(document).on('click','.gou_box',function(){
        var gou_show = $('.gou_logo').css('display');
        app.input.tips_4 = '';
        if(gou_show == 'block'){
           is_checked = false;
           $('.gou_logo').css({'display':'none'});
        }else{
           is_checked = true;
           $('.gou_logo').css({'display':'block'});
        }
    });
    $(document).on('click','.suc .p_wrap button',function(){
        var text = $(this).html();
        closePop('suc');
        switch(text){
          case '立即领取':
          //国际
            app.nozzle = 3;
            $("#wrap input").val('');
            app.input={
                  title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                  tips_1:'',
                  class:'yes',
                  name:'提交领券'
              };
              if(!app.isNeedName&&!app.isNeedPhone){
                  sendInfo('','','');
              }else{
                 showPop('input');
              }
              // showPop('input');
          break;
          case '立即领取 ':
            //国内
            app.nozzle = 3;
            $("#wrap input").val('');
            app.isNeedName = true;
            app.input={
                  title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                  tips_1:'',
                  class:'yes',
                  name:'提交领券'
              };

              showPop('input');

              // showPop('input');
          break;
          case '立即使用':
              app.goIndex();
              // alert('跳转立即使用');
          break;
          case '点击查看':
              // alert('跳转点击查看');
              window.location.href="https://wx.17u.cn/pub/MyCard?ifhttps=true&type=3";
          break;
          case '填写领取信息':
              $("#wrap input").val('');
              app.nozzle = 3;
              app.isNeedName = true;
              app.isNeedPhone = true;
              app.isNeedCheckPhone = true;
              app.input={
                  title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                  tips_1:'',
                  class:'yes',
                  name:'提交'
              };
              showPop('input');
          break;
          default:
            closePop('suc');
        }
    });
function showPop(n) {
    // var h = $('body').height();
    var hh = $(window).height();
    var w = $(window).width();
    $("#wrap").css("width",w+'px');

    scrollT = $(window).scrollTop();
    $(document.body).css({ position: "fixed", top: '-'+ scrollT + "px" });;

    var name = '.' + n;
    $('.mask').css({ display:'block',height:hh+'px',top:scrollT+'px'});
    $(name).css("display","block");
}
function showToast(){
    /*toast*/
    var hh = $(window).height();
    $('.toast').css({display:'block',height:hh+'px'});
    $('.toast').animate({
        opacity:1
    },800,'linear',function(){
        setTimeout(function(){
            $('.toast').animate({
                opacity:0
            },800,'linear',function(){
                $(".toast").css("display","none");
            });
        },500);
    })
}
function closePop(n){
    $(document.body).css({ position: "static" });
    $(document.body).scrollTop(scrollT);

    var name = '#' + n;
    $('.mask').css("display","none");
    $(name).css("display","none");
}
//loading结束
function loadEnd(){
    $('#loading').css('display','none;');

    app.showPage = 'A';
    setTimeout(function(){
        $('#wrap').css('display','block');
    },80);
}
var waitTime = 60;
//验证码倒计时
function codeWaitTime(elem){
  if(waitTime === 0){
    elem.html("获取验证码");
    elem.css({'backgroundColor':"#fff13f"});
    elem.addClass('ma');
    waitTime = 60;
  }else{
    elem.html(waitTime + "s后可重发");
    elem.css({'backgroundColor':"#a79c95"});
    elem.removeClass('ma');
    waitTime--;
    setTimeout(function() {
      codeWaitTime(elem)
    },1000)
  }
}
function SendMa(n){
    $.ajax({
        url: '../WXGetValidateCode.html',
        dataType: 'json',
        data:{
            phoneNum:n,
            wxType:'0',
            messageType:1,
        },
        type: 'GET',
        success: function(res) {
            // res = {"RetCode":200,"RetMsg":"成功_True"};
            switch(res.RetCode){
                case 200:
                    codeWaitTime($('#ma'));
                    app.toast ='验证码已发送至您的手机';
                    showToast();
                break;
                case 302:
                    app.toast = '刚刚已经发送过啦，请确认后重试';
                    showToast();
                break;
                default:
                    app.toast = '验证码发放失败，请稍后重试';
                    showToast();
            }
        },
        error: function(res){
            app.toast = '验证码发放失败，请稍后重试';
            showToast();
        },
        complete: function() {
            app.input.class = 'yes';
            app.input.name = '提交领券';
        }
    });
}

//横屏提示
var fix = 1;
var supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');
var initt = function(){
    var orientation;
    var updateOrientation = function(){
        if(supportOrientation){
            orientation = window.orientation;
            switch(orientation){
            case 90:
            case -90:
            orientation = 'landscape';
            break;
            default:
            orientation = 'portrait';
            break;
            }
        }else{
            orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
        }
        // alert(orientation);
        //结果判断

        if(orientation == 'landscape'){
            if($('body').css('position') == 'fixed'){
                fix = 2;
                $('body').css('position','static');
            }
            $('#wrap').css('display','none');
            $('.other_t').css('display','block');
        }else{
            if($('#loading').css('display')!='block'){
                if(fix == 2){
                    $('body').css('position','fixed');
                }
                $('#wrap').css('display','block');
                $('.other_t').css('display','none');
            }
        }
    };
    if(supportOrientation){
        window.addEventListener('orientationchange',updateOrientation,false);
    }else{
    //监听resize事件
        window.addEventListener('resize',updateOrientation,false);
    }
    updateOrientation();
};
window.addEventListener('DOMContentLoaded',initt,false);






var service_texts = '<span class="service_title">同程旅游服务条款</span><div class="service_content_box">'+
      '<div class="each_service"><p class="service_each_title">1．同程旅游服务条款的确认</p>'+
      '<p class="service_content">同程旅游的所有权与运作权归同程网络科技股份有限公司（以下简称"同程"）所有。'+
      '本服务条款具有法律约束力。一旦您点选 "注册"并通过注册程序，即表示您自愿接受本协议之所有条款，并已成为同程旅游的注册会员。'+
      '用户在享用同程旅游会员服务的同时，同意接受同程旅游会员服务提供的各类信息服务。</p></div>'+
      '<div class="each_service"><p class="service_each_title">2．服务内容</p>'+
      '<p class="service_content">2.1 同程旅游服务的具体内容由同程根据实际情况提供。<br/>'+
      '2.2 同程在同程旅游上向其会员提供相关网络服务，与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）'+
      '及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均由会员自行负担。</p></div>'+
      '<div class="each_service"><p class="service_each_title">3．会员帐号及密码</p>'+
      '<p class="service_content">您注册会员成功后，将得到一个帐号和密码。您应妥善保管该帐号及密码，并对以该帐号进行的所有活动及事件负法律责任。'+
      '因黑客行为或会员保管疏忽致使帐号、密码被他人非法使用的，同程不承担任何责任。如您发现任何非法使用会员帐号或安全漏洞的情况，请立即与同程联系。</p></div>'+
      '<div class="each_service"><p class="service_each_title">4．会员权责</p>'+
      '<p class="service_content">4.1 会员有权按照同程规定的程序和要求使用同程向会员提供的各项网络服务，如果会员对该服务有异议，可以与同程联系以便得到及时解决。<br/>'+
      '4.2 用户在申请使用同程旅游网络服务时，必须向同程旅游提供准确的个人资料，如个人资料有任何变动，必须及时更新。<br/>'+
      '4.3 会员同意接受同程旅游通过电子邮件、短信或其他方式向会员发送的预订确认信息、以及其他预订产品或服务相关的信息。'+
      '会员同意接受同程旅游通过电子邮件、短信或其他方式向会员发送的促销或其他商业信息，如会员不同意接受促销或其他商业信息，会员可以自行退订或电话联系同程旅游进行退订。<br/>'+
      '4.4 会员在同程旅游的网页上发布信息或者利用同程旅游的服务时必须符合国家的法律法规以及国际法的有关规定。<br/>'+
      '4.5 对于会员通过同程旅游网上消息平台（包括但不限于论坛、BBS、评论）上传到同程旅游网站上可公开获取区域的任何内容，'+
      '会员同意授予同程在全世界范围内享有完全的、免费的、永久性的、不可撤销的、非独家的权利，以及再许可第三方的权利，'+
      '以使用、复制、修改、改编、出版、翻译、据以创作衍生作品、传播、表演和展示此等内容（整体或部分），和/或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中。<br/>'+
      '4.6 会员承诺不会在同程旅游的消息平台（包括但不限于论坛、BBS、评论）发布如下信息：<br/>反对宪法所确定的基本原则的；<br/>'+
      '危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br/>损害国家荣誉和利益的；<br/>煽动民族仇恨、民族歧视，破坏民族团结的；<br/>'+
      '破坏国家宗教政策，宣扬邪教和封建迷信的；<br/>散布谣言，扰乱社会秩序，破坏社会稳定的；<br/>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br/>'+
      '侮辱或者诽谤他人，侵害他人合法权益的；<br/>含有法律、行政法规禁止的其他内容的。<br/>'+
      '4.7 会员单独为其发布在同程旅游上信息承担责任。会员若在同程旅游散布和传播违法信息，网络会员服务的系统记录有可能作为会员违法之证据。<br/>'+
      '4.8 会员不得利用本站的服务从事以下活动：<br/>未经允许，进入计算机信息网络或者使用计算机信息网络资源；<br/>未经允许，对计算机信息网络功能进行删除、修改或者增加；<br/>'+
      '未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；<br/>故意制作、传播计算机病毒等破坏性程序；<br/>'+
      '其他危害计算机信息网络安全的行为。<br/>4.9 会员不得以任何方式干扰本站的服务。<br/>4.10 会员承诺遵守本站的所有其他规定和程序。<br/>'+
      '4.11 如果会员违反上述规定，同程有权要求其改正或直接采取一切必要措施（包括但不限于更改或删除会员发布的信息、中断或终止会员使用网络的权利等），以减轻会员不当行为所造成的影响。</p>'+
      '</div><div class="each_service"><p class="service_each_title">5．服务条款的修改</p>'+
      '<p class="service_content">同程有权在必要时修改本服务条款而无需事先通知用户。同程行使该修改权，无需对用户或第三方承担任何责任。'+
      '会员如不同意修改，可以主动选择取消会员资格；如果会员继续使用同程旅游服务，将被视为接受修改后的服务条款。</p></div>'+
      '<div class="each_service"><p class="service_each_title">6．服务内容的修改或中断</p>'+
      '<p class="service_content">鉴于网络服务的特殊性，同程保留随时修改或中断其部分或全部网络服务的权利，并无需通知会员或为此对会员及任何第三方负责。</p>'+
      '</div><div class="each_service"><p class="service_each_title">7．会员隐私保护</p>'+
      '<p class="service_content">同程尊重会员的隐私权，不会公开、编辑或泄露任何有关会员的个人资料以及会员在使用网络服务时存储在同程旅游的非公开内容，但以下情况除外：<br/>'+
      '事先获得会员的明确授权；遵守法律规定或同程旅游合法服务程序；<br/>按照相关政府主管部门的合理要求；<br/>维护社会公众利益；<br/>维护同程的合法权益；<br/>'+
      '符合其他合法要求。</p></div><div class="each_service"><p class="service_each_title">8．中断或终止服务</p>'+
      '<p class="service_content">如发生下列任何一种情形，同程有权随时中断或终止向会员提供本协议项下的网络服务，而无需对会员或任何第三方承担任何责任。<br/>'+
      '会员向同程提供的个人资料不真实。<br/>会员违反本协议的规则或不履行其所承担的义务。<br/>'+
      '除此之外，会员可随时根据需要通知同程终止向该会员提供服务，会员服务终止后，会员使用服务的权利同时终止。自会员服务终止之时起，同程旅游不再对该会员承担任何责任。</p>'+
      '</div><div class="each_service"><p class="service_each_title">9．知识产权</p>'+
      '<p class="service_content">9.1 同程在网络服务中提供的任何文本、图片、图形、音频和视频资料均受版权、商标权以及其他相关法律法规的保护。未经同程事先同意，任何人不能擅自复制、传播这些内容，'+
      '或用于其他任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算机内。<br/>'+
      '9.2 同程为提供网络服务而使用的任何软件（包括但不限于软件中的任何文字、图形、音频、视频资料及其辅助资料）的一切权利属于该软件的著作权人，未经该著作权人同意，'+
      '任何人不得对该软件进行反向工程、反向编译或反汇编。<br/>'+
      '9.3 如有著作权人发现会员在同程旅游发表的内容侵犯其著作 权，并依《互联网著作权行政保护办法》、《信息网络传播保护条例》的规定向同程发出书面通知并提供相关内容的著作权权属证明的，'+
      '同程有权在不事先通知会员的情况下自行移除相关内容，并依法保留相关数据。<br/>'+
      '9.4 若会员对9.3条指向内容依法享有发表权，可以向同程及9.3条指向之著作权人一并发出说明被移除内容不侵犯其著作权的反通知，反通知应为书面形式，并包含如下内容：<br/>'+
      '明确的身份证明、住址、联系方式；<br/>被移除内容的合法性证明；<br/>被移除内容在互联网上的位置；<br/>反通知内容的真实性声明。<br/>符合规定的反通知发出后，同程有权恢复被移除内容。</p></div>'+
      '<div class="each_service"><p class="service_each_title">10．免责声明</p>'+
      '<p class="service_content">10.1 同程对任何因会员不正当或非法使用服务、在网上进行交易、或会员传送信息变动而产生的直接、间接、偶然、特殊及后续的损害不承担责任。<br/>'+
      '10.2 同程对任何他人的威胁性的、诽谤性的、淫秽的、令人反感的或非法的内容或行为或对他人权利的侵犯（包括知识产权）不承担责任；'+
      '并对任何第三方通过服务发送或在服务中包含的任何内容不承担责任。<br/>10.3 会员明确同意其使用同程旅游服务所存在的风险以及使用同程旅游服务产生的一切后果由其自己承担。<br/>'+
      '10.4 对于因不可抗力或同程旅游不能控制的原因造成的网络服务中断或其它缺陷，同程旅游不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。<br/>'+
      '10.5 同程不对所提供之网络服务做任何类型之担保，包括但不限于：<br/>网络服务一定能满足会员要求；<br/>网络服务不会中断；<br/>网络服务的及时性、安全性、准确性。<br/>'+
      '但是同程对不违反规定的特定目的担保不作限制。</p></div><div class="each_service"><p class="service_each_title">11．赔偿</p>'+
      '<p class="service_content">因会员对本服务之使用而导致同程遭受任何来自第三方之纠纷、诉讼及索赔要求，会员同意向同程及其关联企业、职员赔偿相应损失'+
      '（包括合理的律师费），并尽力使之免受损害。</p></div><div class="each_service"><p class="service_each_title">12．通告</p>'+
      '<p class="service_content">所有发给会员的通告都可以通过重要页面的公告、电子邮件以及常规信件的形式传送。</p></div><div class="each_service">'+
      '<p class="service_each_title">13．法律</p><p class="service_content">同程服务条款之效力、解释、执行均适用中华人民共和国法律。'+
      '如发生争议，应提交至有管辖权之人民法院。</p></div><div class="each_service"><p class="service_each_title">14．其他规定</p>'+
      '<p class="service_content">本服务条款中的标题仅为方便而设，在解释本服务条款时应被忽略。</p></div>'+
      '</div><div class="service_back_btn"><a>返回领取</a></div>';