## 2018/03/05-15
1. 搭建开发环境；
2. 通读vue官方文档；
3. 通读vuex官方文档；
4. 通读vue-router官方文档；
5. 学习axios数据交互方式（vue作者推荐使用axios而非vue-router）；
6. 选择ivew组件库；
7. 基于以上搭建系统（包括登录、注册、保留用户登录信息直到退出、以及系统主要页面的框架）

## 2018/03/15
1. 放弃了前面自己写的系统，决定使用iview-admin；
2. 将登录注册改成了自己之前写的样子，全部使用iview的UI组件，不用boostrap；
3. 系统主体还是iview-admin默认样式。

## 2018/03/16
1. 个人中心
1.1. 取消修改个人信息，返回主页
1.2. 修改手机号，邮箱，部门
1.3. 修改密码
2. bug： 锁屏按钮点击时出现个人中心和退出登录下拉菜单;
   reason： 下拉菜单部分太宽，覆盖了锁屏按钮;
   deal： 改改样式咯;
3. 锁屏之后，解锁时提取数据库密码进行比对，密码正确即可解锁;
4. 改了路由，好多好多东西的命名，许多冗余文件还不敢删，删了compile会出错.

## 2018/03/17
1. 将列表的编辑和搜索整合到一起；
2. 人员管理缩到一个页面，选择部门完成筛选。

## 2018/03/19
1. 人员管理页： 选择部门显示相应员工，使用搜索功能的search函数，将参数改为department就好了，不用从数据库再请求一次；
2. 人员管理员： 编辑、删除两个功能与数据库同步；
3. TODO: 人员管理页添加员工功能待定；
4. TODO: 监控点管理下的三个子页面编辑、删除同步数据库。 <span style="color: green; font-size: bolder">√</span>
5. TODO: 密码加密解密。

## 2018/03/22
1. 监控点管理下的三个子页面编辑、删除同步数据库；
2. 监控点管理下的三个子页面按编号搜索记录；
3. 首页： 
    3.1. 地图API调用（bug:显示BMap未定义，deal:异步加载,回调函数中使用百度地图服务）；
    3.2. 从数据库中取监控点坐标并标注；
    3.3. 标注点信息窗显示监控点部分信息;
    3.4. 路径规划；
4. TODO: 信息窗上新增按钮，点击进入监控点详情界面。


## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 多语言切换
- 组件
    - 富文本编辑器
    - Markdown编辑器
    - 城市级联
    - 图片预览编辑
    - 可拖拽列表
    - 文件上传
    - 数字渐变
    - split-pane
- 表单编辑
    - 文章发布
    - 工作流
- 表格
    - 可拖拽排序
    - 可编辑表格
        - 行内编辑
        - 单元格编辑
    - 可搜索表格
    - 表格导出数据
        - 导出为Csv文件
        - 导出为Xls文件
    - 表格转图片
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── access  权限管理
        ├── advanced-router  高级路由
        ├── error_page  错误页面
        ├── form  表单编辑
        ├── home  首页
        │   ├── components  首页组件
        ├── international  多语言
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        │   ├── area-linkage  中国行政区级联选择器
        │   ├── count-to  数字渐变
        │   ├── draggable-list  可拖拽列表
        │   ├── file-upload  文件上传
        │   ├── image-editor  图片预览编辑
        │   ├── markdown-editor  Markdown编辑器
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        └── tables  综合表格
```

## Links

- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)
