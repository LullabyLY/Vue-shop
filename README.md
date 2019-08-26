## Vue商城项目

### 首页App组件
1. 完成Hearder区域，使用Mint-UI中的Header
2. 完成底部的Tabbar区域，使用的是MUI的Tabbar
    + 拷贝扩展图标的css文件
    + 拷贝扩展字体的ttf文件
    + 更改购物车的图标样式
    + 设置路由高亮
3. 中间为router-view展示路由组件
    + 分别定义四个vue文件做组件
    + 在router.js中引入并写路由匹配规则
    + router-view
#### 首页轮播图
1. Mint-UI轮播图
2. 图片加载  v-resource
   + this.$http.get()
   + 将获取到的数据保存在data中
   + 使用v-for渲染
#### 首页六宫格
1. MUI中的grid-default
2. 更改图标
#### 新闻资讯
1. 改造新闻资讯路由链接
2. 新闻资讯页面制作
   + 绘制页面，使用MUI中的media-list
   + 使用v-resource获取数据
   + 渲染数据
3. 实现新闻资讯点击跳转到详情
   + router-link to,同时在跳转的时候提供ID标识符
   + 创建新闻详情组件 newsInfo.vue
   + router.js声明组件
4. 评论组件
   + 单独写评论组件，便于其他组件调用
   + 在需要使用组件的页面中，导入组件
   + 在父组件中使用components属性，将评论组件注册为自己的子组件
   + 在页面中引用
   + 点击加载更多评论的功能
       + 按钮绑定事件
       + 点击pageIndex+1，重新调用请求方法
       + 每当获取最新的评论数据的时候，不能覆盖老数据，要拼接数据(否则，新数据覆盖旧数据，永远是1楼到10楼)



##### 遇到的问题：
1. 接口改变
