window.onload = function() {

	/*
		FORMATS自动滚播
	*/
	var speed = 10;//速度

	var slider = document.getElementById('slider-box');//容器
	var sliderWrapper = document.getElementById('slider-wrapper');//内层容器
	var slider1 = document.getElementById('slider1');//正体		

	slider1.innerHTML += slider1.innerHTML; //拷贝内容一式两份
	slider1.innerHTML += slider1.innerHTML; //考虑内容填不满，一式四份

	//改变left位置向左移动，当left值小于等于正体内容，left复位0
	function marquee() {
		var sLeft = parseInt(slider1.style.left);

		if (sLeft <= -slider1.offsetWidth/4) {				
			sLeft = 0;	
		}			

		sLeft --;
		slider1.style.left = sLeft + 'px'; 			
	}

	//初始化定时器
	var timer = setInterval(marquee, speed);

	//鼠标移上停止
	slider.onmouseover = function() {
		window.clearInterval(timer);
	}

	//鼠标离开继续
	slider.onmouseout = function() {
		timer = setInterval(marquee, speed);
	}



	/*
		回到顶部按钮事件
	*/
	var topcontrol = $('#topcontrol');

	///回到顶部单击
	topcontrol.click(function(event) {
		$('html,body').animate({scrollTop:0}, 1000);
	});
	//滚动条事件
	$(window).scroll(function(event) {
		//获得滚动卷去的大小
		var sTop = $(window).scrollTop();
		if(sTop >= 200){
			topcontrol.fadeIn(400);
		}else{
			topcontrol.fadeOut(400);
		}
	});


	/*
		导航链接滑动到锚点
	*/
	$('#nav-right a').click(function(event) {
		
		// 获得对应区块的相对于网页原点的偏移量
		var top = $(this.hash).offset().top; 

		$('html,body').animate({scrollTop:top}, 1000);

		return false;
	});


	/*
		本地存储开始
	*/
	$('#sendBtn').click(function(event) {


		
		//获取元素对象
		var name = $('#name').val();
		var email = $('#email').val();
		var phone = $('#phone').val();
		var message = $('#message').val();

		//表单验证
		var r;

		//用户名验证
		r = /^[a-z][a-z0-9_]{5,11}$/;

		if (!r.test(name)) {
			alert('用户名不合法！');
			$('#name').focus();
			return false;
		}

		//邮箱验证
		r = /^[a-z0-9_]+@\w+(\.[a-z]{2,3}){1,2}$/;

		if (!r.test(email)) {
			alert('邮箱格式不合法！');
			$('#email').select();
			return false;
		}

		// 手机号码验证
		r = /^1[345678]\d{9}$/;

		if (!r.test(phone)) {
			alert('手机号码格式不正确');
			$('#phone').select();
			return false;
		}

		//内容验证
		if (message == '') {
			alert('请填写内容！');
			return false;
		}


		//创建user类
		function User(name,email,phone,message){
			this.name = name;
			this.email = email;
			this.phone = phone;
			this.message = message;
		};

		//创建对象
		var p = new User(name,email,phone,message); 

		// 对象转换为字符串
			var pStr = JSON.stringify(p);

			//存储到本地
			localStorage.setItem(name,pStr);

			alert('存储成功！');


	});

	
}		