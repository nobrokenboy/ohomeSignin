/**
 * Created by jessic on 2017/4/7.
 */
var Vue=require("vue");
/*验证码*/
Vue.component("comp-verifycode",{
    props:{
        second: {
            type: Number,
            default: 60
        }
    },
    template:'<div>\
        <div class="fl app-form-spe-left">\
            <label for="identity" class="c-label">验证码:</label>\
            </div>\
            <div class="fr app-form-spe-right clearfix">\
                <input type="text" placeholder="请输入验证码" class="verify-text fl"\
                v-model.trim="codeNum" @keyup="codekeyup" @blur="codeblur" @focus="codefocus"/>\
                <button type="button" class="common-btn common-inactive-btn btn-verify fr"\
                     @click="verifyclick" :disabled="isVerifyClickDisabled">\
                    <span>{{codeText}}</span>\
                </button>\
            </div>\
    </div>',
    data:function(){
        return {
            time:0,
            timer:null,
            codeNum:""
        }
    },
    computed:{
        codeText:function(){
            return  this.time==0?"获取验证码":this.time+"s后重新获取";
        },
        isVerifyClickDisabled:function(){
            return  this.time==0?false:true;
        }

    },
    methods:{
        setTime:function(){
            var self=this;
            self.time=self.second;
        },
        timeDeal: function () {
            var self=this;
            if(self.time==0){
                clearInterval(self.timer);
            }else{
                self.time--;
            }
        },
        codekeyup: function () {
            var self=this;
            self.$emit('codekeyup');
        },
        codeblur: function () {
            var self=this;
            self.$emit('codeblur',self.codeNum);
        },
        codefocus: function () {
            var self=this;
            self.$emit('codefocus');
        },
        verifyclick:function(){
            var self=this;
            self.setTime();
            self.timer=setInterval(function(){
                self.timeDeal();
                console.log(self.time);
            },1000);
            self.$emit('verifyclick');
        }
    }

});
/*弹框*/
Vue.component("app-modal",{
    props:["isShowModal","transitionType"],
    template:'<transition :name="transitionType" >\
        <div class="app-modal animated" id="appModal" v-if="isShowModal">\
            <div class="app-modal-wrapper">\
                <slot name="close"></slot>\
                <h2><slot name="title"></slot></h2>\
                <slot slot name="content"></slot></div>\
            </div>\
        </div>\
    </transition>',
    data:function(){
        return {

        }
    },
    mounted: function () {
        var self=this;

    },
    methods:{

    }

});