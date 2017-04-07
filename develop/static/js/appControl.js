/**
 * Created by jessic on 2017/4/1.
 */
var Vue=require('vue');
var $=require('jquery');
var vueResource=require('vue-resource');
Vue.use(vueResource);
var commondirective=-require('./mylibs/common_directive');
var definedValidator=require('./mylibs/validator');
var components=require('./mylibs/components');
module.exports={
    registerControl:function(){
        var vm=new Vue({
            el:"#register",
            data:{
                isShow:false,
                requestData:{
                    username:"",
                    phonenum:"",
                    identity:"",
                    type:[],
                    wechatname:"",
                    pic:"",
                    openId:"",
                    verifycode:""
                },
                typeName:[
                    {
                        index:0,
                        name:"水电工",
                        isSelect:false
                    },
                    {
                        index:1,
                        name:"泥水工",
                        isSelect:false
                    },
                    {
                        index:2,
                        name:"木工",
                        isSelect:false
                    },
                    {
                        index:3,
                        name:"油漆工",
                        isSelect:false
                    }
                ],
                btnRegClass:false,
                btnRegDisable:false,
                btnVerDisable:false,
                btnVerText:"获取验证码",
                timeValue:60,
                timer:null,
                loading:true,
                isSelect:false,
                selectValue:"",
                verifyField:{
                    isNameNull:false,
                    isPhoneNull:false,
                    isPhoneTestFalse:false,
                    isIdentityNull:false,
                    isIdentityTestFalse:false,
                    isVerifycodeNull:false,
                    isWorktypeNull:false
                },
                isValid:true,
                modalObj:{
                    isShow:false,
                    transitionType:"slide-fade"
                }
            },
            mounted: function () {
                var self=this;
                self.isShow=true;

            },
            methods:{
                changeStatus:function(index){//选择工种
                    var self=this;
                    self.typeName[index].isSelect=!self.typeName[index].isSelect;
                },
                verifyRequest: function () {//获取验证码
                    var self=this;
                    self.btnVerText=self.timeValue+"s";
                    //倒计时
                    timeDeal(self);
                    self.timer=setInterval(function(){
                        timeDeal(self);
                    },1000);
                    function timeDeal(self){
                        if(self.timeValue==0){
                            clearInterval(self.timer);
                            self.btnVerText="获取验证码";
                            self.btnVerDisable=false;
                            self.timeValue=60;
                        }else{
                            self.btnVerDisable=true;
                            self.btnVerText=self.timeValue+"s";
                            self.timeValue--;
                        }
                    }

                    //请求接口
                },
                registerRequest:function(){//注册
                    var self=this;
                    self.typeName.filter(function(item,key){
                        if(item.isSelect){
                            self.requestData.type.push(item.name);
                        }
                    });
                    //对字段进行判断
                    if(self.requestData.type.length==0){
                        self.verifyField.isWorktypeNull=true;
                    }

                    self.testName();
                    self.testPhone();
                    self.testIdentity();
                    self.testVerifycode();

                    for(var i in self.verifyField){
                        if(self.verifyField[i]){
                            console.log("有错误了！");
                            return;
                        }
                    }
                    console.log("hello");
                    console.log(self.requestData);
                    //请求接口
                    self.modalObj.isShow=true;
                    $("html,body").addClass("hidden");
                    setTimeout(function(){
                        window.location.href="/views/signin.html";
                    },1000);
                    /*self.$http.jsonp('/').then(function(data){
                        console.log(data);
                        //如果请求成功，弹框
                        //跳转到签到页面

                    }, function (error) {

                    });*/
                },
                testName: function () {
                    var self=this;
                    if(!self.requestData.username){
                        self.verifyField.isNameNull=true;
                    }
                },
                testPhone:function(){
                    var self=this;
                    var phoneRegx=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    if(!self.requestData.phonenum){
                        self.verifyField.isPhoneNull=true;
                        return;
                    }
                    if(!self.requestData.phonenum.match(phoneRegx)){
                        self.verifyField.isPhoneTestFalse=true;
                    }
                },
                testIdentity: function () {
                    var self=this;
                    if(!self.requestData.identity){
                        self.verifyField.isIdentityNull=true;
                        return;
                    }
                    var res=definedValidator.fisCardID(self.requestData.identity);
                    if(res!==true){
                        self.verifyField.isIdentityTestFalse=true;
                    }
                },
                testVerifycode:function(){
                    var self=this;
                    if(!self.requestData.verifycode){
                        self.verifyField.isVerifycodeNull=true;
                    }
                }
            }


        });
    },
    signinControl:function(){
        var vm=new Vue({
            el:"#signIn",
            data:{
                isShow:false,
                isSignin:false,
                isClickDisabled:false,
                location:""
            },
            mounted: function () {
                var self=this;
                self.isShow=true;
            },
            methods:{
                signinClick: function () {
                    var self=this;
                    self.isSignin=true;
                    self.isClickDisabled=true;
                }
            }
        });
    },
    signoutControl: function () {
        var vm=new Vue({
            el:"#signOut",
            data:{
                isShow:false,
                isSignout:false,
                isClickDisabled:false,
                location:""
            },
            mounted: function () {
                var self=this;
                self.isShow=true;
            },
            methods:{
                signoutClick: function () {
                    var self=this;
                    self.isSignout=true;
                    self.isClickDisabled=true;
                }
            }
        });
    },
    userControl: function () {
        var vm=new Vue({
            el:"#user",
            data:{
                isShow:false,
                requestData:{
                    username:"",
                    identity:""
                },
                testField:{
                    isNameNull:false,
                    isIdentityNull:false,
                    isIdentityTestFalse:false
                },
                isClickDisabled:false
            },
            mounted: function () {
                var self=this;
                self.isShow=true;
            },
            methods:{
                comfirm: function () {
                    var self=this;
                    self.isClickDisabled=true;
                    self.nameTest();
                    self.identityTest();

                    for(var i in self.testField){
                        if(self.testField[i]){
                            self.isClickDisabled=false;
                            console.log("有错误了！");
                            return;
                        }
                    }

                    console.log("hello");
                    console.log(self.requestData);
                },
                nameTest: function () {
                    var self=this;
                    if(!self.requestData.username){
                        self.testField.isNameNull=true;
                    }
                },
                identityTest: function () {
                    var self=this;
                    if(!self.requestData.identity){
                        self.testField.isIdentityNull=true;
                        return;
                    }
                    var res=definedValidator.fisCardID(self.requestData.identity);
                    if(res!==true){
                        self.testField.isIdentityTestFalse=true;
                    }
                }
            }
        });
    }
};
