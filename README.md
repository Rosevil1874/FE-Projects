# intelligent-dustbin
the interface of the “Intelligent Dustbin” project

# 功能概述
1. 在地图上显示不同状态垃圾桶以及垃圾站的位置；
2. 点击垃圾箱marker显示该垃圾箱状态详情

# 日志
## 2017/6/28
1. 尝试了Google Maps API以及百度地图API，百度的操作逻辑乱的可以，选择了Google
2. 调用API获取当前位置并成功标记 :smile:
3. 使用不同logo标记不同状态的垃圾箱【normal，full，timeout】以及垃圾站
4. 自己设置的经纬度无法在地图上定位，于是在其他工具上找到了附近几个点的真实经纬度进行标记
5. 由于有几种不同状态的标记，标记聚类失败 :cry:

## 2017/06/29
1. 地图主页移动端适应
2. 每个辣鸡桶详情页面，使用echarts做出大致呈现
3. 管理页面做了个丑丑的列表
4. 目前不涉及任何事件响应和数据交互

下一步：
1. 地图上marker的点击跳转到详情页面
2. 根据传入的辣鸡桶百分比改变呈现
3. 管理界面美化美化！！点击排序功能

## 2017/06/30
1. paging页面：传入percentage参数，控制垃圾桶示意图的显示，未容纳垃圾的层级显示为灰色；
2. paging页面：右边详细数据部分以及percentage均使用ajax请求；

## 2017/07/01
1. add: 登录页面，用户名为“nao”，密码为“111111”；
2. add: manage页面，管理垃圾桶处理的历史情况，目前只能浏览信息，无增删操作；
3. change: 地图页面marker加入了高温预警“hot”；

## 2017/07/03
1. change： 登录后直接进入地图页面；
2. add: 地图页面加入跳转到管理页面的按钮；
3. add: 管理页面加入跳转到地图页面的按钮; 
4. add: 每个辣鸡桶详情页面移动端响应；
5. add: 单击地图上的marker，跳转到该垃圾箱的详情页面并传送对应垃圾箱ID号到详情页面，以完成对应数据获取；
6. TODO: 管理页面移动端媒体查询无效；

## 2017/07/07
1. add: 地图页面鼠标滑过marker显示信息，移走鼠标关闭信息窗口;
2. TODO: 地图两点间路线导航，猜测配置有问题，发生错误如下：
![error](http://img.blog.csdn.net/20170707170310698?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvVml2aWFuX2pheQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


## 2017/07/24
1. 两点间路线导航成功，最后发现问题是单词拼写错误orz。功能包括地图上以折线形式展示以及文字形式导航；
2. TODO：含至少含一个途经点的路径规划算法。

## 2017/09/04
1. add: 搭建wamp本地测试环境；
2. add: 地图页面实现ajax动态获取数据;
3. TODO: 其余页面纯PHP获取，待修改;
4. TODO: 固定时间间隔自动更新数据，待商榷。