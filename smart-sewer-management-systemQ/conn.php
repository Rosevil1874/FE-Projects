<?php
header('Content-Type:text/html;charset=utf-8');

//连接数据库
$conn = @mysqli_connect('localhost','root','','sewer');
if (mysqli_connect_errno($conn)) 
{ 
    echo "连接 MySQL 失败: " . mysqli_connect_error(); 
} 

// 设置字符集
mysqli_set_charset($conn,'utf8');

?>