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
$username = $myData->username;
$password = $myData->password;

// 密码字符串解密
$password = urldecode( $password );
$sql = "select * from users where username = '$username'";
$res = mysqli_query( $conn, $sql );

// $row = mysqli_fetch_assoc($res);
// echo $row['password'];

if ($row = mysqli_fetch_assoc($res)) {
	if ($row['password'] === $password) {		// 用户名存在且密码正确
		if ($row['is_manager'] === '是') {
			echo 0;			// 是管理员
		} else {
			echo 1;			// 不是管理员
		}
	} else {
		echo -1;			//密码错误
	}
} else {
	echo -2;				//用户名不存在
}

?>
