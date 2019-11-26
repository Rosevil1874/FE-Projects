<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

// 获取json格式数据，转化为对象
$recive = file_get_contents('php://input');
$dataObj = json_decode($recive);
$myData = $dataObj->data;

// 提取各个属性
$userId = $myData->userId;
$newUsername = $myData->newUsername;
$newPassword = $myData->newPassword;
$phoneNumber = $myData->phoneNumber;
$email = $myData->email;
$department = $myData->department;
$isManager = $myData->isManager;

// 密码字符串加密
$newPassword = urlencode( $newPassword );
$sql = "insert into users( user_id, username, password, tel, email, department,  is_manager ) values( $userId, '$newUsername', '$newPassword', '$phoneNumber', '$email', '$department', '$isManager')";

$res = mysqli_query( $conn, $sql );

if ($res) {
	echo 1;		//成功
} else {
	// echo -1;	//失败
	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>
