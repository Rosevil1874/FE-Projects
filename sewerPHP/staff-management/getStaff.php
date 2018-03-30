<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

$sql = "select * from users";
$res = mysqli_query( $conn, $sql );

while ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'username' => $row['username'],
		'phoneNumber' => $row['tel'],
		'email' => $row['email'],
		'department' => $row['department'],
		'isManager' => $row['is_manager']
	);
}
echo json_encode($arr);

?>
