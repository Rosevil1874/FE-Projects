function countPage(pageNow){
	var	$lis = $("#item-list li")
		len = $lis.length || 0
		pageNow = pageNow || 1		//若未传参，则初始化到第一页
		pages = 0					//总页数
		pageSize = 9				//每页9项条目

	// 计算总页数
	if (len%pageSize == 0) {
		pages = len/pageSize
	} else {
		pages = Math.floor(len/pageSize) + 1
	}
	
	// 按需初始化页面
	if ( pages > 0 ){
		paging(pageNow)
	}
}

// 翻页函数, currentPage-当前页码， pageSize-每页条目数
function paging(currentPage) {
	var curr = currentPage
		$lis = $("#item-list li")
		$pageNum = $("#page-num")
		pageSize = 9				//每页9项条目

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
		url:"./MyController",
		dataType:"json",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		// loading图标
		data:{
			action: "getdata"
		},
		beforeSend:function () {
			$("#item-list").html("")			
			$("#loading").html("<img src='images/loading.gif'>")
		},
		error:function () {
			$("#loading").html("加载失败")
			$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╥﹏╥</p>')
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				$("#loading").html("当前没有举报信息")
				$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╮(─▽─)╭</p>')
			} else {
				var lis = "";
				$.each( data, function (index, item) {
					lis += "<li id='" + item.gid + "'><img src='" + item.yb_userhead_url + "' alt='用户头像'><span>" + item.title + "</span></li>"
				});
				$("#loading").html("")
				$("#item-list").html(lis)
			}
			
			//显示分页
			countPage()

			// 默认加载第一条详情
			var list = $("#item-list li");
			if ( list.length  && list.length > 0 ) {
				getDetail( $(list.eq(0)).attr('id') )
			} else {
				console.log('nothing...');
				$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╮(─▽─)╭</p>')
			}
			
			// 点击加载详情
			$("#item-list li").each( function () {
				$(this).click(function () {
					getDetail( $(this).attr('id') )
				})
			} );

		}
	});
}

// 右侧详细信息联动
function getDetail(thisID) {
	//console.log(thisID);
	$.ajax({
		type:"POST",
		url:"./MyController",
		dataType:"json",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data:{
			gid: thisID,
			action: "getdetail"
		},
		error:function () {
			status('商品详情加载失败(╥╯^╰╥)')
		},
		success:function (data) {
			$("#good-id").html(data.gid)//
			$("#publish-time").html(data.release_time)
			$(".user img").attr("src",data.yb_userhead_url) 
			$("#user-name").html(data.sellername)
			$("#good-title").val("标题：" + data.title)
			$("#good-img").html(data.pic_url)
			$("#price-num").html(data.price)
			$("#sort").html(data.labelArray)  
			$("#particulars").html(data.detail)

			// 剪裁商品图片
			var canvas = $(".good-img")[0]
			var	ctx = canvas.getContext("2d")
			var	img = new Image()
			img.src = data.pic_url
			img.onload = function () {
				ctx.drawImage(img, 0, 0, 300, 200, 0, 0, 300, 200)
			}
			
			// 可否议价
			if (data.bargin == 1) {
				$("#bargain-able").html("是")
			} else {
				$("#bargain-able").html("否")
			}

			var canvas = $(".good-img")[0]
			var	ctx = canvas.getContext("2d")
			var	img = new Image()
			img.src = data.pic_url
			img.onload = function () {
				var w = img.width
				var h = img.height
				var dw = 300/w 			//canvas与图片的宽高比
				var dh = 200/h
				var ratio		
				// 裁剪图片中间部分
				if(w > 300 && h > 200 || w < 300 && h < 200){
					if (dw > dh) {
						ctx.drawImage(img, 0, (h - 200/dw)/2, w, 200/dw, 0, 0, 300, 200)
					} else {
						ctx.drawImage(img, (w - 300/dh)/2, 0, 300/dh, h, 0, 0, 300, 200)
					}
				}
				// 拉伸图片
				else{
					if(w < 300){
						ctx.drawImage(img, 0, (h - 200/dw)/2, w, 200/dw, 0, 0, 300, 200)
					}else {
						ctx.drawImage(img, (w - 300/dh)/2, 0, 300/dh, h, 0, 0, 300, 200)
					}
				}
			}
		}
	});
}

// 触发搜索操作
function searchTrigger() {
	var searchText = $("#search-text").val()
	searchText = searchText.replace(/\s/g, '')
	if (searchText.length > 0) {
		searchFor( searchText )
	}
}

// 加载搜索匹配内容
function searchFor( key ) {
	//console.log(key)
	$.ajax({
		type:"POST",
		url:"./MyController",
		dataType:"json",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data:{
			searchValue:key,
			action: "search"
		},
		beforeSend:function () {	
			$("#item-list").html("")	
			$("#loading").html("<img src='images/loading.gif'>")
		},
		error:function () {
			$("#loading").html("加载失败")
			$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╥﹏╥</p>')
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				$("#loading").html("没有匹配的举报信息")
				$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╮(─▽─)╭</p>')
			} else {
				var lis = "";
				$.each( data, function (index, item) {
					lis += "<li id='" + item.gid + "'><img src='" + item.yb_userhead_url + "' alt='用户头像'><span>" + item.title + "</span></li>"
				});
				$("#loading").html("")
				$("#item-list").html(lis)
			}

			//显示分页
			countPage()
			
			// 默认加载第一条详情
			var list = $("#item-list li");
			if ( list.length  && list.length > 0 ) {
				getDetail( $(list.eq(0)).attr('id') )
			} else {
				console.log('nothing...');
				$('form:eq(0)').html('<p style="text-align:center; margin-top:100px;">╮(─▽─)╭</p>')
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
	var ignoreId = $("#good-id").html()
	console.log(ignoreId)
	
	$.ajax({
		type:"POST",
		url:"./MyController",
		dataType:"text",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data:{
			gid:ignoreId,
			signal:type,
			action:"iod"
		},
		error:function () {
			status('操作失败(╥╯^╰╥)')
		},
		success:function (data) {
			if (data == "success") {
				var $list_wrap = $("#item-list")
				    $list =  $("#item-list li")
				    len = $list.length
				    
				for(var i = 0; i < len; i++){
					(function closer(idx) {
						if($list.eq(idx).attr('id') == ignoreId){
							//删除此条目
							$list_wrap[0].removeChild($list.eq(idx)[0])
							// 计算当前页数
							var pageSize = 9
							if ((idx+1)%pageSize == 0) {
								var pageNow = (idx+1)/pageSize
							} else {
								var pageNow = Math.floor((idx+1)/pageSize) + 1
							}
							//显示分页
							console.log(pageNow)
							countPage(pageNow)
							//如果删除第一条，重新加载新的第一条详情
							var $newList = $("#item-list li")
							getDetail($newList.eq(0).attr('id'))
							return
						}
					})(i)
				}
				status('操作成功(๑╹◡╹)ﾉ"""')
			} else {
				status('操作失败(╥╯^╰╥)')
			}
		}
	});
}

// 提示用户操作结果
function status(msg) {
	var $status = $('<div class="status"></div>')		
	$status.text(msg)
	$(document.body).append($status)
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

$(function () {
	// 加载左侧列表		    
	getData()	
	
	// 点击搜索
	$(".search-btn").click( function () {
		searchTrigger()
	})
	// enter键搜索
	$(document).keypress(function (event) {
		if (event.keyCode === 13) {
			searchTrigger()
		}
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
