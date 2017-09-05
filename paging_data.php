 <?php
	require('./conn.php');
	
	//接收id值
	$id=$_POST['ID'];
	
	//构造SQL语句，从数据库中 查找 $id 对应位置信息
	$sql = "SELECT * FROM `trashposition` WHERE crashID = $id and type = 0 LIMIT 1";
	$rs=mysqli_query($conn,$sql);
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$site=$row['site'];	//【数据】位置信息
	
	//构造SQL语句，从数据库中 查找 $id 对应清理时间信息
	$sql = "SELECT * FROM `trashdetails` WHERE crashID = $id and cleanTime != '0000-00-00 00:00:00' order by receiveTime desc LIMIT 1";
	$rs=mysqli_query($conn,$sql);	
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$cleanTime=$row['cleanTime'];	//【数据】清理时间信息
	
	
	//构造SQL语句，从数据库中 查找 $id 对应容量和温度值
	$sql = "SELECT * FROM `trashdetails` WHERE crashID = $id order by receiveTime desc LIMIT 1";
	$rs=mysqli_query($conn,$sql);	
	//从结果集中获取一条数据
	$row=mysqli_fetch_assoc($rs);
	$capacity=$row['capacity'];	//【数据】内部容量信息
	$temValue=$row['temValue'];	//【数据】当时温度值信息
	$note=$row['note'];	//【数据】垃圾桶状态值 0-正常，1—满，2-长时间未处理，-1-高温
	
	$needClean = $capacity>=80 ? true : false ;
	$tempWarning = $note==-1 ? true : false ;
	
	//构造结果集，返回给前端
	//垃圾桶编号、位置、清理时间、容量、温度、状态、是否需要清理、温度是否过高
	$dataList = array();
	$dataList =array("crashID"=>$id,"site"=>$site,"cleanTime"=>$cleanTime,
					"capacity"=>$capacity,"temValue"=>$temValue,"note"=>$note,
					"needClean"=>$needClean,"tempWarning"=>$tempWarning); 
					
	echo json_encode( $dataList );
?>