var app,sendNewType = false,recode,tyIndex;
(function () {
var fontSize = null;

var Info = {
    btn_1:'notyet',//宝箱按钮状态，1进行中，2待领取，3已抢光，4已结束
    btn_2:'notyet',
    showPage:'L',
    IsNewMember:$("#IsNew").val(),
    voucher_1:$("#VoucherStatus1").val(),
    voucher_2:$("#VoucherStatus2").val(),
    // voucher_1:"0",
    // voucher_2:"0",
    nowTime:backTime,

    isNeedPhone:$("#PhoneStatus").val() == 1?false:true,
    // isToday:true,
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

    updateTime(backTime);
    //券1
    switch(Info.voucher_1){
        case '0':
            Info.btn_1 = 'notyet';
        break;
        case '4':
            Info.btn_1 = 'guang';
        break;
        case '1':
            Info.btn_1 = 'yet';
        break;
    }
    //券2
    switch(Info.voucher_2){
        case '0':
            Info.btn_2 = 'notyet';
        break;
        case '4':
            Info.btn_2 = 'guang';
        break;
        case '1':
            Info.btn_2 = 'yet';
        break;
    }


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


                    btn_1:Info.btn_1,
                    btn_2:Info.btn_2,
                    nozzle:Info.nozzle,


                    toast:'',//toast提示
                    rule_text:'',
                    service_text:service_texts,

                    flight_5:[
                        // {"StartCity":"上海","StartPort":"SHA","EndCity":"北海","EndPort":"BHY","Price":"398","StartDate":"2018-03-26","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/beihai.jpg","Discount":24,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"丽江","EndPort":"LJG","Price":"670","StartDate":"2018-03-25","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/lijiang.jpg","Discount":24,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"成都","EndPort":"CTU","Price":"440","StartDate":"2018-04-06","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/chengdu.jpg","Discount":25,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"张家界","EndPort":"DYG","Price":"440","StartDate":"2018-03-27","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/zhangjiajie.jpg","Discount":31,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"腾冲","EndPort":"TCZ","Price":"1070","StartDate":"2018-04-06","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/tengchong.jpg","Discount":39,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"西安","EndPort":"XIY","Price":"460","StartDate":"2018-04-22","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/xian.jpg","Discount":33,"Title":null,"Content":null},
                    // {"StartCity":"上海","StartPort":"SHA","EndCity":"北海","EndPort":"BHY","Price":"398","StartDate":"2018-03-26","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/beihai.jpg","Discount":24,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"丽江","EndPort":"LJG","Price":"670","StartDate":"2018-03-25","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/lijiang.jpg","Discount":24,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"成都","EndPort":"CTU","Price":"440","StartDate":"2018-04-06","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/chengdu.jpg","Discount":25,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"张家界","EndPort":"DYG","Price":"440","StartDate":"2018-03-27","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/zhangjiajie.jpg","Discount":31,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"腾冲","EndPort":"TCZ","Price":"1070","StartDate":"2018-04-06","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/tengchong.jpg","Discount":39,"Title":null,"Content":null},{"StartCity":"上海","StartPort":"SHA","EndCity":"西安","EndPort":"XIY","Price":"460","StartDate":"2018-04-22","ReturnDate":null,"TripType":1,"FlightDivision":null,"IsInternational":0,"ImgUrl":"https://file.40017.cn/flight/image/activity/2018/dacu03/chun/xian.jpg","Discount":33,"Title":null,"Content":null},

                    ],

                    p3nav:'p0',
                    p3Index:0,
                    p3navList:['','',''],
                    p3model:[],//guang 抢券按钮状态，
                    p3act:'going',
                    part3time:false,

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
                    tipsP:{
                        text:'活动太火爆啦！<br>同同来不及接客啦！<br>请稍后再试！',
                        btn:'知道啦',
                        img:true,
                    },

              },

              methods:{
                    showRule:function(n){
                        switch(n){
                            case 1:
                                app.rule_text = rule_texts_1;
                            break;
                            case 2:
                                app.rule_text = rule_texts_2;
                            break;
                            case 3:
                                app.rule_text = rule_texts_3;
                            break;
                        }
                        app.showPop('rule');
                    },
                    goIndex:function(){
                        window.location.href = 'http://wx.17u.cn/home/index.html?type=1&refid='+Brefid;
                    },
                    goIndex2:function(){
                        window.location.href = 'http://wx.17u.cn/home/index.html?type=5&refid='+Brefid;
                    },
                    goPrizeList:function(){
                        window.location.href = 'MyPrize.html?refid='+Brefid;
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
                    showShare:function(){
                        showPop('share');
                        $('.mask').on('click',function(){
                            closePop('share');
                            $('.mask').off('click');
                        })
                    },
                    showService:function(){
                        $(".page_1").css('display','none');
                        $(".service").css('display','block');
                        $('body').css({position:'static','overflow':'hidden'});
                    },
                    //航线跳转
                    goFlight:function(event){
                        var ele = event.currentTarget;
                        var scity = $(ele).attr('data-scity'),ecity = $(ele).attr('data-ecity'),
                        sname = $(ele).attr('data-sname'),ename = $(ele).attr('data-ename'),
                        date = $(ele).attr('data-date');
                        var IsInternational = $(ele).attr('data-IsInternational')
                        console.log(scity,ecity,sname,ename,date);
                        if(IsInternational == 1){
                            var TripType = $(ele).attr('data-Type');
                            if(TripType == 0){
                                window.location.href = 'http://wx.17u.cn/wxiflightnfe/book1.html/'+scity+'/'+ecity+'/'+sname+'/'+ename+'/'+date+'/1900-01-01/single/1/0?showwxpaytitle=1&RefId='+Brefid;
                            }else{
                                var rdate = $(ele).attr('data-rdate');
                                window.location.href = 'http://wx.17u.cn/wxiflightnfe/book1.html/'+scity+'/'+ecity+'/'+sname+'/'+ename+'/'+date+'/'+rdate+'/go/1/0?showwxpaytitle=1&RefId='+Brefid;
                            }
                        }else{
                            window.location.href = 'http://wx.17u.cn/flightnew/list/'+scity+'/'+ecity+'/'+encodeURIComponent(sname)+'/'+encodeURIComponent(ename)+'/'+date+'?showwxpaytitle=1&childticket=0,0&RefId='+Brefid;
                        }
                    },
                    //part_6table切换
                    changeNav:function(index,event){
                        app.p3Index = index;
                        app.p3act = app.p3model[app.p3Index];
                        app.p3nav = 'p'+index;
                        clearInterval(CTS);
                        clearInterval(CTE);
                        //
                        var today = Info.nowTime.substr(0,10);

                        if(app.p3model[app.p3Index] == 'over'){
                            app.part3time = false
                        }else if(app.p3model[app.p3Index] == 'going'){
                            app.part3time = true
                            var td;

                            switch(app.p3Index){
                                case 0:
                                    td = '2018/04/18 10:00:00';
                                break;
                                case 1:
                                    td = '2018/04/21 10:00:00';
                                break;
                                case 2:
                                    td = '2018/04/25 10:00:00';
                                break;
                            }
                            cutTimeStart(backTime,td);
                        }else if(app.p3model[app.p3Index] == 'ing'){
                            app.part3time = true
                            var td = today +' 10:10:00';
                            cutTimeEnd(backTime,td);
                        }
                    },
                    closeInput:function(){
                        //关闭弹窗时，恢复按钮状态
                        if(app.nozzle == 1){
                           app.btn_1 = 'notyet';
                        }else if(app.nozzle == 2){
                            app.btn_2 = 'notyet';
                        }
                        closePop('input');
                    },
                    common:function(event){
                        var ele = event.currentTarget;
                        var text = $(ele).attr('class');

                        if(text == 'ing'){
                            Seckill();
                            // showPop('fail');
                        }
                    },
                    //领券
                    getVoucher:function(type,event){
                        var ele = event.currentTarget;
                        var text = $(ele).parent().attr('data-statu');
                        if(Info.IsNewMember != 1){
                            app.fail={
                                    img:'//file.40017.cn/flight/image/activity/2018/memberday04/fail_1.png',
                                    text:'领取失败！<br>只有新会员才可以领取哦<br>快去通知新伙伴领取吧~',
                                    btn:'分享给好友'
                                }
                            showPop('fail');
                            return;
                        }
                        switch(text){
                            case 'notyet':
                                $("#wrap input").val('');
                                if(type == 1){
                                    app.btn_1 = 'not';
                                    app.isNeedName = true;
                                    if(Info.isNeedPhone){
                                        app.isNeedPhone = true;
                                        app.isNeedCheckPhone = true;
                                    }else{
                                        app.isNeedPhone = false;
                                        app.isNeedCheckPhone = false;
                                    }
                                    app.nozzle = 1;
                                    if(Info.IsOldMember == 1){
                                        app.input={
                                            title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                                            tips_1:'',
                                            class:'yes',
                                            name:'提交领券'
                                        };
                                    }else{
                                        app.input={
                                            title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                                            tips_1:'',
                                            class:'yes',
                                            name:'提交领券'
                                        };
                                    }
                                    showPop('input');
                                }else{
                                    app.btn_2 = 'not';
                                    app.nozzle = 2;
                                    app.isNeedName = false;
                                    if(Info.isNeedPhone){
                                        app.isNeedPhone = true;
                                        app.isNeedCheckPhone = true;
                                    }else{
                                        app.isNeedPhone = false;
                                        app.isNeedCheckPhone = false;
                                    }
                                    if(Info.IsOldMember == 1){
                                        app.input={
                                            title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                                            tips_1:'',
                                            class:'yes',
                                            name:'提交领券'
                                        };
                                    }else{
                                        app.input={
                                            title:'<img src="//file.40017.cn/flight/image/activity/2018/memberday04/1.png" style="width:3.46rem;">',
                                            tips_1:'',
                                            class:'yes',
                                            name:'提交领券'
                                        };
                                    }
                                }
                                if(!app.isNeedName&&!app.isNeedPhone){
                                    getVouchers('','','');
                                }else{
                                   showPop('input');
                                }

                            break;
                            case 'yet':
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
                                if(p_s == 1){
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
                                                            if(app.nozzle != 3){
                                                                getVouchers(phone,ma,name);
                                                            }else{
                                                                sendInfo(phone,ma,name);
                                                            }

                                                        }else{
                                                            app.input.tips_1 = '*请阅读并勾选《同程旅游服务条款》';
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
                                                        if(app.nozzle != 3){
                                                            getVouchers(phone,ma,'');
                                                        }else{
                                                            sendInfo(phone,ma,'');
                                                        }

                                                    }else{
                                                        app.input.tips_1 = '*请阅读并勾选《同程旅游服务条款》';
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
                                                if(app.nozzle != 3){
                                                    getVouchers(phone,'',name);
                                                }else{
                                                    sendInfo(phone,'',name);
                                                }

                                            }else{
                                                app.input.tips_1 = n_s;
                                                app.input.class = 'yes';
                                                app.input.name = '提交领券';
                                            }
                                        }else{
                                            if(is_checked){
                                                console.log('phone,noma,noname');
                                                if(app.nozzle != 3){
                                                    getVouchers(phone,'','');
                                                }else{
                                                    sendInfo(phone,'','');
                                                }

                                            }else{
                                                app.input.tips_1 = '*请阅读并勾选《同程旅游服务条款》';
                                                app.input.class = 'yes';
                                                app.input.name = '提交领券';
                                            }
                                        }
                                    }
                                }else if(p_s == 2){
                                    closePop('input');
                                    app.input.class='yes';
                                    app.input.name='提交领券';
                                    app.fail={
                                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                                        text:'抱歉，奖品领完啦，<br>下次再来吧~',
                                        btn:'知道啦'
                                    }
                                    showPop('fail');
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
                                        if(app.nozzle != 3){
                                            getVouchers('','',name);
                                        }else{
                                            sendInfo('','',name);
                                        }

                                    }else{
                                        app.input.tips_1 = '*请阅读并勾选《同程旅游服务条款》';
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
                                if(app.nozzle != 3){
                                    getVouchers('','','');
                                }else{
                                    sendInfo('','','');
                                }

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
              }

    })



    getFlights();

    //时间判断
    //
    //
    var ntime = Info.nowTime.substr(0,10);
    if(new Date(Info.nowTime)<new Date('2018/04/20 22:59:59')){
        app.p3Index = 0;
        app.p3nav = 'p' + app.p3Index;

        if(new Date(Info.nowTime)>new Date('2018/04/17 23:59:59')){
            var todayS = ntime + ' 10:00:00';
            var todayE = ntime + ' 10:09:59';
            if(new Date(Info.nowTime)>new Date(todayS)){
                if(new Date(Info.nowTime)>new Date(todayE)){
                    app.p3model = ['over','going','going'];
                }else{
                    app.part3time = true;
                    cutTimeEnd(backTime,todayE);
                    if($("#SkillStatus0").val() != 1){
                        app.p3model = ['ing','going','going'];
                    }else{
                        app.p3model = ['guang','going','going'];
                    }

                }
            }else{
                app.part3time = true;
                cutTimeStart(backTime,todayS);
                app.p3model = ['going','going','going'];
            }

        }else{
            // Info.isToday = false;
            app.part3time = true;
            cutTimeStart(backTime,'2018/04/18 10:00:00');
            app.p3model = ['going','going','going'];
        }

        app.p3act = app.p3model[app.p3Index];
    }else if(new Date(Info.nowTime)>new Date('2018/04/20 22:59:59') && new Date(Info.nowTime)<new Date('2018/04/24 22:59:59')){
        app.p3Index = 1;
        app.p3nav = 'p' + app.p3Index;

        var todayS = ntime + ' 10:00:00';
        var todayE = ntime + ' 10:10:00';
        if(ntime == '2018/04/20'){
            app.part3time = true;
            cutTimeEnd(backTime,'2018/04/21 10:00:00');
            app.p3model = ['over','going','going'];
        }else{
            if(new Date(Info.nowTime)>new Date(todayS)){
                if(new Date(Info.nowTime)>new Date(todayE)){
                    app.p3model = ['over','over','going'];
                }else{
                    app.part3time = true;
                    cutTimeEnd(backTime,todayE);
                    if($("#SkillStatus1").val() != 1){
                        app.p3model = ['over','ing','going'];
                    }else{
                        app.p3model = ['over','guang','going'];
                    }
                }
            }else{
                app.part3time = true;
                cutTimeStart(backTime,todayS);
                app.p3model = ['over','going','going'];
            }
        }


        app.p3act = app.p3model[app.p3Index];
    }else if(new Date(Info.nowTime)>new Date('2018/04/24 22:59:59') && new Date(Info.nowTime)<new Date('2018/04/26 23:59:59')){
        app.p3Index = 2;
        app.p3nav = 'p' + app.p3Index;

        var todayS = ntime + ' 10:00:00';
        var todayE = ntime + ' 10:10:00';
        if(ntime == '2018/04/24'){
            app.part3time = true;
            cutTimeEnd(backTime,'2018/04/25 10:00:00');
            app.p3model = ['over','over','going'];
        }else{
            if(new Date(Info.nowTime)>new Date(todayS)){
                if(new Date(Info.nowTime)>new Date(todayE)){
                    app.p3model = ['over','over','over'];
                }else{
                    app.part3time = true;
                    cutTimeEnd(backTime,todayE);
                    if($("#SkillStatus2").val() != 1){
                        app.p3model = ['over','over','ing'];
                    }else{
                        app.p3model = ['over','over','guang'];
                    }

                }
            }else{
                app.part3time = true;
                cutTimeStart(backTime,todayS);
                app.p3model = ['over','over','going'];
            }
        }


        app.p3act = app.p3model[app.p3Index];
    }else{
        app.p3Index = 2;
        app.p3nav = 'p' + app.p3Index;
        app.p3model = ['over','over','over'];
        app.p3act = app.p3model[app.p3Index];

        // cutTimeEnd(backTime,'2018',$(".p4_time"));
    }




    $(document).on('click','.fail .p_wrap button',function(){
        var _this = $(this);
        var t = _this.html();
        if(t == '分享给好友'){
            // closePop('tipsP');
            app.showShare();
        }
    })

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
function getVouchers(p,m,n){
    var ty = 0;
    if(app.nozzle == 2){
        ty = 1;
    }
    $.ajax({
        url: 'GetVoucher.html',
        dataType: 'json',
        data:{
            phoneNo:p,
            name:n,
            validateCode:m,
            type:ty,
        },
        type: 'GET',
        success: function(res) {
            // res = {"RspCode":302,"RspMsg":"成功","Prize":{"RecordId":139551058,"ActId":0,"PrizeId":0,"PrizeCode":"10003","PrizeType":2,"PrizeName":"国内机票抵用券","GetTime":"2018-03-27 15:21:23","SendStatus":1}};
            switch(res.RspCode){
                case 200:
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    // showPop('bigSuc');
                    if(app.nozzle == 1){
                        app.getV = '//file.40017.cn/flight/image/activity/2018/DoubleFestival/v-2.png';
                        app.btn_1 = 'yet';
                        app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_1.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_3.png',
                                btn_1:'立即使用',
                                btn_2:'点击查看'
                            }
                    }else{
                        app.getV = '//file.40017.cn/flight/image/activity/2018/DoubleFestival/v-4.png';
                        app.btn_2 = 'yet';
                        app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_1.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_4.png?v=2',
                                btn_1:'立即使用',
                                btn_2:'点击查看'
                            }
                    }

                    showPop('suc');
                    Info.isNeedPhone = false;
                break;
                case 500:
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    if(app.nozzle == 1){
                        app.btn_1 = 'yet';
                    }else{
                        app.btn_2 = 'yet';
                    }
                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'您已经领取过啦！<br>请不要重复领取哦~',
                        btn:'知道啦'
                    }
                    showPop('fail');
                break;
                case 501:
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    if(app.nozzle == 1){
                        app.btn_1 = 'guang';
                    }else{
                        app.btn_2 = 'guang';
                    }

                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'抱歉，奖品领完啦，<br>下次再来吧~',
                        btn:'知道啦'
                    }
                    showPop('fail');
                break;
                case 303:
                    app.input.tips_1 = '*请填写手机号';
                break;
                case 301:
                    app.input.tips_1 = '*请填写验证码';
                break;
                case 302:
                    app.input.tips_1 = '*请输入正确的验证码 ';
                break;
                case 403:
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/fail_1.png',
                        text:'领取失败！<br>只有新会员才可以领取哦<br>快去通知新伙伴领取吧~',
                        btn:'分享给好友'
                    }
                    showPop('fail');
                break;
                default:
                    if($('.mask').css('display') == 'block'){
                        closePop('input');
                    }
                    if(app.nozzle == 1){
                        app.btn_1 = 'guang';
                    }else{
                        app.btn_2 = 'guang';
                    }

                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'抱歉，奖品领完啦，<br>下次再来吧~',
                        btn:'知道啦'
                    }
                    showPop('fail');
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
//秒杀
function Seckill(){
    $.ajax({
        url: 'Seckill.html',
        dataType: 'json',
        data:{
            type:app.p3Index,
        },
        type: 'GET',
        success: function(res) {
            // res = {"RspCode":200,"RspMsg":"成功","Prize":{"RecordId":6652721,"ActId":2350,"PrizeId":3390,"PrizeCode":"10000","PrizeType":2,"PrizeName":"国内机票抵用券","GetTime":"2018-03-26 16:38:28","SendStatus":0}};
            switch(res.RspCode){
                case 200:
                    recode = res.Prize.RecordId;
                    // app.suc.title = '//file.40017.cn/flight/image/activity/2018/memberday04/sm_2.png';
                    switch(app.p3Index){
                        case 0:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_2.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_1.png',
                                btn_1:'立即领取 ',//国内
                                btn_2:''
                            }
                        break;
                        case 1:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_2.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_2.png',
                                btn_1:'立即领取',//国际
                                btn_2:''
                            }
                        break;
                        case 2:
                            app.suc={
                                title:'//file.40017.cn/flight/image/activity/2018/memberday04/sm_2.png',
                                img:'//file.40017.cn/flight/image/activity/2018/memberday04/sv_5.png',
                                btn_1:'填写领取信息',
                                btn_2:''
                            }
                        break;
                    }
                    showPop('suc');
                break;
                case 501:
                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'抱歉，奖品领完啦，<br>下次再来吧~',
                        btn:'知道啦'
                    }
                    showPop('fail');
                break;
                default:
                    app.fail={
                        img:'//file.40017.cn/flight/image/activity/2018/memberday04/seach.png',
                        text:'抱歉，奖品领完啦，<br>下次再来吧~',
                        btn:'知道啦'
                    }
                    showPop('fail');

            }

        },
        error: function(res){

        },
        complete: function() {

        }
    });
}
//获取航线
function getFlights(){
    $.ajax({
        url: 'GetLines.html',
        dataType: 'json',
        type: 'GET',
        success: function(res) {

            switch(res.RspCode){
                case 200:

                    app.flight_5 = res.Lines;
                    // if(app.flight_5.length%2 != 0){
                    //     $(".part_5 ul .bu").remove();
                    //     $(".part_5 ul .more").before('<li class="bu"></li>');
                    // }else{
                    //     $(".part_5 ul .bu").remove();
                    // }

                break;
            }

        },
        error: function(res){

        },
        complete: function() {

        }
    });
}
//结束倒计时
var CTE;
function cutTimeEnd(startTime,endTime,element,index){
    var sT = startTime,eT = endTime,_this = element;

    if(typeof(sT) == 'string'){
        sT = new Date(startTime);
    }
    if(typeof(eT) == 'string'){
        eT = new Date(endTime);
    }
    var t =eT.getTime() - sT.getTime();

    CTE = setInterval(function(){
        t = t-1000;
        var d=0,h=0,m=0,s=0;
        // console.log(endTime);
        if(t>=0){
            d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
        }else{
            clearInterval(CTE);
            app.part3time = false;
            app.p3model.splice(app.p3Index, 1, 'over');
            app.p3act = app.p3model[app.p3Index];

        }
        if(d > 0){
            $(".part_3 .time").html('距结束：<b>'+ checkTime(d) +'</b>天<b>' + checkTime(h) +'</b>时<b>'+ checkTime(m) +'</b>分<b>' + checkTime(s) + '</b>秒');
        }else{
            // if(new Date(backTime) > new Date('2018/03/26 10:00:00')){
            //     $(".part_3 .time").html('已结束');
            // }else{
                $(".part_3 .time").html('距结束：<b>'+ checkTime(h) +'</b>时<b>' + checkTime(m) +'</b>分<b>'+ checkTime(s) +'</b>秒');
            // }

        }


    },1000);
}

