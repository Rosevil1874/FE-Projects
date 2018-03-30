<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

// 同一编号重复记录取最后一条（最新）
$sql = "SELECT * FROM monitor a WHERE NOT EXISTS (SELECT 1 FROM monitor where a.device_id = device_id AND a.id < id)";

$res = mysqli_query( $conn, $sql );

while ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'deviceId' => $row['device_id'],
		'type' => $row['type'],
		'status' => $row['status'],
		'event' => $row['event'],
		'area' => $row['area'],
		'address' => $row['address'],
		'principal' => $row['principal'],
		'principalTel' => $row['principal_tel'],
		'description' => $row['description']
	);
}
echo json_encode($arr);

?>
