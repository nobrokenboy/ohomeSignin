/**
 * Created by jessic on 2017/4/5.
 */
var Vue=require("vue");
function hasClass(obj,className){
    var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');
    return obj.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}
function addClass(obj,className){
    if(!hasClass(obj,className)){
        obj.className+=" "+className;
    }
}
function removeClass(obj,className){
    if(hasClass(obj,className)){
        var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');
        obj.className=obj.className.replace(reg,"");
    }
}
function isEqual(val1,val2){
    if(val1!==val2){
       return false;
    }else{
        return true;
    }
}
function stringify(val){
    return JSON.stringify(val);
}

//正则表达式全局配置
var regConfigGobal={
    username:"",
    phonenum:/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    identify:"",
    email:/^[a-z0-9]+([._\-][a-z0-9])@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    minlength:""
};
//验证表单的对象
var validatorComp={};
validatorComp.install=function(Vue,options){
    Vue.directive("vali",{
        bind:function(el, binding, vnode){
            console.log(el);
            console.log(binding);
            console.log(vnode);
            var str=JSON.stringify;
            console.log("name"+stringify(binding.name));
            console.log("value"+stringify(binding.value));
            console.log("modifiers"+stringify(binding.modifiers));
            //获取修饰符
            var modifiers=stringify(binding.modifiers);
            //获取需要验证的类型
            var testTypes=[];

        }
    });
};

module.exports=validatorComp;
