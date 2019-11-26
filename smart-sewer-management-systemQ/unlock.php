<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./conn.php');

// 获取json格式数据，转化为对象
$recive = file_get_contents('php://input');
$dataObj = json_decode($recive);
$myData = $dataObj->data;

// // 提取属性
$username = $myData->username;
$password = $myData->password;

$sql = "select * from users where username = '$username'";
$res = mysqli_query( $conn, $sql );

if ($row = mysqli_fetch_assoc($res)) {
	if ($row['password'] === $password) {		// 用户名存在且密码正确
		echo 1;			// 是管理员
	} else {
		echo 0;			//密码错误
	}
}

?>
