<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

// 获取json格式数据，转化为对象
$recive = file_get_contents('php://input');
$dataObj = json_decode($recive);
$myData = $dataObj->data;

// // 提取属性
$username = $myData->username;

$sql = "select * from users where username = '$username'";
$res = mysqli_query( $conn, $sql );

// $row = mysqli_fetch_assoc($res);
// // echo $row['password'];

if ($row = mysqli_fetch_assoc($res)) {
	$arr[] = array(
		'username' => $username,
		'phoneNumber' => $row['tel'],
		'email' => $row['email'],
		'department' => $row['department']
	);
	echo json_encode($arr);
}

?>
