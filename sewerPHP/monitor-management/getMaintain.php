<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

$sql = "select * from maintain";
$res = mysqli_query( $conn, $sql );

while ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'id' => $row['device_id'],
		'type' => $row['type'],
		'status' => $row['status'],
		'address' => $row['address'],
		'principal' => $row['principal'],
		'principalTel' => $row['principal_tel'],
		'damageDate' => $row['damage_date'],
		'maintainDate' => $row['maintain_date'],
		'reason' => $row['reason'],
		'description' => $row['description']
	);
}
echo json_encode($arr);

?>
