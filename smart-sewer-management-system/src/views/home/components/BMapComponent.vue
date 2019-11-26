<template>
    <div id="allmap" v-bind:style="mapStyle"></div>
</template>

<script>
    import Vue from 'vue';
    import util from '../../../libs/util.js';
    import BaiduMap  from './baidu-map.js'
    export default {
        data:function(){
            return{
                ak: 'kTwCXpL1bfK1VGZeIIpVKhu9wThWY8wQ',
                mapStyle:{
                    width:'100%',
                    height:this.mapHeight +'px'
                }
            }
        },
        props:{
            // 地图在该视图上的高度
            mapHeight:{
                type:Number,
                default:500
            },
            // 经度
            longitude:{
                type:Number,
                default:112.9490102357
            },
            // 纬度
            latitude:{
                type:Number,
                default:28.186677419897
            },
            description:{
                type:String,
                default:'基地'
            }
        },
        methods: {
            
        },
        mounted (){
            BaiduMap.init().then(BMap => {
                // 显示地图
                var map =new BMap.Map("allmap",{
                    minZoom : 10,
                    maxZoom : 20
                });
                var point =new BMap.Point(this.longitude,this.latitude);
                map.centerAndZoom(point,17);

                // 是否已经选择了路径起始/终止位置
                let startChose = false
                let endChose = false
                let pointLng = this.longitude
                let pointLat = this.latitude
                let start_lng = 0.0
                let start_lat = 0.0
                let end_lng = 0.0
                let end_lat = 0.0

                // 路径规划
                function searchDirection(start_lng, start_lat, end_lng, end_lat){
                    startChose = false
                    endChose = false
                    map.clearOverlays()     //清除地图上所以覆盖物

                    let start = new BMap.Point(start_lng, start_lat)
                    let end = new BMap.Point(end_lng, end_lat)
                    var routePolicy = BMAP_DRIVING_POLICY_LEAST_TIME;   //最短时间路径
                    //调用search函数
                    var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true},policy:routePolicy});
                    walking.search(start, end); 
                }

                // 叠加一个类似图标在当前位置处，向其添加事件监听
                var myIcon = new BMap.Icon('http://localhost/sewer-system/image/site.png', new BMap.Size(32, 32), {
                    anchor: new BMap.Size(15, 27)
                })
                
                var mk = new BMap.Marker(point, {icon: myIcon});
                map.addOverlay(mk);
                mk.addEventListener('mouseover', function(){
                    let clickStart = false
                    let clickEnd = false
                    var opt = {
                        width: 50,
                        height: 90
                    }
                    
                    var content = "<h4>当前位置</h4>\
                                    <table>\
                                        <tr>\
                                            <td><button id='startBtn'>作为起点</button></td>\
                                            <td><button id='endBtn'>作为终点</button></td>\
                                        </tr>\
                                    </table>"
                    var infoWindow = new BMap.InfoWindow(content, opt);  // 创建信息窗口对象    
                    map.openInfoWindow(infoWindow, point);      // 打开信息窗口

                    document.getElementById('startBtn').addEventListener('click',function(){
                        map.closeInfoWindow()
                        startChose = true
                        start_lng = pointLng
                        start_lat = pointLat
                        if (endChose === true) {
                            searchDirection(start_lng, start_lat, end_lng, end_lat)
                        }
                    })
                    document.getElementById('endBtn').addEventListener('click',function(){
                        map.closeInfoWindow()
                        endChose = true
                        end_lng = pointLng
                        end_lat = pointLat
                        if (startChose === true) {
                            searchDirection(start_lng, start_lat, end_lng, end_lat)
                        }
                    })
                })

                // 添加控件
                map.addControl(new BMap.NavigationControl());    
                map.addControl(new BMap.MapTypeControl());    
                //开启鼠标滚轮缩放
                map.enableScrollWheelZoom(true);    

                // 自定义标注点
                var marker = new BMap.Marker(point);
                map.addOverlay(marker); 

                // 获取vue实例对象的this
                let _this = this

                // 添加标注及相应事件
                function addMarker(point, entity, myIcon) {
                    var marker = new BMap.Marker(point, {icon: myIcon})
                    map.addOverlay(marker)

                    // 鼠标滑过显示信息窗
                    marker.addEventListener("mouseover",function(){
                       
                        var opts = {    
                            width : 150,     // 信息窗口宽度    
                            height: 150      // 信息窗口高度    
                        }    
                        var content = "<h4>" + entity.type + "<a id='toDetail'>详情>></a></h4>\
                                        <table>\
                                            <tr>\
                                                <td>状态</td>\
                                                <td>" + entity.status + "</td>\
                                            </tr>\
                                            <tr>\
                                                <td>位置</td>\
                                                <td>" + entity.address + "</td>\
                                            </tr>\
                                            <tr>\
                                                <td><button id='startBtn'>作为起点</button></td>\
                                                <td><button id='endBtn'>作为终点</button></td>\
                                            </tr>\
                                        </table>"
                                        
                        var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象    
                        map.openInfoWindow(infoWindow, point);      // 打开信息窗口

                        // 绑定点击事件：选定起始点
                        document.getElementById('startBtn').addEventListener('click', function(){
                            map.closeInfoWindow()
                            startChose = true
                            start_lng = entity.lng
                            start_lat = entity.lat
                            if (endChose === true) {
                                searchDirection(start_lng, start_lat, end_lng, end_lat)
                            }
                        })
                        // 绑定点击事件：选定终止点
                        document.getElementById('endBtn').addEventListener('click', function(){
                           map.closeInfoWindow()
                           endChose = true
                           end_lng = entity.lng
                           end_lat = entity.lat
                           if (startChose === true) {
                               searchDirection(start_lng, start_lat, end_lng, end_lat)
                           }
                        })

                        // 根据当前监控点编号渲染详情页面
                        document.getElementById('toDetail').addEventListener('click', function(){

                            util.openNewPage(_this, 'detail_index');
                             _this.$router.push({
                                 name: 'detail_index',
                                 params: {
                                     id: entity.id
                                 }
                             });
                        })
                    })
                }

                // 获取标注信息
                for (var i = 0; i < 10; i++) {
                    this.$ajax.get('http://localhost/sewer-system/sewerPHP/home/get-point.php')
                        .then( res => {
                            for (var i = 0; i < res.data.length; i++) {
                                var entity = res.data[i]
                                var lng = res.data[i].lng
                                var lat = res.data[i].lat
                                var point = new BMap.Point(lng, lat)
                                var type = res.data[i].type
                                var status = res.data[i].status

                                if (type === '水位') {
                                    if (status === '正常') {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/water-normal.png', new BMap.Size(32, 32))
                                    } else if (status === '预警') {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/water-alert.png', new BMap.Size(32, 32))
                                    } else {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/water-danger.png', new BMap.Size(32, 32))
                                    }
                                } else {
                                    if (status === '正常') {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/sewer-normal.png', new BMap.Size(32, 32))
                                    } else if (status === '预警') {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/sewer-alert.png', new BMap.Size(32, 32))
                                    } else {
                                        var myIcon = new BMap.Icon('http://localhost/sewer-system/image/sewer-danger.png', new BMap.Size(32, 32))
                                    }
                                }
                                addMarker(point,entity, myIcon)
                            }
                        })
                }
            })
        }
    }
</script>
 
<style>
@import './styles/baidu-map.less';

/*去掉百度地图logo*/
.anchorBL{  
   display:none;  
}
</style>