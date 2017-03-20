var	$pageNum = $("#page-num")
	$lis = $("#item-list li")
	len = $lis.length
	pages = 0					//总页数
	pageSize = 8				//每页8项条目

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
	// loading图标
	// $("#loading").ajaxStart(function () {
	// 	$(this).show()
	// });
	// $("#loading").ajaxStart(function () {
	// 	$(this).hide()
	// });
	$.ajax({
		type:"POST",
		url:"../index.php",
		error:function () {
			// alert("加载失败")
		},
		success:function (data) {
			var lis = "";
			$each( data, function (index, item) {
				lis += "<li id='" + item.goodId + "'><img src='" + item.portrait + " alt='用户头像'><span>" + item.title + "</span></li>"
			});
			$("#item-list").html(lis)
		}
	});
}

// 右侧详细信息联动
function getDetail(target) {
	$.ajax({
		type:"POST",
		url:"",
		data:{
			goodsId: target.id
		},
		error:function () {
			// alert("加载失败")
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

			if (data.bargin == 1) {
				$("#bargain-able").css("background-position","0px -1px")
			} else {
				$("#bargain-able").css("background-position","0px -26px")
			}
			
		}
	});
}

// 加载搜索匹配内容
function searchFor( key ) {
	$.ajax({
		type:"POST",
		url:"",
		data:{
			searKey:key
		},
		error:function () {
			alert("加载失败")
		},
		success:function (data) {
			$("#item-list").html("")
			var lis = "";
			$each( data, function (index, item) {
				lis += "<li id='" + item.goodId + "'><img src='" + item.portrait + " alt='用户头像'><span>" + item.title + "</span></li>"
			});
			$("#item-list").html(lis)
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

$(function () {

	paging(1)			    // 初始化页面为第一页
	getData()				// 加载左侧列表

	// 默认加载第一条详情
	var li = $.("#item-list li").eq(0);
	if ( $.type(li)  != "undefined" ) {
		getDetail( li )
	}
	
	// 点击加载详情
	$("#item-list").click( function (event) {
		event = event || window.event
		var target = event.target || event.srcElement;
		getDetail( target )
	} );

	// 点击搜索
	$("#search-btn").click( function (event) {
		var searchText = $("#search-text").val()
		searchFor( searchText )
	})
	
	clearInput()		//搜索框删除文本

})
