 <?php
	require('./conn.php');
			
	//构造SQL语句，从数据库中 查找 $id 对应清理时间信息
	$sql = "SELECT * FROM `trashdetails` WHERE cleanTime != '0000-00-00 00:00:00' order by cleanTime desc";
	$rs=mysqli_query($conn,$sql);
	$dataList = array();
	
	//将结果集 rs 的内容选择需要的整理并放在 $dataList 中
	while( $row=mysqli_fetch_assoc($rs) ){
		
		//垃圾桶id、需要清理时间、清理时间、内部容量、垃圾车编号
		$dataList[]=array("crashID"=>$row['crashID'],"receiveTime"=>
					$row['receiveTime'],"cleanTime"=>$row['cleanTime'],
					"capacity"=>$row['capacity'],"truckID"=>$row['truckID']); 
	}
	echo json_encode( $dataList );
?>