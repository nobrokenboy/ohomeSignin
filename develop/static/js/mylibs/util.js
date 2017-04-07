module.exports={
	url:window.location.href,
	search:window.location.search,
	isIndexOfValue:function(val){
		if(this.url.indexOf(val)>-1){
			return true;
		}
	},
	getUrlPara:function(para){
		var paraStr,arr=[];
		paraStr=this.search.substr(1);
		arr=paraStr.split("&");
		for(var i=0,j=arr.length;i<j;i++){
			var parameter=arr[i].split("=");
			if(parameter[0].toLowerCase()==para.toLowerCase()){
				//避免出现乱码加上decodeURI进行解码
				return decodeURI(parameter[1]);
			}
		}
		return "";
	},
	isElementInArr: function (ele,arr) {
		for(var i= 0,j=arr.length;i<j;i++){
			if(ele==arr[i]){
				return true;
			}
		}
	},
	getDiffTimes: function (t1,t2) {
		var diffTimes=t2-t1;
		var timesObj={};
		var d=0;//天数
		var h=0;//时
		var m=0;//分
		var s=0;//秒
		if(diffTimes>=0){
			d=Math.floor(diffTimes/1000/60/60/24);
			h=Math.floor(diffTimes/1000/60/60%24);
			m=Math.floor(diffTimes/1000/60%60);
			s=Math.floor(diffTimes/1000%60);
		}

		h = h>9 ? h : "0"+h; //如果小时小于10,则在前面加0补充为两位数字
		m = m>9 ? m : "0"+m; //如果分钟小于10,则在前面加0补充为两位数字
		s = s>9 ? s : "0"+s; //如果秒数小于10,则在前面加0补充为两位数字

		timesObj={
			d:d,
			h:h,
			m:m,
			s:s
		};
		return timesObj;
	},
	replacePhoneStr: function (phone,str1,str2,replaceStr) {
		//检验参数的个数
		if(arguments.length!=4)
			throw new Error('received ' + arguments.length + ' parameters and should work with 4');
		str1=str1||0;
		str2=str2||phone.length;
		//str2至少要str1后一位
		if(!phone){
			return "请确定手机号码";
		}
		if(typeof str1 !="number"||typeof str2!="number"){
			return "请输入正确的参数格式";
		}
		replaceStr=replaceStr||eval("alert('请传入手机号要替换的字符串');");
		phone=phone.replace(phone.substring(str1,str2),replaceStr);
		return phone;
	}



};
