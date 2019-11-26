/*数据传输格式
*
* 垃圾桶编号：dustbinID --varchar
*　需要清理时间：need_clean_time --timestamp
*　得到处理时间：deal_time --timestamp
*　垃圾重量：weight --varchar
* 垃圾车编号：truckID -- varchar
* 备注： remarks --string
* 
*/

// 提示用户操作结果
function status(msg) {
	var $status = $('<div class="status"></div>')		
	var $body = $(document.body)
	$status.text(msg)
	$body.append($status)
	$status.animate({height: "120px"}, 500)
	var timer = setTimeout(function () {
		$status.animate({height: "0px"}, 500)
		var timer2 = setTimeout(function () {
			$status.remove()
			clearTimeout(timer2)
		}, 500);
		clearTimeout(timer)
	}, 1500);
}

// 加载列表
function getData() {
	var $tbody = $("table tbody:eq(0)")
		$items = $("tbody tr")
		$loading = $("#loading")

	// 获取列表
	$.ajax({
		type:"POST",
		url:"#",
		dataType:"json",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		beforeSend:function () {
			$tbody.html("")			
			$loading.html("加载中...")
		},
		error:function () {
			$loading.html("加载失败")
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				$loading.html("当前没有清理记录")
			} else {
				var lis = "";
				$.each( data, function (index, item) {
					lis += "<tr><td>" + item.dustbinID + "</td><td>" + item.need_clean_time + "</td><td>" + item.deal_time + "</td><td>" + item.weight + "</td><td>" + item.truckID + "</td><td>" + item.remarks + "</td></tr>"
				});
				$loading.html("")
				$tbody.html(lis)
			}
		}
	});
}

$(function () {
	// 本地存储,用户名和密码
	var storage = window.localStorage
	    $tbody = $("table tbody:eq(0)")
		$items = $("tbody tr")
		$loading = $("#loading")

	storage.setItem("username","nao")
	storage.setItem("password","111111")

	// 点击登录按钮
	$("#submit-btn").on('click', function () {
		var usernameInput = $('#username').val()	//用户输入
			passwordInput = $('#password').val()
			username = storage.getItem("username")	//本地存储
			password = storage.getItem("password")

		// 检查输入完整性
		usernameInput = usernameInput.replace(/\s/g,'')
		if (usernameInput == '') {
			$('#username')[0].focus()
			console.log('1')
		} else if (passwordInput == '') {
			console.log('2')
			$('#password')[0].focus()
		} else{

			console.log('3')
			// 检查用户名和密码是否合法并匹配
			if (username === usernameInput && password === passwordInput) {
				window.open('manager.html')
			} else {
				alert('请重新输入正确的用户名和密码')
			}
		}
	})

	// 加载列表
	// getData()

	//删除条目
	// $(".edit").each( function (index) {
	// 	$(this).click(function () {
	// 		var delOrNot = confirm('确认删除当前记录吗？')
	// 		if (delOrNot == true) {
	// 			$tbody[0].removeChild($items.eq(index)[0])
	// 		}
	// 	})
	// });
})