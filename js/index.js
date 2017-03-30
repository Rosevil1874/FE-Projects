var	$pageNum = $("#page-num")
	$lis = $("#item-list li")
	len = $lis.length || 0
	pages = 0					//总页数
	pageSize = 9				//每页8项条目

	// 计算总页数
	if (len%pageSize == 0) {
		pages = len/pageSize
	} else {
		pages = Math.floor(len/pageSize) + 1
	}
	
// 翻页函数, currentPage-当前页码， pageSize-每页条目数
function paging(currentPage) {
	var curr = currentPage

	// start-第一行显示的条目， end-最后一行显示的条目
	var start = (curr - 1) * pageSize + 1
		end = curr * pageSize
		end = ( end > len ) ? len : end
	// 属于当前页的条目显示，其他隐藏
	for( var i = 1; i <= len; i++){
		var currItem = $lis[i-1]
		if ( i >= start && i <= end ) {
			currItem.style.display = "block"
		} else {
			currItem.style.display = "none"
		}
	}

	// 回到首页
	$("#first-page").click(function() {
		if (currentPage == 1) {
			return false
		} else {
			paging( 1 )
		}
	})

	// 跳至末页
	$("#last-page").click(function () {
		if (currentPage == pages) {
			return false
		} else {
			paging( pages )
		}
	})
	// 上一页
	$("#prev-page").click(function () {
		if (currentPage == 1) {
			return false
		} else {
			paging( currentPage - 1 )
		}
	})
	// 下一页
	$("#next-page").click(function () {
		if (currentPage == pages) {
			return false
		} else {
			paging( currentPage + 1 )
		}
	})

	// 显示页码
	if (currentPage == 1) {
		$pageNum.html("<span class = 'on'> 1 </span> 2")
	} else if(currentPage == pages){
		$pageNum.html( (currentPage - 1) + "<span class = 'on'>" + currentPage + "</span>" )
	}else{
		$pageNum.html( (currentPage - 1) + "<span class = 'on'>" + currentPage + "</span>" + (currentPage + 1) )
	}
}

// 加载左侧列表数据
function getData() {
	$.ajax({
		type:"POST",
		url:"../list.php",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		// loading图标
		beforeSend:function () {
			$("#item-list").html("")			
			$("#loading").html("<img src='images/loading.gif'>")
		},
		error:function () {
			$("#loading").html("加载失败")
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				$("#loading").html("当前没有举报信息")
			} else {
				var lis = "";
				$.each( data, function (index, item) {
					lis += "<li id='" + item.goodId + "'><img src='" + item.portrait + " alt='用户头像'><span>" + item.title + "</span></li>"
				});
				$("#loading").html("")
				$("#item-list").html(lis)
			}

			// 默认加载第一条详情
			var li = $("#item-list li").eq(0);
			if ( $.type(li)  != "undefined" ) {
				getDetail( li )
			}
		}
	});
}

// 右侧详细信息联动
function getDetail(target) {
	var thisId = targrt.attr("id")
	$.ajax({
		type:"POST",
		url:"../detail.php",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		data:{
			goodsId: thisId
		},
		error:function () {
			alert("商品详情加载失败")
		},
		success:function (data) {
			$("#good-id").html(data.goodId)
			$("#publish-time").html(data.time)
			$(".user img").attr("src",data.portrait) 
			$("#user-name").html(data.userName)
			$("#good-title").val("标题：" + data.title)
			$("#good-img").html(data.picSrc)
			$("#price-num").html(data.price)
			$("#sort").html(data.sort)
			$("#particulars").html(data.particulars)

			// 剪裁商品图片
			var canvas = $(".good-img")[0]
			var	ctx = canvas.getContext("2d")
			var	img = new Image()
			img.src = data.portrait
			img.onload = function () {
				ctx.drawImage(img, 0, 0, 300, 200, 0, 0, 300, 200)
			}
			
			// 可否议价
			if (data.bargin == 1) {
				$("#bargain-able").html("是")
			} else {
				$("#bargain-able").html("否")
			}
		}
	});
}

// 加载搜索匹配内容
function searchFor( key ) {
	$.ajax({
		type:"POST",
		url:"",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		data:{
			searKey:key
		},
		beforeSend:function () {	
			$("#item-list").html("")	
			$("#loading").html("<img src='images/loading.gif'>")
		},
		error:function () {
			$("#loading").html("加载失败")
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				$("#loading").html("没有匹配的举报信息")
			} else {
				var lis = "";
				$.each( data, function (index, item) {
					lis += "<li id='" + item.goodId + "'><img src='" + item.portrait + " alt='用户头像'><span>" + item.title + "</span></li>"
				});
				$("#loading").html("")
				$("#item-list").html(lis)
			}
		}
	});
}

// 点击关闭按钮时清空搜索框输入数据
function clearInput() {
	var $searchText = $("#search-text")
	$("#close-btn").click(function() {
		$searchText.val("")
		$searchText.focus()
	})
}

// 忽略或删除被举报商品
function IgnoreOrDel(type) {
	var $ignoreId = $("#good-id").html()
	
	$.ajax({
		type:"POST",
		url:"",
		dataType:"json",
		contentType:"application/json;charset=utf-8",
		data:{
			signal:type
		},
		error:function () {
			alert("操作失败")
		},
		success:function (data) {
			if (data == "success") {
				alert("操作成功")
			} else {
				alert("操作失败")
			}
		}
	});
}


$(function () {
	var canvas = $(".good-img")[0]
	var	ctx = canvas.getContext("2d")
	var	img = new Image()
	img.src = "images/ice-bear.jpg"
	img.onload = function () {
		var w = img.width
		var h = img.height
		// 拉伸图片
		if (w < 300 ||h < 200) {
			ctx.drawImage(img, 0, 0, w, h, 0, 0, 300, 200)
		}
		// 裁剪图片中间部分
		else {
			var dw = w - 300
			var dh = h - 200
			// if (dw > dh) {
			// 	var ratio = 200/h
			// 	ctx.drawImage(img, dw*ratio/2, 0, w*ratio, h, 0, 0, 300, 200)
			// } else {
			// 	var ratio = 300/w
				ctx.drawImage(img, dw/2, dh/2, w, h, 0, 0, w, h)
			// }
		}
	}
	
	// 初始化页面为第一页
	if ( pages > 0 ) {
		paging(1)
	}
	
	// 加载左侧列表		    
	// getData()				
	
	// 点击加载详情
	$("#item-list").click( function (event) {
		event = event || window.event
		var target = event.target || event.srcElement;
		getDetail( target )
	} );

	// 点击搜索
	$("#search-btn").click( function () {
		var searchText = $("#search-text").val()
		searchFor( searchText )
	})
	
	//搜索框删除文本
	clearInput()		

	// 忽略或删除被举报商品
	$("#ignore").click( function () {
		IgnoreOrDel("ignore")
	});
	$("#del").click( function () {
		IgnoreOrDel("del")	
	});
})
