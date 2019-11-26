<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

$sql = "select * from monitor";
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
