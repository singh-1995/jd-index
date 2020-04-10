window.onload = function(){
	
	var banner = document.querySelector("#banner"),
		list = banner.querySelector("#list"),
		prev = banner.querySelector("#prev"),
		next = banner.querySelector("#next"),
		oLi = list.querySelectorAll("li"),
		buttom = banner.querySelector("#buttom"),
		buttomList = buttom.querySelectorAll("li"),
		len = 5,
		timer = null,
		index = 0,
		offWid = list.querySelectorAll("li")[0].offsetWidth;
	var animated = false;
		
	//初始化=====================================
	list.style.left = -offWid+"px";
	//buttom按钮切换
	function ShowButtom(){
		for(var i=0; i<buttomList.length; i++){
			if(buttomList[i].className == "on"){
				buttomList[i].className = "";
				break;
			}
		}
		buttomList[index].className = "on";
	}
	// 却换动画
	function animeta(offset){
		animated = true;
		var newLeft =  parseInt(list.style.left) + offset,
			anitimer = 300, //切换总时间
			interval = 30,	//每次切换间隔时间
			speed = offset/(anitimer/interval); //每次位移量
		function go(){		
			if(parseInt(list.style.left) > newLeft || parseInt(list.style.left) < newLeft){
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go,interval);
			}else{
				animated = false;
				if(newLeft > -offWid){
					list.style.left = parseInt((-buttomList.length)*offWid) + "px"
				}
				 if(newLeft < parseInt((-buttomList.length)*offWid)){
					list.style.left = -offWid + "px"
				}
			}
			
		}
		go();		
	}
	//定时器
	function play(){
		timer = setInterval(function(){
			next.onclick();			
		},
		2000)
	}
	play();
	//清除定时器
	function stop(){
		clearInterval(timer);
	}
	//点击箭头切换================================
	next.onclick = function(){
		if(index == buttomList.length-1){
			index = 0;
		}else{
			index++;
		}					
		if(animated == false){
			animeta(-offWid);	
			ShowButtom();
		}		
	}
	prev.onclick = function(){		
		if(index == 0){
			index = buttomList.length-1;
		}else{
			index--;
		}					
		if(animated == false){
			animeta(offWid);
			ShowButtom();
		}		
	}
	//按钮点击
	for(var i=0; i<buttomList.length; i++){
		buttomList[i].index = i;
		buttomList[i].onclick = function(){
			if(this.className == "on"){
				return;
			}
			var _this = this.index,
				newOffWid = -offWid*(_this - index);
			index = _this;			
			if(animated == false){
				animeta(newOffWid);
				ShowButtom();
			}			
		}
	}
	//鼠标移入关闭定时器
	banner.onmouseover = stop;
	banner.onmouseout = play;
	
	//京东秒杀倒计时================================================================================
	
	var box = document.querySelector("#count-down"),
		boxText = box.children,
		countTime = document.querySelector("#count-time");
	
	
	function showTime(){
		
		var h = new Date().getHours(),		//获取当前时
			m = new Date().getMinutes(),	//获取当前分
			mi = new Date().getSeconds();	//获取当前秒
			
		try{
			if(h < 10){		//判断当前时间是否大于 10				
				boxText[0].innerHTML = (h - 10) < 10 ? "0" + (h - 10) : h - 10;
				boxText[1].innerHTML = (60 - m) < 10 ? "0" + (60 - m) : 60 - m;
				boxText[2].innerHTML = (60 - mi) < 10 ? "0" + (60 - mi) : 60 - mi;
			}
			throw "今日秒杀已结束"
		}catch(e){
			countTime.innerHTML = e;		
		}
	}
	setInterval(function(){
		showTime()
	},
	1000)
		
	//导航菜单切换===============================================================================
	
	var menuBox = document.querySelector("#menuBox"),
		menuLi = menuBox.querySelectorAll("li"),
		menu = menuBox.querySelectorAll(".sub-menu"),
		len = menuLi.length;
		
		for(var i=0; i<len; i++){
			
			menuLi[i].onmousemove = function(){
				var subMenu = this.querySelectorAll(".sub-menu")[0];
				for(var i=0; i<len; i++){
					menu[i].className = "sub-menu";
				}
				if(subMenu.className = "sub-menu"){
					subMenu.className = "sub-menu onblock";
				}
			}
			
			menuLi[i].onmouseout = function(){				
				for(var i=0; i<len; i++){
					menu[i].className = "sub-menu";
				}
			}		
							
		}
		
		
		
		
		
}