//开始倒计时
var CTS;
function cutTimeStart(startTime,endTime,element,index){
    var sT = startTime,eT = endTime,_this = element;

    if(typeof(sT) == 'string'){
        sT = new Date(startTime);
    }
    if(typeof(eT) == 'string'){
        eT = new Date(endTime);
    }
    var t =eT.getTime() - sT.getTime();

    CTS = setInterval(function(){
        t = t-1000;
        var d=0,h=0,m=0,s=0;

        if(t>0){
            d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
        }else{
            clearInterval(CTS);
            app.p3model.splice(app.p3Index, 1, 'ing');
            app.p3act = app.p3model[app.p3Index];
            var cutTime = Info.nowTime.substr(0,10) + ' 10:10:00';
            cutTimeEnd(backTime,cutTime);
        }
        if(d > 0){
            $(".part_3 .time").html('距开始：<b>'+ checkTime(d) +'</b>天<b>' + checkTime(h) +'</b>时<b>'+ checkTime(m) +'</b>分<b>' + checkTime(s) + '</b>秒');
        }else{
            $(".part_3 .time").html('距开始：<b>'+ checkTime(h) +'</b>时<b>' + checkTime(m) +'</b>分<b>'+ checkTime(s) +'</b>秒');
        }

    },1000);
}

