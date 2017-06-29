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