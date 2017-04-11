/**
 * Created by jessic on 2017/4/5.
 */
/*@function:实现高度集中的定制型表单验证vue插件
* 1.规则：（1）默认的规则
*         （2）写在指令修饰符的规则以及在指令args的规则
*         （3）写在指令value的规则
*         （4）写在
*   ****：检测时设置优先级别
* 2.检验的方式
*  （1）值改变时检验
*  （2）点击提交时的验证
* 3.支持的类型，包括input，select,checkbox,radio
* 4.报错方式，（1）弹框或者（2）显示提示语
* 5.返回绑定的字段
*
* */
var Vue=require("vue");
/*插件需要使用的工具方法*/
function _hasClass(obj,className){
    var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');
    return obj.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'));
}
function _addClass(obj,className){
    if(!hasClass(obj,className)){
        obj.className+=" "+className;
    }
}
function _removeClass(obj,className){
    if(hasClass(obj,className)){
        var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');
        obj.className=obj.className.replace(reg,"");
    }
}
function _isEqual(val1,val2){
    if(val1!==val2){
       return false;
    }else{
        return true;
    }
}
function _stringify(val){
    return JSON.stringify(val);
}
/*去除重复*/
function _removeDuplicate(arr){
    var obj={},
        result=[];
    for(var i= 0,j=arr.length;i<j;i++){
        obj[arr[i]]=i;
    }
    //获取对象的key
    for(var i in obj){
        result.push(parseInt(i));
    }
    return result;
}
function _addEventListener(el,type,listener,isUseCapture){
    //检测对象是否存在
    if(el===null||typeof(el)==="undefined")return;
    //默认isUseCapture 为false
    isUseCapture=isUseCapture||false;
    if(el.addEventListener){
        el.addEventListener(type,listener,isUseCapture);
    }else if(el.attachEvent){
        el.attachEvent("on"+type, function () {
            listener.apply(el);
        });
    }else{
        el["on"+type]=listener;
    }
}
function _removeEventListener(el,type,listener) {
    //检测对象是否存在
    if(el===null||typeof (el)==="undefiend")return;
    if(el.removeEventListener){
        el.removeEventListener(type,listener);
    }else if(el.detachEvent){
        el.detachEvent("on"+type, function () {
            listener.apply(el);
        });
    }else{
        el["on"+type]=null;
    }
}
//检测函数
function checkValid(value,conditions){
    var results;
    var cfg={
        //非空判断
        isRequired:function(value,bool){
            if(bool){
                return  value.trim()?true:['isNull'];
            }else{
                return true;
            }
        },
        reg: function (value, regEx) {
            return regEx.test(value.trim())?true:["isNoFit"]
        }
    };

    //
    for(var i in conditions){
        var condition=conditions[i],
            type=condition.type,
            typeVal=condition.typeVal;
        console.log(type);
            results=cfg[type](value,typeVal);

    }
    return results;
}
/*
* 规则构造器
* @type:验证的类型，默认有非空
* @typeVal:不同type设置的值
* @errorMsg：自定义报错信息
* @ajaxField：ajax提交的字段
* @tagName:显示报错的名称
* */
function regConfig(type,typeVal,errorMsg,ajaxField,tagName){
    this.type=type;
    this.typeVal=typeVal;
    this.errorMsg=errorMsg;
    this.ajaxField=ajaxField;
    this.tagName=tagName;
}
//正则表达式全局配置
var regConfigGobalLists={
    username:"",
    phonenum:/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    identify:"",
    email:/^[a-z0-9]+([._\-][a-z0-9])@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    minlength:""
};
//验证表单的对象
var validatorComp={};
validatorComp.install=function(Vue,options){
    Vue.directive("valid",{
        bind:function(el, binding, vnode){
            //获取当前对象
            var $el=el;
            //获取当前的实例对象
            var vm=vnode.context;
            //获取修饰符
            var optionOthers=binding.modifiers;
            //获取指令的绑定值
            var bindValue=binding.value;
            //获取字段的名称，返回ajax处理
            var ajaxFieldName=binding.arg?binding.arg:$el.getAttribute("name");
            var type=binding.arg;
            //显示正则表达式报错的信息@todo:修正
            var regErrorMsg=$el.getAttribute("regErrorMsg")||"";
            //显示报错的名称
            var tagName=$el.getAttribute("tag");
            var defaultReg=[],
                optionsReg=[],
                userConfigReg=[];
            //vm实例上的规则
            vm.validRegConfig||(vm.validRegConfig={});
            //返回规则器
            var commonReg= function (type,typeVal) {
                return new regConfig(type,typeVal,'',ajaxFieldName,tagName);
            };
            var regsReg=function(typeVal){
                return new regConfig('reg',typeVal,regErrorMsg,ajaxFieldName,tagName);
            }
            //需要验证非空
            var requiredReg=commonReg("isRequired",true);
            if(optionOthers.required){
               defaultReg.push(requiredReg);
            }

            //需要立即验证
            if(optionOthers.valinow){
                _addEventListener($el,"change", function () {
                    //返回的ajax字段的值
                    vm.ajaxValue||(vm.ajaxValue={});
                    //返回检测结果
                    vm.checkResult||(vm.checkResult={});
                    var value=$el.value;
                    //判断是否允许非空并且为空值，非空值有可能需要判断格式
                    if(value===""&&!optionOthers.required){
                        vm.ajaxValue[ajaxFieldName]=value;
                        return;
                    }

                    vm.checkResult=checkValid(value,vm.validRegConfig[ajaxFieldName]);
                    console.log(vm.validRegConfig[ajaxFieldName]);
                    var _result=vm.checkResult;
                    console.log(_result);

                });
            }

            //判断修饰符是否有正则表达式
            var regOptions=Object.keys(optionOthers);
            for(var i=0,j=regOptions.length;i<j;i++){
                var regOption=regOptions[i];
                if(regConfigGobalLists[regOption]){
                    optionsReg.push(regsReg(regConfigGobalLists[regOption]));
                }
            }
            //判断args或者name属性是否有正则表达式
            /*
            *@todo 检测代码的逻辑性
             */
            if(regConfigGobalLists[ajaxFieldName]){
                optionsReg.push(regsReg(regConfigGobalLists[ajaxFieldName]));
            }

            //用户自定义的
            if(bindValue){

            }

            vm.validRegConfig[ajaxFieldName]||[];
            /*
            * @todo 处理下优先级问题
            * */
            vm.validRegConfig[ajaxFieldName]=defaultReg.concat(optionsReg).concat(userConfigReg);



        }
    });

    Vue.prototype.regConfig=regConfig;
};

module.exports=validatorComp;
