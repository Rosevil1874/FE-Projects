# 二手市场PC端-管理员
## 2017/03/18
>由于提交冲突，回退到了前面的版本直接提交了今天的更改。

	将脚本从JavaScript改为了jQuery。
	没什么动机，估计是看到移动端用jQuery写的吧，不一样难受(╯﹏╰)


## 2017/03/20

1. 商品图片由三张减少到一张，样式上有微调
2. 加上了数据加载和搜索商品的Ajax
3. 初步数据交换格式：

	**一、传前端（除特别标注均为string类型）：**
	**1. 左侧列表：**
	goodId：商品ID（int类型）
	portrait：用户头像src
	title：商品标题

	**2. 右侧商品详情：**
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

	**二、传后台（string类型）**
	searKey：搜索关键字

	根据关键词传输左侧列表数据，并默认加载第一条详情



