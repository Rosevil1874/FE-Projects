<?php
// 跨域
header('Access-Control-Allow-Origin: *');
// 连接数据库
include('./../conn.php');

// 获取满足条件的记录条数
$sql1 = 
	"SELECT 
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='岳麓区' AND status='预警') AS 'yuelu_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='岳麓区' AND status='告警') AS 'yuelu_danger',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='天心区' AND status='预警') AS 'tianxin_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='天心区' AND status='告警') AS 'tianxin_danger',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='雨花区' AND status='预警') AS 'yuhua_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='雨花区' AND status='告警') AS 'yuhua_danger',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='芙蓉区' AND status='预警') AS 'furong_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='水位' AND area='芙蓉区' AND status='告警') AS 'furong_danger',
		(SELECT COUNT(*) FROM monitor WHERE type='井盖' AND area='开福区' AND status='预警') AS 'kaifu_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='井盖' AND area='开福区' AND status='告警') AS 'kaifu_danger',
		(SELECT COUNT(*) FROM monitor WHERE type='井盖' AND area='望城区' AND status='预警') AS 'wangcheng_warn',
		(SELECT COUNT(*) FROM monitor WHERE type='井盖' AND area='望城区' AND status='告警') AS 'wangcheng_danger'
	";

$result = mysqli_fetch_array( mysqli_query( $conn, $sql1 ) ); 

$arr[] = array(
	'yuelu_warn' => $result['yuelu_warn'],
	'yuelu_danger' => $result['yuelu_danger'],
	'tianxin_warn' => $result['tianxin_warn'],
	'tianxin_danger' => $result['tianxin_danger'],
	'yuhua_warn' => $result['yuhua_warn'],
	'yuhua_danger' => $result['yuhua_danger'],
	'furong_warn' => $result['furong_warn'],
	'furong_danger' => $result['furong_danger'],
	'kaifu_warn' => $result['kaifu_warn'],
	'kaifu_danger' => $result['kaifu_danger'],
	'wangcheng_warn' => $result['wangcheng_warn'],
	'wangcheng_danger' => $result['wangcheng_danger']
);
echo json_encode($arr);

?>
