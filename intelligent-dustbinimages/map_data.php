 <?php
	require('./conn.php');
			
	//构造SQL语句，从数据库中 查找 $id 对应清理时间信息
	$sql = "SELECT * FROM `trashposition` where 1";
	$rs=mysqli_query($conn,$sql);
	$dataList = array();

	while( $row=mysqli_fetch_assoc($rs) ){
		$crashID=$row['crashID'];
		$longitude=$row['longitude'];
		$latitude=$row['latitude'];
		if( $row['type']==1 ){
			$type_0='station';
		}else{
			$sql2 = "SELECT * FROM `trashdetails` where crashID=$crashID order by receiveTime desc LIMIT 1";
			$rs2=mysqli_query($conn,$sql2);
			$row2=mysqli_fetch_assoc($rs2);
			$note=$row2['note'];
			switch( $note ){
				case 1:	$type_0='full'; break;
				case 2:	$type_0='Timeout'; break;
				case -1:$type_0='Hot'; break;	
				default:$type_0='Normal';
			}			
		}
	
		$dataList[]=array("crashID"=>$crashID,"longitude"=>$longitude,"latitude"=>$latitude,"type_0"=>$type_0); 
	}
	echo json_encode( $dataList );
?>