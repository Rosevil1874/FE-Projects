 <?php
	require('./conn.php');
	
	//接收id值
	$id=$_GET['ID'];
	
	//构造SQL语句，从数据库中 查找 $id 对应位置信息
	$sql = "SELECT * FROM `trashposition` WHERE crashID = $id and type = 0 LIMIT 1";
	$rs=mysqli_query($conn,$sql);
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$site=$row['site'];	//【数据】位置信息
	
	//构造SQL语句，从数据库中 查找 $id 对应清理时间信息
	$sql = "SELECT * FROM `trashdetails` WHERE crashID = $id and cleanTime != '0000-00-00 00:00:00' order by receiveTime desc LIMIT 1";
	$rs=mysqli_query($conn,$sql);	
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$cleanTime=$row['cleanTime'];	//【数据】清理时间信息
	
	
	//构造SQL语句，从数据库中 查找 $id 对应容量和温度值
	$sql = "SELECT * FROM `trashdetails` WHERE crashID = $id order by receiveTime desc LIMIT 1";
	$rs=mysqli_query($conn,$sql);	
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$capacity=$row['capacity'];	//【数据】内部容量信息
	$temValue=$row['temValue'];	//【数据】当时温度值信息
	$note=$row['note'];	//【数据】垃圾桶状态值 0-正常，1—满，2-长时间未处理，-1-高温
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>桶桶</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
</head>
<body>
	<main>
		<!-- 图示垃圾箱当前容纳垃圾百分比 -->
		<section id="status"></section>
		
		<!-- 详细数据 -->
		<section id="data">
			<ul class="clearfix">
				<li><span class="type">垃圾桶编号</span><span class="detial" id="crashID">   <?php echo $id;?>    </span></li>
				<li><span class="type">所在位置</span><span class="detial" id="site">	<?php echo $site;?>		</span></li>
				<li><span class="type">内部容量</span><span class="detial" id="capacity">	<?php echo $capacity;?>	%</span></li>
				<li><span class="type">温度</span><span class="detial" id="temValue">		<?php echo $temValue;?> ℃</span></li>
				<li><span class="type">清理时间</span><span class="detial" id="cleanTime">	<?php echo $cleanTime;?>		</span></li>
			</ul>
			<span class="label" id="needClean">需要清理</span>
			<span class="label" id="tempWarning">温度正常</span>
		</section>
	</main>
<!-- ECharts单文件引入 -->
<script type="text/javascript" src="js/echarts.js"></script>
<!-- 为模块加载器配置echarts和所需图表的路径 -->
<script type="text/javascript">

// 提示用户操作结果
function result(msg) {
	var $result = $('<div class="result"></div>')	
	var $body = $(document.body)	
	$result.text(msg)
	$body.html('')
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

// 获取数据
function getData() {
	// 获取地图页面传过来的垃圾箱ID号
	var msg = window.location.search
	var ID = 0		//ID号初始化为0
	if(msg != ''){
		ID = msg.split("?")[1].split('=')[1]
	}

	// 发送该垃圾箱ID号，获取对应详情
	$.ajax({
		type:"POST",
		url:"",
		dataType:"text",
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		data:{
			id:ID
		},
		error:function () {
			result("获取数据失败(╥╯^╰╥)")
		},
		success:function (data) {
			if ($.isEmptyObject(data)) {
				result("当前没有清理记录")
			} else {
				$('#dustbinID').html(data.dustbinID)
				$('#site').html(data.site)
				$('#height').html(data.height)
				$('#pressure').html(data.pressure)
				$('#temperature').html(data.temperature)
				$('#cleanTime').html(data.cleanTime)
				$('#needClean').html(data.needClean)
				$('#tempWarning').html(data.tempWarning)

				// 根据获取的百分比绘制垃圾桶
				showDustbin(data.percentage)
			}
		}
	})
}

// 根据获取的百分比绘制垃圾桶
function showDustbin(percentage) {
	require.config({
		// 路径配置
		paths:{
			echarts:'http://echarts.baidu.com/build/dist'
		}
	})

	// 使用
	require(
		[
			'echarts',
			'echarts/chart/funnel'
		],
		function (ec) {
			// 基于准备好的DOM5，初始化echarts图表
			var myChart = ec.init(document.getElementById('status'))

			var option={
				color:[
					'rgba(255, 69, 0, 0.5)',
					'rgba(255, 150, 0, 0.5)',
					'rgba(255, 200, 0, 0.5)',
					'rgba(155, 200, 50, 0.5)',
					'rgba(55, 200, 100, 0.5)'
				],
				title:{
					text:'垃圾桶容纳状态'
				},
				tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}%"
			    },
				toolbox: {
			        show : true,
			        orient: 'vertical',
	        		top: 'center',
			        feature : {
			            mark : {show: false},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    legend: {
			    	orient: 'vertical',
			    	x: 'left',
		            y: 'bottom',
		            data : ['全满急需处理','待处理','接近待处理','正常','空闲']
		        },
		        calculable : true,
	            series : [
	                {
	                    name:'状态',
	                    type:'funnel',
	                    x: '10%',
	                    // y:60,
	                    // y2:60,
	                    // width: '80%',
	                    // min:0,
	                    // max:100,
	                    minSize:'40%',
	                    maxSize:'100%',
	                    sort:'descending',
	                    gap:10,
	                    itemStyle: {
	                        normal: {
	                            label: {
	                            	shoW:true,
	                            	position:'inside'
	                                // formatter: '{b}状态'
	                            },
	                            labelLine: {
	                                show : false,
	                                length:10,
	                                lineStyle:{
	                                	width:1,
	                                	type:'solid'
	                                }
	                            }
	                        },
	                        emphasis: {
	                        	borderColor:'yellow',
	                        	borderWidth:3,
	                            label: {
	                            	show:true,
	                                // position:'inside',
	                                formatter: '{b}状态 : {c}%',
	                                textStyle:{
	                                	fontSize:15
	                                }
	                            },
	                            labelLine:{
	                            	show:true
	                            }
	                        }
	                    },
	                    data:[
	                        {value:100, name:'全满急需处理'},
	                        {value:80, name:'待处理'},
	                        {value:60, name:'接近待处理'},
	                        {value:40, name:'正常'},
	                        {value:20, name:'空闲'}
	                    ]
	                }
	        	]
			}
			if (percentage <= 20) {
				option.color = [
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(55, 200, 100, 0.5)'
				]
			} else if(percentage > 20 && percentage <= 40) {
				option.color = [
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(155, 200, 50, 0.5)',
					'rgba(55, 200, 100, 0.5)'
				]
			} else if(percentage > 40 && percentage <= 60) {
				option.color = [
					'rgba(114, 114, 114, 0.3)',
					'rgba(114, 114, 114, 0.3)',
					'rgba(255, 200, 0, 0.5)',
					'rgba(155, 200, 50, 0.5)',
					'rgba(55, 200, 100, 0.5)'
				]
			} else if(percentage > 60 && percentage <= 80) {
				option.color = [
					'rgba(114, 114, 114, 0.3)',
					'rgba(255, 150, 0, 0.5)',
					'rgba(255, 200, 0, 0.5)',
					'rgba(155, 200, 50, 0.5)',
					'rgba(55, 200, 100, 0.5)'
				]
			} 

			// 为echarts对象加载数据
			myChart.setOption(option)
		}
	)
}

$(function () {

	// 获取数据
	// getData()

	// 根据获取的百分比绘制垃圾桶
	showDustbin( <?php echo $capacity ?> )
})
</script>
</body>
</html>