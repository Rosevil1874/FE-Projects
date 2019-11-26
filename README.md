# 二手市场PC端-管理员

## 2017/03/18
>由于提交冲突，回退到了前面的版本直接提交了今天的更改。

	将脚本从JavaScript改为了jQuery。
	没什么动机，估计是看到移动端用jQuery写的吧，不一样难受(╯﹏╰)


## 2017/03/20
1. 商品图片由三张减少到一张，样式上有微调

2. 加上了数据加载和搜索商品的Ajax

3. 初步数据交互格式：
略　　　

## 2017/03/21
1. 自适应完美

2. 完善了搜索部分Ajax，添加了忽略或删除举报商品部分Ajax，目前数据传输格式为json【为了自己测试】。明天将传输格式改为Japan，进一步讨论一些细节。

3. 当前数据交互格式：

#### 一、加载项：传前端：
1. 左侧列表：
	- gid：商品ID（int类型）
	- yb_userhead_url：用户头像src（varchar)
	- title：商品标题(varchar)
	　　
2. 右侧商品详情：
	- gid：商品ID（int类型）
	- release_time：发布日期（xx年xx月xx日）(timestamp)
	- yb_userhead_url：用户头像src(varchar)
	- sellername：用户昵称(varchar)
	- title：商品标题(varchar)
	- pic_url：商品图片src(varchar)
	- price：商品价格（int类型）
	- labelArray：分类(varchar)
	- detail：商品详情(varchar)
	- bargin：是否可议价（Boolean类型【1：可议价，0：不可议价】）
 
注：
1. 初始化时加载全部商品的ID、用户头像、标题到左侧列表，默认加载第一项详情。
2. 点击左侧条目时，传商品ID到后台，后台根据ID检索并返回商品详细信息到前端。
	　　
#### 二、搜索：
1. 传后台
	searKey：搜索关键字（string类型）
2. 传前端
	根据关键词按加载项中格式传输左侧列表数据到前端，并默认加载第一条详情。

#### 三、忽略/删除
1. 传后台
	+ signal:  "ignore"或"del"（string类型）
		+ signal=ignore时，将商品信息从举报列表中移除；
		+ signal=del时，将商品信息同时从举报列表和商品总列表中移除。
	+ gid: 商品ID（int类型）
	　　　
2. 传前端--对ignore和del均适用：
	+ 操作成功返回字符串"success"；
	+ 操作失败返回字符串"fail"。
　　　
## 2017/03/22
1. 可议价按钮还没商量好
2. 文件已发给后端，有问题再改

## 2017/03/30
1. 右侧详情因为图片缩减为1张而有布局改动；
2. 界面使用了固定宽度布局，取消了自适应；
3. 使用canvas做图片裁剪，裁剪比例有待改善。

## 2017/05/12
换了后台，数据库有改动，数据交互格式直接在上面改了，参见2017//3/21的数据交互格式。

## 2017/05/17
bug bug bug
1. 搜索功能没反应
	- 原因：获取搜索按钮错误，导致函数并没有绑定到搜索按钮上，所以点击搜索按钮无法正确使用其功能。
	- 解决：正确将函数绑定到搜索按钮上。
	- 添加：加载出搜索结果后默认加载第一条详情。
2. getdetail调用的次数和我点击的次数不一样，调用比点击多很多次而且穿进去的都是空值。
	- 原因：使用事件委托机制，将点击事件绑定到了每个条目的父元素上，每次点击时获取当前时间target。问题就在于并不是每次点击事件的target都是需要的带有ID属性的li元素，而是经常是li的子元素span【商品title】，导致无法正确传递当前点击商品的ID号给getDetail函数。
	- 解决：取消事件委托，依次为每个商品条目(li元素)绑定click事件，将当前ID传给getDetail函数。
3. 当左侧列表加载失败或者当前没有被举报商品，时，右侧均显示为初始的布局，用户体验不好。
	添加：
	- 左侧列表加载失败时以及右侧详情加载失败时，右侧显示“哭泣”颜文字；
	- 当前没有被举报商品时以及搜索结果为空时，右侧显示“摊手”颜文字。
4. 点过一次获取detail的商品再点回去就获取失败了【这个。。还没懂到底是个什么bug】

## 2017/05/18
添加： 
1. enter键触发搜索操作；
2. 检测搜索框中是否有内容【出去空格、回车、换行符等空白字符后】，没有则不调用搜索函数。
- 问题：
	- 点击左侧商品条目没反应，经测试发现获取不到对应元素；
- 原因：
	- 元素是通过ajax调用获取并显示的，而获取并绑定事件的操作与ajax同时进行，无法获取到当前不存在的元素；
- 解决：
	- 将获取并绑定click事件代码移到获取左侧条目的函数getData内ajax成功部分回调。

## 2017/05/20
bug bug bug again
1. 页码无法显示
	- 原因：由于调用页码计算函数与数据请求是并行的，因此在计算页码时列表并未加载出来并渲染到页面上，其无法获取列表元素；
	- 解决：将页码计算显示的函数调用放到列表请求的ajax里，并于成功后执行。

2. 忽略与删除操作总是失败
	- 原因：前端根据后台传回的字符串“success”/“fail”反馈操作结果，但后台并未返回数据给前端，操作error
	- 解决：后台按情况返回字符串给前端，但仍未解决。
		- 原因：ajax中dataType参数是“json”，而后台返回的是字符串；
		- 解决：dataType改为“text”，正确接收并处理字符串。

3. 删除操作后页面上仍显示条目
	- 原因：删除操作后只有成功与否的反馈，没有进一步更新；
	- 解决：找到并从页面中删除当前条目，与数据库同步。

4. 删除后跳到第一页
	- 问题：paging函数中默认的当前页面是第一页
	- 解决：每次删除计算删除的条目的页码，并作为参数传入paging

## 2017/05/26
桑博涵小同学的建议下，把粗暴的alert弹出框改成了短暂显示操作状态的提示框，不用用户点击，友好友好 :star: