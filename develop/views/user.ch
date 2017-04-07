<!--=include include/header.html-->
<style>
    #user .btn-href{
        color:#fff;
    }
</style>
<div class="app-common-section" id="user" v-if="isShow" v-cloak>
    <div class="app-common-header">
        <span>个人中心</span>
    </div>
    <div class="app-common-body">
        <!--表单-->
        <form>
            <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                <label>姓名:</label>
                <input type="text" class="form-text" placeholder="请输入姓名"
                     v-model.trim="requestData.username"  @blur="nameTest" @focus="testField.isNameNull=false"/>
            </div>
            <div class="app-form-validator-text animated">
                <p v-if="testField.isNameNull">请输入姓名</p>
            </div>
            <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                <label>身份证号:</label>
                <input type="text" class="form-text" placeholder="请输入身份证号码"
                    v-model.trim="requestData.identity" @blur="identityTest"
                       @focus="testField.isIdentityNull=false,testField.isIdentityTestFalse=false" />
            </div>
            <div class="app-form-validator-text animated">
                <p v-if="testField.isIdentityNull">请输入身份证号</p>
                <p v-if="testField.isIdentityTestFalse">您输入的身份证号不正确！</p>
            </div>
            <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                <label>工种:</label>
                <input type="text" class="form-text" readonly/>
            </div>
            <div class="app-form-elem-wrapper margin-bottom-10 btn-wrapper">
                <button type="button" class="common-btn common-all-length-btn common-active-btn btn-href"
                        @click="comfirm" :disabled="isClickDisabled">
                    <span class="font-white">确定</span>
                </button>
            </div>
        </form>
    </div>
</div>

<!--=include include/navigation.html-->
<script>
    window.hook.appCrm.userControl();
</script>
<!--=include include/footer.html-->