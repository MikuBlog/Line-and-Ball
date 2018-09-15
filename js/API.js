		//得到body的宽和高
		var width = document.body.clientWidth
		var height = document.body.clientHeight
		//获取画布
		var canvas = document.querySelector('#canvas')
		var cas = document.querySelector('#cas')
		//获取画布上下文
		var ctx = canvas.getContext('2d')
		var casCtx = cas.getContext('2d')
		//初始化存放点的数组
		var spotArray = []
		//存放颜色的数组,随机获取颜色赋给每个小球
		var colorArray = ["red","green","blue","pink","yellow"]
		//计算调用次数
		var runTime = 0
		//共享鼠标事件对象接口
		var event
		//启动动画
		var start = true
		//暴露计时器引用
		var time
		
		//制作线条
		function getLine() {
			spotArray.forEach(function(value,index) {
				if((event.pageX-value.x>0&&event.pageX-value.x<config.Range)||(value.x-event.pageX>0&&value.x-event.pageX<config.Range))
				{
					if((event.pageY-value.y>0&&event.pageY-value.y<config.Range)||(value.y-event.pageY>0&&value.y-event.pageY<config.Range)){
						casCtx.beginPath()
						casCtx.strokeStyle = config.lineColor
						casCtx.lineWidth = config.lineWeight
						casCtx.lineCap = config.lineCap
						casCtx.lineTo(value.x,value.y)
						casCtx.lineTo(event.pageX,event.pageY)
						casCtx.stroke()
					}
				}
			})
		}
		//制作小球，添加到小球数组中
		function getSpot() {
			for(var i = 0 ; i < config.Number ; i ++) {
				var spot = {
					x:Math.random()*(canvas.width-2*config.Radius)+config.Radius,
					y:Math.random()*(canvas.height-2*config.Radius)+config.Radius,
					size:config.Radius,
					color:colorArray[~~(Math.random()*colorArray.length)],
					speedX:Math.random()*config.spotSpeedX*Math.pow(-1,~~(Math.random()*10000)),
					speedY:Math.random()*config.spotSpeedY*Math.pow(-1,~~(Math.random()*10000))
				}
				spotArray.push(spot)	
			}
		}
		//渲染小球
		function renderSpot() {
			spotArray.forEach(function(value,index) {
				ctx.globalCompositeOperation = config.globalCompositeOperation
				ctx.globalAlpha = config.globalAlpha
				ctx.beginPath()
				ctx.arc(value.x,value.y,value.size,0,2*Math.PI,false)
				ctx.fillStyle = value.color
				ctx.fill()
			})
		}
		//小球运动及碰撞检测
		function run() {
			time = setInterval(function() {
					spotArray.forEach(function(value,index) {
						 if(value.x+value.size+value.speedX<canvas.width&&value.y+value.size+value.speedY<canvas.height){
						 	if(value.x-value.size+value.speedX>0&&value.y-value.size+value.speedY>0){
						 		value.x += value.speedX
						 		value.y += value.speedY
						 	}
						 }if(value.x+value.size+value.speedX >= canvas.width){
						 	value.speedX = -value.speedX
						 }if(value.y+value.size+value.speedY >= canvas.height){
						 	value.speedY = -value.speedY
						 }if(value.x-value.size+value.speedX <= 0 ) {
						 	value.speedX = -value.speedX
						 }if( value.y-value.size+value.speedY <= 0 ) {
						 	value.speedY = -value.speedY
						 }
					})
					reDraw()
					getLine()
					renderSpot()
				},0)	
		}
		//停止计时器
		function stop() {
			clearInterval(time)
		}
		//清除画布内容
		function reDraw() {
			casCtx.clearRect(0,0,canvas.width,canvas.height)
			ctx.clearRect(0,0,canvas.width,canvas.height)
		}
		//动画入口
		function letGo() {
			getSpot(Number)
			renderSpot()
			//点击启动动画
			document.onclick = function(e) {
				if(start) {
					run()
					start = false
				}else {
					stop()
					start = true
				}
			}
			//移动鼠标刷新鼠标事件接口
			document.onmousemove = function(e) {
				event = e
			}
		}
		window.onload = function() {
			//当浏览器窗口改变的时候，画布大小自适应
			window.onresize = function() {
				width = document.body.clientWidth
				height = document.body.clientHeight
				canvas.width = cas.width = width
				canvas.height = cas.height = height
			}
			
			//执行接口
			letGo()
			
		}
