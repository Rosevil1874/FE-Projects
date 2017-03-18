
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

// 点击关闭按钮时清空搜索框输入数据
function clearInput() {
	var $searchText = $("#search-text")
	$("#close-btn").click(function() {
		$searchText.val("")
		$searchText.focus()
	})
}

$(function () {
	paging(1)			// 初始化页面为第一页
	clearInput()
})
