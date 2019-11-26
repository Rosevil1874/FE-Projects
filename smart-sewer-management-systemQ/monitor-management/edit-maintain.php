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
$deviceId = $myData->id;
$address = $myData->address;
$principal = $myData->principal;
$principalTel = $myData->principalTel;
$damageDate = $myData->damageDate;
$maintainDate = $myData->maintainDate;
$reason = $myData->reason;
$description = $myData->description;

// // 密码字符串解密
$sql = "update maintain set 
		address='$address', principal='$principal', principal_tel='$principalTel', 
		damage_date='$damageDate',maintain_date='$maintainDate',
		reason='$reason' , description='$description' 
		where device_id='$deviceId'";
$res = mysqli_query( $conn, $sql );

if ($res) {
	echo 1;		//成功
} else {
	// echo -1;	//失败
	echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>
