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

$sql = "select * from monitor where device_id='$deviceId";
$res = mysqli_query( $conn, $sql );

while ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'id' => $row['device_id'],
		'lng' => $row['lng'],
		'lat' => $row['lat'],
		'type' => $row['type'],
		'status' => $row['status'],
		'address' => $row['address']
	);
}
echo json_encode($arr);

?>