function checkTime(i){
    return i < 10 ? "0" + i : i;
}

window.onload = function() {
    ini();
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
var rule_texts_1 = '<p>1.活动时间为：2018年4月16日00:00:00-2018年4月26日23:59:59；</p>'
                +'<p>2.福利专区，奖品包括30元国内机票抵用券、30元国际机票抵用券，仅限新用户领取；</p>'
                +'<p>3.“抵用券”获得后，会直接通过系统发放，机票抵用券请于领取后7天内使用；</p>'
                +'<p>4.您的历史奖品记录可在“我的奖品”中查看；</p>'
                +'<p>5.在活动期间，用户如果出现违规行为（包括但不限于作弊领取、虚假交易等），同程旅游将取消用户的活动资格，必要时同程旅游将追究违规用户的法律责任。</p>';
var rule_texts_2 = '<p>1. 活动时间：2018年4月18日-2018年4月26日，每天10:00整点秒杀，数量有限，先到先得；</p>'
                +'<p>2. 2018年4月18日-2018年4月20日，秒杀奖品为100元国内机票抵用券，限购买海南航空国内任意航班使用；</p>'
                +'<p>3. 2018年4月21日-2018年4月24日，秒杀奖品为100元国际机票抵用券，限购买海南航空国际（含港澳台）任意航班使用；</p>'
                +'<p>4. 2018年4月25日-2018年4月26日，秒杀奖品为海南航空提供的国内单程免费机票 ；中奖用户请填写详细信息，工作人员将于活动结束后7个工作日内联系中奖用户，预订所需机票；适用航线及航班：HU/CN国内自营航班（包机及代码共享航班除外）；免费机票有效期：2018年7月1日至2019年6月30日内（含）有效；其中燃油费税费需用户自理，免票不支持退票、改期、改签，不得转让他人使用；</p>'
                +'<p>5. “抵用券”获得后，会直接通过系统发放，机票抵用券请于领取后7天内使用；</p>'
                +'<p>6. 您的奖品记录可在“我的奖品”中查看；</p>'
                +'<p>7. 在活动期间，用户如果出现违规行为（包括但不限于作弊领取、虚假交易等），同程旅游将取消用户的活动资格，必要时同程旅游将追究违规用户的法律责任。</p>';
var rule_texts_3 = '<p>1.因机票价格实时变动，本活动页面价格以实际详情页显示为准；</p>'
                +'<p>2.变更和退票规则：以实际舱位客规为准；</p>'
                +'<p>3.活动列明价格均为机票价格，不含各种税费和机场建设费。</p>';

})();



