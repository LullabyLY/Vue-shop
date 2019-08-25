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





#####遇到的问题：
1. 接口改变
