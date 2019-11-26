<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

// 获取json格式数据，转化为对象
$recive = file_get_contents('php://input');
$dataObj = json_decode($recive);
$myData = $dataObj->data;

// 提取属性
$deviceId = $myData->deviceId;

// 获取当前编号的最后一条记录（最新记录）作为当前状态
$sql = "select * from monitor where device_id = '$deviceId' order by id desc limit 1";
$res = mysqli_query( $conn, $sql );

if ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'id' => $row['device_id'],
		'type' => $row['type'],
		'status' => $row['status'],
		'event' => $row['event'],
		'area' => $row['area'],
		'address' => $row['address'],
		'principal' => $row['principal'],
		'principalTel' => $row['principal_tel'],
		'lng' => $row['lng'],
		'lat' => $row['lat'],
		'description' => $row['description']
	);
	echo json_encode($arr);
}

?>
