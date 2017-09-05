<?php
header('Content-Type:text/html;charset=utf-8');

//连接数据库
$conn=@mysqli_connect('localhost','root','','trash') or die('error');
mysqli_query($conn,'set names utf8');

?>