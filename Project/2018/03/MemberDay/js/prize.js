var app,sendNewType = false,tyIndex = '';
(function () {
var fontSize = null;

var Info = {
    showPage:'L',

    isNeedPhone:$("#PhoneStatus").val() == 1?false:true,
    goto:'',//定位到指定位置
}
function ini(){
    var Request = new Object();
        Request = GetRequest();
    var refid = Request["refid"];
    var RefId = Request["RefId"];

    if(refid!=undefined){
        Brefid = refid;
    }else if(RefId!=undefined){
        Brefid = RefId;
    }

    var goto = Request["goto"];

    if(goto!=undefined){
        Info.goto = goto;
    }

    fontSize = Number($("html").css("font-size").replace(/px/,''));

    start();
}

function start(){

    app = new Vue({
              el: '#wrap',
              data: {
                    showPage:Info.showPage,
                    isNeedCheckPhone:Info.isNeedPhone,//是否绑定
                    isNeedPhone:Info.isNeedPhone,//是否填写过手机号
                    isNeedName:false,

                    toast:'',//toast提示
                    nozzle:0,
                    p3Index:0,

                    prizeList_1:[{"Record":"6668910","Name":"国内机票抵用券","Status":1,"Code":"10003"},{"Record":"6661867","Name":"国际机票抵用券","Status":1,"Code":"10002"},{"Record":"6657451","Name":"国内机票抵用券","Status":1,"Code":"10001"},{"Record":"F050933059593715240240","Name":"4月会员日活动-秒杀专区","Status":1,"Code":"F248336109616238776000"},{"Record":"6657493","Name":"免费机票","Status":1,"Code":"10000"}],
                    prizeList_2:[{"Record":"6668910","Name":"国内机票抵用券","Status":1,"Code":"<10001></10001>"}],

                    //信息输入框弹窗
                    input:{
                        title:'',
                        tips_1:'',
                        tips_2:'',
                        tips_3:'',
                        tips_4:'',
                        tips_5:'',
                        class:'yes',
                        name:'提交领券'
                    },
                    suc:{
                        title:'',
                        img:'',
                        btn_1:'立即使用',
                        btn_2:''
                    },
                    fail:{
                        img:'',
                        text:'领取失败！<br>只有新会员才可以领取哦<br>快去通知新伙伴领取吧~',
                        btn:'知道啦'
                    },

                    flightList:[],
              },

              methods:{
                    showRule:function(n){
                        app.showPop('rule');
                    },
                    goIndex:function(){
                        alert('跳转1');
                    },
                    goIndex2:function(){
                       alert('跳转2');
                    },
                    goback:function(){
                        window.location.href = 'Index.html?refid='+Brefid;
                    },
                    closePop:function(n){
                        closePop(n);
                    },
                    showPop:function(n){
                        showPop(n);
                    },
                    showToast:function(){
                        showToast();
                    },
                    showService:function(){
                        $(".page_1").css('display','none');
                        $(".service").css('display','block');
                        $('body').css({position:'static','overflow':'hidden'});
                    },
                    closeInput:function(){
                        //关闭弹窗时，恢复按钮状态
                        $('.list_2 ul li').eq(tyIndex).find('button').attr('class','notyet');
                        closePop('input');
                    },
                    goFlight:function(){
                        app.goIndex();
                    },
                    //领券
                    getVoucher:function(event){
                        var ele = event.currentTarget;
                        var text = $(ele).attr('class');


                        switch(text){
                            case 'notyet':
                                $("#wrap input").val('');

                                $(ele).attr('class','not');
                                var c = $(ele).attr('data-code')
                                recode =  $(ele).attr('data-rcode');
                                tyIndex = $(ele).parent().index();

                                if(Info.isNeedPhone){
                                    app.isNeedPhone = true;
                                    app.isNeedCheckPhone = true;
                                }else{
                                    app.isNeedPhone = false;
                                    app.isNeedCheckPhone = false;
                                }
                                if(c != '10000' && c != '10001' && c != '10003'){
                                    app.isNeedName = false;
                                }else{
                                    app.isNeedName = true;
                                }
                                switch(c){
                                    case '10000':
                                        app.p3Index = 2;
                                    break;
                                    case '10001':
                                        app.p3Index = 0;
                                    break;
                                    default:
                                        app.p3Index = 1;
                                }
                                // app.nozzle = 1;

                                app.input={
                                    title:'<img src="images/1.png" style="width:3.46rem;">',
                                    tips_1:'',
                                    class:'yes',
                                    name:'提交领券'
                                };

                                if(!app.isNeedName&&!app.isNeedPhone){
                                    sendInfo('','','');
                                }else{
                                   showPop('input');
                                }

                            break;
                            case 'yet':
                                app.goIndex();
                                // window.location.href = 'MyPrizeListPage.html?refid='+Brefid;
                            break;
                            case 'guang':
                                console.log('guang')
                            break;
                            case 'over':
                                console.log('over')
                            break;

                        }
                    },
                    sendMa:function(event){
                        var ele = event.currentTarget;
                        var name = $(ele).attr('class');
                        if($(ele).hasClass('ma')){
                            var p = $('#phone').val();
                            var s = check_p(p);
                            if(s == 1){
                                p = p.replace(/\D/g,'');
                                SendMa(p);
                            }else{
                                app.input.tips_1 = s;
                            }
                        }
                    },
                    checkInput:function(event){
                        //@param {Number} type 区分活动进行中和活动结束时调用
                        var ele = event.currentTarget;
                        var text = $(ele).attr('class');
                        var t = $(ele).attr('type');

                        if(text == 'yes'){
                            app.input.class = 'ing';
                            app.input.name = '提交中';

                            if(app.isNeedPhone){
                                var phone = $('.phone').val().replace(/\D/g,'');
                                var p_s = check_p(phone);
                                if(p_s == 1 || p_s == 2){
                                    //手机号码格式正确
                                    if(app.isNeedCheckPhone){
                                        //需要验证手机号
                                        var ma = $('#zheng').val();
                                        if(ma != ''){
                                            if(ma.length<3 || ma.length>8){
                                                app.input.tips_1 = '*请输入正确的短信验证码';
                                                app.input.class = 'yes';
                                                app.input.name = '提交领券';
                                            }else{
                                                if(app.isNeedName){//需要姓名
                                                    var name = $('#name').val();
                                                    var n_s = check_n(name);
                                                    if(n_s == 1){
                                                        if(is_checked){
                                                            console.log('phone,ma,name');
                                                           //  if(p_s == 2){
                                                           //      closePop('input');
                                                           //      app.input.class='yes';
                                                           //      app.input.name='提交领券';
                                                           //      app.fail={
                                                           //          img:'images/seach.png',
                                                           //          text:'抱歉，奖品领完啦，<br>下次再来吧~',
                                                           //          btn:'知道啦'
                                                           //      }
                                                           //      showPop('fail');
                                                           // }else{
                                                                sendInfo(phone,ma,name);
                                                           // }

                                                        }else{
                                                            app.input.tips_1 = '*请阅读并勾选《服务条款》';
                                                            app.input.class = 'yes';
                                                            app.input.name = '提交领券';
                                                        }

                                                    }else{
                                                        app.input.tips_1 = n_s;
                                                        app.input.class = 'yes';
                                                        app.input.name = '提交领券';
                                                    }
                                                }else{
                                                    if(is_checked){
                                                        console.log('phone,ma,noname');
                                                        // if(p_s == 2){
                                                        //         closePop('input');
                                                        //         app.input.class='yes';
                                                        //         app.input.name='提交领券';
                                                        //         app.fail={
                                                        //             img:'images/seach.png',
                                                        //             text:'抱歉，奖品领完啦，<br>下次再来吧~',
                                                        //             btn:'知道啦'
                                                        //         }
                                                        //         showPop('fail');
                                                        //    }else{
                                                                sendInfo(phone,ma,'');
                                                           // }

                                                    }else{
                                                        app.input.tips_1 = '*请阅读并勾选《服务条款》';
                                                        app.input.class = 'yes';
                                                        app.input.name = '提交领券';
                                                    }
                                                }
                                            }
                                        }else{
                                            app.input.tips_1 = '*请输入短信验证码';
                                            app.input.class = 'yes';
                                            app.input.name = '提交领券';
                                        }
                                    }else{
                                        //不需要验证手机号
                                        if(app.isNeedName){//需要姓名
                                            var name = $('#name').val();
                                            var n_s = check_n(name);
                                            if(n_s == 1){
                                                console.log('phone,noma,name');
                                               //  if(p_s == 2){
                                               //      closePop('input');
                                               //      app.input.class='yes';
                                               //      app.input.name='提交领券';
                                               //      app.fail={
                                               //          img:'images/seach.png',
                                               //          text:'抱歉，奖品领完啦，<br>下次再来吧~',
                                               //          btn:'知道啦'
                                               //      }
                                               //      showPop('fail');
                                               // }else{
                                                    sendInfo(phone,'',name);
                                               // }

                                            }else{
                                                app.input.tips_1 = n_s;
                                                app.input.class = 'yes';
                                                app.input.name = '提交领券';
                                            }
                                        }else{
                                            if(is_checked){
                                                console.log('phone,noma,noname');
                                               //  if(p_s == 2){
                                               //      closePop('input');
                                               //      app.input.class='yes';
                                               //      app.input.name='提交领券';
                                               //      app.fail={
                                               //          img:'images/seach.png',
                                               //          text:'抱歉，奖品领完啦，<br>下次再来吧~',
                                               //          btn:'知道啦'
                                               //      }
                                               //      showPop('fail');
                                               // }else{
                                                    sendInfo(phone,'','');
                                               // }

                                            }else{
                                                app.input.tips_1 = '*请阅读并勾选《服务条款》';
                                                app.input.class = 'yes';
                                                app.input.name = '提交领券';
                                            }
                                        }
                                    }
                                }else{
                                    app.input.tips_1 = p_s;
                                    app.input.class = 'yes';
                                    app.input.name = '提交领券';
                                }
                            }else if(app.isNeedName){
                                var name = $('#name').val();
                                var n_s = check_n(name);
                                if(n_s == 1){
                                    if(is_checked){
                                        console.log('nophone,noma,name');
                                        sendInfo('','',name);
                                    }else{
                                        app.input.tips_1 = '*请阅读并勾选《服务条款》';
                                        app.input.class = 'yes';
                                        app.input.name = '提交领券';
                                    }

                                }else{
                                    app.input.tips_1 = n_s;
                                    app.input.class = 'yes';
                                    app.input.name = '提交领券';
                                }
                            }else{
                                console.log('nophone,noma,noname');
                                sendInfo('','','');
                            }
                        }
                    },
              },
              filters:{
                    //折扣
                    zhe:function(n){
                        if(n>0&&n<100){
                            return n/10;
                        }else{
                            return 10;
                        }
                    },
                    getImg:function(code,s){
                        switch(code){
                            case '10000':
                                if(s == 1){
                                    return 'images/prize_v6.png';
                                }else{
                                    return 'images/prize_v5.png';
                                }

                            break;
                            case '10001':
                                return 'images/prize_v3.png';
                            break;
                            default:
                                return 'images/prize_v4.png';
                        }
                    },
                    getStatus:function(s,code){
                        switch(code){
                            case '10000':
                                if(s == 1){
                                    return '';
                                }else{
                                    return '填写领取信息';
                                }

                            break;
                            case '10001':
                                if(s == 1){
                                    return '立即使用';
                                }else{
                                    return '立即领取';
                                }
                            break;
                            default:
                                if(s == 1){
                                    return '立即使用';
                                }else{
                                    return '立即领取';
                                }
                        }
                    }
              }

    })



    // getInfo();


    setTimeout(function(){
       loadEnd();
       if(Info.goto != undefined){
           setTimeout(function(){
                window.location.hash = Info.goto;
           },100);
       }
    },1000)

}

//领券
function getInfo(){
    $.ajax({
        url: 'PrizeList.html',
        dataType: 'json',
        type: 'GET',
        success: function(res) {
            // res = {"RspCode":200,"RspMsg":"成功","PrizeList":[{"Record":"6657451","Name":"国内机票抵用券","Status":0,"Code":"10001"},{"Record":"F050933059593715240240","Name":"4月会员日活动-秒杀专区","Status":0,"Code":"F248336109616238776000"},{"Record":"6657493","Name":"免费机票","Status":0,"Code":"10000"}]};
            switch(res.RspCode){
                case 200:
                    for(var i=0;i<res.PrizeList.length;i++){
                        if(res.PrizeList[i].Code == '10002' || res.PrizeList[i].Code == '10003'){
                            app.prizeList_1.push(res.PrizeList[i]);
                        }else{
                            app.prizeList_2.push(res.PrizeList[i]);
                        }
                    }

                break;
            }

        },
        error: function(res){

        },
        complete: function() {
            app.input.class='yes';
            app.input.name='提交领券';
        }
    });
}




function checkTime(i){
    return i < 10 ? "0" + i : i;
}

window.onload = function() {
    ini();
}

// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }


})();



