<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

$sql_normal = "select * from monitor where status='正常'";
mysqli_query( $conn, $sql_normal );
$count_normal = mysqli_affected_rows( $conn );

$sql_warning = "select * from monitor where status='预警'";
mysqli_query( $conn, $sql_warning );
$count_warning = mysqli_affected_rows( $conn );

$sql_danger = "select * from monitor where status='告警'";
mysqli_query( $conn, $sql_danger );
$count_danger = mysqli_affected_rows( $conn );

$arr = array(
	'normal' => $count_normal,
	'warning' => $count_warning,
	'danger' => $count_danger
);
echo json_encode($arr);

?>
