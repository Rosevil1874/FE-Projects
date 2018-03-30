<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

$sql = "select * from nodes";
$res = mysqli_query( $conn, $sql );

while ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'deviceId' => $row['device_id'],
		'type' => $row['type'],
		'monitor' => $row['monitor'],
		'status' => $row['status'],
		'address' => $row['address'],
		'installDate' => $row['install_date'],
		'description' => $row['description']
	);
}
echo json_encode($arr);

?>
