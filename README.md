# 二手市场PC端-管理员

## 2017/03/18
>由于提交冲突，回退到了前面的版本直接提交了今天的更改。

	将脚本从JavaScript改为了jQuery。
	没什么动机，估计是看到移动端用jQuery写的吧，不一样难受(╯﹏╰)


## 2017/03/20
1. 商品图片由三张减少到一张，样式上有微调

2. 加上了数据加载和搜索商品的Ajax

3. 初步数据交互格式：


	#### 一、传前端（除特别标注均为string类型）： 	
	1. 左侧列表：
		```
		goodId：商品ID（int类型）
		portrait：用户头像src
		title：商品标题
		```
	　　　
	2. 右侧商品详情： 
		```
		goodId：商品ID（int类型）
		time：发布日期（xx年xx月xx日）
		portrait：用户头像src
		userName：用户昵称
		title：商品标题
		picSrc：商品图片src
		price：商品价格（int类型）
		sort：分类
		particulars：商品详情
		bargin：是否可议价（Boolean类型【1：可议价，0：不可议价】）
		```

	#### 二、传后台（string类型） 
		searKey：搜索关键字
　　　
	**根据关键词传输左侧列表数据，并默认加载第一条详情**
　　　　

## 2017/03/21
1. 自适应完美

2. 完善了搜索部分Ajax，添加了忽略或删除举报商品部分Ajax，目前数据传输格式为json【为了自己测试】。明天将传输格式改为Japan，进一步讨论一些细节。

3. 当前数据交互格式：
	#### 一、加载项：传前端（除特别标注均为string类型）：
	1. 左侧列表：
		```
		goodId：商品ID（int类型）
		portrait：用户头像src
		title：商品标题
		```
	　　　
	2. 右侧商品详情：
		```
		goodId：商品ID（int类型）
		time：发布日期（xx年xx月xx日）
		portrait：用户头像src
		userName：用户昵称
		title：商品标题
		picSrc：商品图片src
		price：商品价格（int类型）
		sort：分类
		particulars：商品详情
		bargin：是否可议价（Boolean类型【1：可议价，0：不可议价】）
		```
	　　　
	>注：
	1. 初始化时加载全部商品的ID、用户头像、标题到左侧列表，默认加载第一项详情。
	2. 点击左侧条目时，传商品ID到后台，后台根据ID检索并返回商品详细信息到前端。
　　　
	#### 二、搜索：
	1. 传后台
		searKey：搜索关键字（string类型）

	2. 传前端
		根据关键词按加载项中格式传输左侧列表数据到前端，并默认加载第一条详情。
	　　　
	#### 三、忽略/删除
	1. 传后台

		signal:  "ignore"或"del"（string类型）
		goodId: 商品ID（int类型）
		a) signal=ignore时，将商品信息从举报列表中移除；
		b) signal=del时，将商品信息同时从举报列表和商品总列表中移除。

	2. 传前端

		对ignore和del均适用：
		1. 操作成功返回字符串"success"；
		2. 操作失败返回字符串"fail"。
　　　
## 2017/03/22
1. 可议价按钮还没商量好
2. 文件已发给后端，有问题再改