// 本地存储
var storage = window.localStorage

// 计算九个圆心的坐标，索引为0-8，编号为1-9
function calcPoint(r){
	var point
	var points = []
	for( var i = 0; i < 3; i++ ){
		for( var j = 0; j < 3; j++ ){
			point = {
				x: (4*i + 3) * r,
				y: (4*j + 3) * r,
				num: j*3 + i + 1
			}
			points.push(point)
		}
	}
	return points
}

// 绘制9个圆圈
function drawPoints(ctx, points, r) {
	ctx.strokeStyle = "gray"
	for (var i = 0, len = points.length; i < len; i++) {
		var point = points[i]
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.arc(point.x, point.y, r, 0, Math.PI*2, true)
		ctx.stroke()
		ctx.closePath()
	}
}

// 判断这个点是否已经选择过，不能重复选择
function isSelected( password, num ) {
	var len = password.length
		ret = false
	for( var i = 0; i < len; i++ ){
		if( password[i].num == num ){
			ret = true
		}
	}
	return ret
}

// 判断触摸开始点是否在某个圆圈内，是则选择
function selectP(touchP, points, r, password, ctx) {
	var tx = touchP.clientX
		ty = touchP.clientY

	for (var i = 0, len = points.length; i < len; i++) {
		var point = points[i]
			px = point.x
			py = point.y
			dx = Math.abs( px - tx )
			dy = Math.abs( py - ty )

		if ( dx*dx + dy*dy <= r*r ) {
			if ( !isSelected( password, point.num ) ) {
				// 1. 加入选择队列
				password.push( point );
				// 2. 改变选择点样式
				var grad = ctx.createRadialGradient(px, py, 0, px, py, r)
				grad.addColorStop(0, "white")
				grad.addColorStop(0.6, "lightblue")
				grad.addColorStop(1, "dodgerblue")
				ctx.beginPath()
				ctx.fillStyle = grad
				ctx.arc(px, py, r, 0, Math.PI*2, true)
				ctx.fill()
				ctx.closePath()
			}
		}
	}
}

// 比较两个数组是否相等，数组中每一项均为对象
function cmp(arr1, arr2) {
	var len1 = arr1.length
	var len2 = arr2.length
	if (len1 != len2) {
		return false
	} else{
		for (var i = 0; i < len1; i++) {
			if (arr1[i].num != arr2[i].num) {
				return false
			}
		}
		return true
	}
}

// 延时1s清空画布并重绘9个点
function delayReset(sw, ctx, points, r) {
	if (timer) {
		clearTimeout(timer)
	}
	var timer = setTimeout(function (sw, ctx, points, r) {
		return function () {
			ctx.clearRect(0, 0, sw, sw)
			drawPoints(ctx, points, r)
		}
	}(sw, ctx, points, r), 1000);
}

// 参数type为操作类型【set:设置密码时第一次输入，reset：设置密码时第二次输入，validate：验证密码】
function setPassword( can, points, r ,ctx, sw, type) {
	var password = []

	// 1. 触摸开始
	can.bind("touchstart", function f(e) {
		// 解决touchmove只能触发一次的问题
		e.preventDefault()
		
		var touchP = e.touches[0]
		// 判断触摸开始点是否在某个圆圈内，是则选择
		selectP(touchP, points, r, password, ctx)
		
		// 解除touchstart事件监听
		can.unbind("touchstart", f)

		// 2. 手指滑动过程，可以在整个屏幕滑动
		can.bind("touchmove", function fingerMove(e) {
			e.preventDefault()
			var touchP = e.touches[0]
				len = password.length
				ctx.lineWidth = 5
				ctx.lineCap = "round"
				ctx.strokeStyle = "rgba(204, 204, 204, 0.1)"

			// 判断滑过的每一个点
			selectP(touchP, points, r, password, ctx)
			for(var i = 0; i < len - 1; i++){
				var j = i + 1
					pFrom = password[i]
					pTo = password[j]
				ctx.beginPath()
				ctx.moveTo(pFrom.x, pFrom.y)
				ctx.lineTo(pTo.x, pTo.y)
				ctx.stroke()
				ctx.closePath()
			}
		})

		// 3. 滑动结束
		can.bind("touchend", function fn(e) {
			can.unbind("touchmove")
			delayReset(sw, ctx, points, r)
			// 设置密码
			if (type == "set") {
				if (password.length <= 4) {
					$hint.html("密码长度太短，请设置至少5个点")
					password = []
					setPassword($canvas, points, r, ctx, sw, "set")
				} else{
					$hint.html("请再次输入密码")
					// 再次输入密码
					window.pw = password
					setPassword($canvas, points, r, ctx, sw, "reset")
				}
			}
			// 第二次输入密码
			else if(type == "reset"){
				if( !cmp( window.pw, password ) ){
					$hint.html("两次密码输入不一致，请重新设置")
					setPassword($canvas, points, r, ctx, sw, "set")
				} else{
					$hint.html("密码设置成功")

					// 密码设置成功后将其保存到本地
					storage.clear()
					storage.setItem( "myPassword", JSON.stringify(window.pw) )
				}
			} 
			// 验证密码
			else{
				var localPw = storage.getItem("myPassword") || []
				if(localPw.length == 0){
					$hint.html("您还未设置密码，请先设置")
				} else{
					localPw = JSON.parse( localPw )
					if( !cmp( localPw, password ) ){
						$hint.html("密码错误，请重新输入")
					} else{
						$hint.html("密码正确")
					}
					setPassword($canvas, points, r, ctx, sw, "validate")
				}
			}
			
			can.unbind("touchend", fn)
		})
	})
}

$(function () {
	var $set = $("#set")
		$validate = $("#validate")
		$form = $("#option")
		$wrap = $(".wrap")
		$hint = $(".hint")
		$canvas = $("#password")
		ctx = $canvas[0].getContext("2d")
		password = []			//保存密码序列

	// 在canvas上绘制9个小圆圈图样
	var sw = $(document.body).width()
	var r = Math.floor(sw / 14)
	$canvas.attr("width", sw)
	$canvas.attr("height", sw)
	
	// 计算九个圆心的坐标
	var points = calcPoint(r)

	// 绘制9个圆圈
	drawPoints(ctx, points, r, sw)

	$form.on("click", $wrap, function (e) {
		e = event || window.event
		var $target = e.target || e.srcElement
		$hint.html("请输入手势密码")
		if ($target.id == "set") {
			// 设置密码，将密码序列保存在password数组中
			setPassword($canvas, points, r, ctx, sw, "set")		
		} else {
			// 验证密码函数
			setPassword($canvas, points, r, ctx, sw, "validate")
		}
	})
})