<!--=include include/header.html-->
<style>
    #register .app-checkbox-lists{
        display: table-cell;
        width: 100%;
    }
    #register .app-checkbox-lists>li{
        float:left;
        width:-webkit-calc((100% - 10px)/2);
        width:calc((100% - 10px)/2);
        height:35px;
        line-height:35px;
        margin-bottom:10px;
        background:#fff;
        border:1px solid #E6E5EA;
        text-align:center;
        border-radius:3px;
    }
    #register .app-checkbox-lists>li:nth-child(2n+1){
        margin-right:10px;
    }
    #register .special-label{
        vertical-align:top;
    }
    #register .c-label{
        display:inline-block;
        width:50px;
        height:35px;
        line-height:35px;
    }
    #register .app-form-spe-left{
        width:50px;
    }
    #register .app-form-spe-right{
        width:calc(100% - 60px);
        width:-webkit-calc(100% - 60px);

    }
    #register .verify-text{
        width:-webkit-calc(100% - 40% - 10px);
        width:calc(100% - 40% - 10px);
        height:45px;
        line-height:45px;
        padding:0 10px;
        background-color:#fff;
        border:1px solid #E6E5EA;
        border-radius:3px;
    }
    #register .app-form-checkbox,
    #register .app-form-verifycode{
        padding-left:10px;
    }
    #register .btn-verify{
        width:40%;
        margin-left:10px;
    }
    #register .app-form-text-last{
        margin-bottom:30px;
    }
</style>
<div class="app-common-section" id="register" v-if="isShow" v-cloak>
    <div class="app-common-header">
      <span>绑定</span>
    </div>
    <div class="app-common-body">
        <!--表单-->
        <form >
            <!--姓名-->
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>姓名:</label>
                    <input type="text" placeholder="请输入姓名(必填)" name="username" class="form-text"
                    @keyup="btnRegClass=true" v-model.trim="requestData.username"
                           @blur="testName" @focus="verifyField.isNameNull=false"
                            v-valid.validRegConfig:username.required.valinow/>
                </div>
                <div class="app-form-validator-text animated">
                    <p v-if="verifyField.isNameNull">请输入姓名</p>
                </div>
            <!--电话-->
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>电话:</label>
                    <input type="text" placeholder="请输入电话号码(必填)"  class="form-text" name="phonenum"
                           @keyup="btnRegClass=true"  v-model.trim="requestData.phonenum"
                            @blur="testPhone" @focus="verifyField.isPhoneNull=false,verifyField.isPhoneTestFalse=false"
                           v-valid:phone.required.valinow/>
                </div>
                <div class="app-form-validator-text animated">
                    <p v-if="verifyField.isPhoneNull">请输入电话号码</p>
                    <p v-if="verifyField.isPhoneTestFalse">您输入的电话号码格式有误！</p>
                </div>
            <!--身份证-->
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>身份证号:</label>
                    <input type="text" placeholder="请输入身份证号"  class="form-text"
                           @keyup="btnRegClass=true" v-model.trim="requestData.identity"
                           @blur="testIdentity" @focus="verifyField.isIdentityNull=false,verifyField.isIdentityTestFalse=false"/>
                </div>
                <div class="app-form-validator-text animated">
                    <p v-if="verifyField.isIdentityNull">请输入身份证号</p>
                    <p v-if="verifyField.isIdentityTestFalse">您输入的身份证号不正确！</p>
                </div>
            <!--工种-->
                <div class="app-form-elem-wrapper app-form-checkbox margin-bottom-10 clearfix">
                    <div class="fl app-form-spe-left">
                        <label  class="special-label c-label">工种:</label>
                    </div>
                    <ul class="app-checkbox-lists fr clearfix app-form-spe-right">
                        <li v-for="(item,key) in typeName" :class="{'btn-special-tags':item.isSelect}"
                            @click="changeStatus(key),btnRegClass=true,verifyField.isWorktypeNull=false">{{item.name}}</li>
                    </ul>
                </div>
                <div class="app-form-validator-text animated">
                    <p v-if="verifyField.isWorktypeNull">请选择工种</p>
                </div>
            <!--验证码-->
                <div class="app-form-elem-wrapper app-form-verifycode margin-bottom-10 clearfix">
                    <!--做成组件吧-->
                    <!--<div class="fl app-form-spe-left">
                        <label for="identity" class="c-label">验证码:</label>
                    </div>
                    <div class="fr app-form-spe-right clearfix">
                        <input type="text" placeholder="请输入验证码" class="verify-text fl"
                               @keyup="btnRegClass=true" v-model.trim="requestData.verifycode"
                               @blur="testVerifycode" @focus="verifyField.isVerifycodeNull=false" />
                        <button type="button" class="common-btn common-inactive-btn btn-verify fr"
                                :class="{'common-disabled-btn':btnVerDisable}" :disabled="btnVerDisable"
                                @click="verifyRequest">
                            <span>{{btnVerText}}</span>
                        </button>
                    </div>-->
                    <!--验证码组件-->
                    <comp-verifycode ref="verifyCode" :second="60"  v-on:verifyclick="verifyRequest"
                         v-on:codekeyup="btnRegClass=true" v-on:codeblur="testVerifycode" v-on:codefocus="verifyField.isVerifycodeNull=false,
                         verifyField.isVerifycodeTestFalse=false">
                        >

                    </comp-verifycode>
                </div>
                <div class="app-form-validator-text animated app-form-text-last">
                    <p v-if="verifyField.isVerifycodeNull">请输入验证码</p>
                    <p v-if="verifyField.isVerifycodeTestFalse">验证码格式有误</p>
                </div>
            <!--注册按钮-->
                <div class="app-form-elem-wrapper margin-bottom-10">
                    <button type="button" class="common-btn common-all-length-btn common-inactive-btn btn-register"
                            :class="{'common-active-btn':btnRegClass}"
                            :disabled="btnRegDisable" @click="registerRequest">
                        <span>注册</span>
                    </button>
                </div>
            </form>
        <!--注册成功弹框-->
        <!--<transition name="slide-fade" >
            <div class="app-model animated" id="appModel" v-if="isSuccess">
                <div class="app-model-wrapper">
                    <a class="btn-ok margin-bottom-10"></a>
                    <h4 class="font-orange">恭喜您注册成功</h4>
                </div>
            </div>
        </transition>-->
        <app-modal ref="successModal" :is-show-modal="modalObj.isShow" :transition-type="modalObj.transitionType">
            <div slot="close" class="margin-bottom-20">
                <a>关闭</a>
            </div>
            <div slot="content">
                <a class="btn-ok margin-bottom-10"></a>
                <h4 class="font-orange">恭喜您注册成功</h4>
            </div>
        </app-modal>

    </div>
</div>

<script>
    window.hook.appCrm.registerControl();
</script>
<!--=include include/footer.html-->