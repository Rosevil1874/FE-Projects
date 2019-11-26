 <?php
	require('./conn.php');
			
	//构造SQL语句，从数据库中 查找 $id 对应清理时间信息
	$sql = "SELECT * FROM `trashdetails` WHERE cleanTime != '0000-00-00 00:00:00' order by cleanTime desc";
	$rs=mysqli_query($conn,$sql);
	
	/*
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$crashID=$row['crashID'];//【数据】垃圾桶id
	$receiveTime=$row['receiveTime'];	//【数据】需要清理时间
	$cleanTime=$row['cleanTime'];	//【数据】清理时间
	$capacity=$row['capacity'];	//【数据】内部容量信息
	$truckID=$row['truckID'];	//【数据】垃圾车编号
	*/
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>管理</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
</head>
<body>
	<nav><img src="images/logo.png" alt="logo" id="logo">辣鸡全家桶</nav>
	<main id="manegeMain">
		<table border=".5" bordercolor="#D0D5CA" cellspacing="0">
			<thead>
				<tr>
					<th>垃圾桶编号</th>
					<th>需要清理时间</th>
					<th>得到处理时间</th>
					<th>内部容量</th>
					<th>垃圾车编号</th>
				</tr>
			</thead>
			<tbody>
				<?php
					while( $row=mysqli_fetch_assoc($rs) ){
					?>
						<tr>
							<td><?=$row['crashID']?></td>
							<td><?=$row['receiveTime']?></td>
							<td><?=$row['cleanTime']?></td>
							<td><?=$row['capacity']?></td>
							<td><?=$row['truckID']?></td>
						</tr>
					<?php
					}
				?>
			</tbody>
		</table>
		<div id="loading"></div>
	</main>
	<div class="changeView" id="toMap">地图<br>视图</div>

<script type="text/javascript">
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
	function result(msg) {
		var $result = $('<div class="result"></div>')	
		    $body = $(document.body)	
			$tbody = $("table tbody:eq(0)")
		$result.text(msg)
		$tbody.html('')
		$body.append($result)
		$result.animate({height: "50px"}, 500)
		var timer = setTimeout(function () {
			$result.animate({height: "0px"}, 500)
			var timer2 = setTimeout(function () {
				$result.remove()
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
				$loading.html("加载失败(╥╯^╰╥)")
				result('获取数据失败(╥╯^╰╥)')
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
			$toMap = $("#toMap")

		$toMap.click(function () {
			window.open('map.html')
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
</script>
</body>
</html>