/**
 * Created by jessic on 2017/4/7.
 */
var Vue=require("vue");
/*验证码*/
Vue.component("comp-verifycode",{
    props:['codeText'],
    template:'<div>\
        <div class="fl app-form-spe-left">\
            <label for="identity" class="c-label">验证码:</label>\
            </div>\
            <div class="fr app-form-spe-right clearfix">\
                <input type="text" placeholder="请输入验证码" class="verify-text fl"/>\
                <button type="button" class="common-btn common-inactive-btn btn-verify fr"\
                    @click="verifyclick">\
                    <span>{{codeText}}</span>\
                </button>\
            </div>\
    </div>',
    data:function(){
        return {

        }
    },
    methods:{
        verifyclick:function(){
            var self=this;
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