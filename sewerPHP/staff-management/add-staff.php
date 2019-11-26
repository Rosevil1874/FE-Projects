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
$phoneNumber = $myData->phoneNumber;
$email = $myData->email;
$department = $myData->department;
$isManager = $myData->isManager;

$sql = "insert into users( username, tel, email, department,  is_manager ) values( '$username', '$phoneNumber', '$email', '$department', '$isManager')";

$res = mysqli_query( $conn, $sql );

if ($res) {
	echo 1;		//成功
} else {
	// echo -1;	//失败
	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>
