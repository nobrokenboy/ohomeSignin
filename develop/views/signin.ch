<!--=include include/header.html-->
<style>
</style>
<div class="app-common-section" id="signIn" v-if="isShow" v-cloak>
    <div class="app-common-header">
        <span>签到</span>
    </div>
    <div class="app-common-body">
        <!--未签到显示-->
        <div>
            <!--个人信息-->
            <section class="margin-top-15 margin-bottom-15">
                <p class="f16 font-weight-bold" align="center">
                    <span>王先生</span>
                    <span>13800890223</span>
                </p>
                <p align="center" class="margin-top-5">广东省广州市天河区</p>
            </section>
            <!--表单-->
            <form>
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>施工状态:</label>
                    <input type="text" class="form-text"/>
                </div>
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>签到时间:</label>
                    <input type="text" class="form-text"/>
                </div>
                <div class="app-form-elem-wrapper app-form-input margin-bottom-10">
                    <label>定位:</label>
                    <input type="text" class="form-text" id="location" readonly/>
                </div>
                <div class="app-form-elem-wrapper margin-bottom-10 btn-wrapper">
                    <button type="button" class="common-btn common-all-length-btn common-active-btn"
                            v-if="!isSignin" @click="signinClick" :disabled="isClickDisabled">
                        <span>确认签到</span>
                    </button>
                    <button type="button" class="common-btn common-all-length-btn common-inactive-btn" v-if="isSignin">
                        <span>您已签到</span>
                    </button>
                </div>
            </form>
            <!--地图-->
            <div id="mapContainer"></div>
        </div>
        <!--已经签到显示，后台字段进行判断-->
        <!--<div>
            <p>您已经签到了！</p>
        </div>-->
    </div>
</div>

<!--=include include/navigation.html-->
<script>
    window.hook.appCrm.signinControl();
    //高德地图
    var map, geolocation;
    map = new AMap.Map('mapContainer', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {

        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        console.log(geolocation);
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        console.log(data);
        var lng=data.position.getLng();
        var lat=data.position.getLat();
        var lngLat=new AMap.LngLat(lng, lat);
        var address=data.formattedAddress;
        var posiCenterDistance=lngLat.distance([116.387271, 39.922501]);
        if(posiCenterDistance>500){
            alert("不好意思，距离目标太远，该定位无效");
            document.getElementById('location').value="距离目标太远，该定位无效";
        }else{
            alert("定位成功");
            document.getElementById('location').value=address;
        }

    }
    //解析定位错误信息
    function onError(data) {
        console.log(data);
        document.getElementById('location').value='无定位信息';
    }

</script>
<!--=include include/footer.html-->