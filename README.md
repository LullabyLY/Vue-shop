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
   + 发表评论功能
       + 文本框数据双向绑定
       + 按钮绑定事件
       + 校验是否为空
       + 提交评论至服务器
       + 重新刷新列表，查看最新评论
          + 如果调用getComment方法，可能得到的不是第一页评论，而且第一页评论得不到
          + 换一种：当评论成功后，在客户端手动拼接出一个最新的评论对象，然后调用数组的`unshift`方法
#### 图片分享
1. 图片分享路由链接
2. 绘制图片列表组件
   + 顶部的滑动条(5个bug)，借助MUI中的tab-top-webview-main
       1. 需要去掉mui-fullscreen类
       2. 滑动条无法滑动，通过检查官方文档，该组件是一个JS组件，需要初始化
           + 导入mui.js
           + 调用官方提供的方式初始化
           ````
           mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            });
           ````
       3. 初始化滑动条导入mui.js报错：
           ````
           main.js:48314 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
           ````
           + 推测mui.js中用到了'caller', 'callee', and 'arguments' 东西，但是webpack打包好的bundle.js默认启用 严格模式，存在冲突
           + 解决：1. 把mui.js中的非严格模式的代码改掉，不现实
                   2. 禁用打包时的严格模式
           + 移除严格模式：babel-plugin-transform-remove-strict-mode
       4. 在home页面点击进入图片分享后，无法滑动，刷新后可滑动但是tabbar栏无法跳转
           + 在mounted函数中初始化mui，滑动条滑动
       5. 滑动条OK后，tabbar栏无法跳转
           + 修改把每个tabber按钮上的样式mui-tab-item类，重新改名字
       6. 从服务器获取分类列表
           + 注意mui-active类，采用绑定class类，在其中使用三元表达式
   + 制作图片列表
       1. 图片懒加载：Mint-UI LazyLoad
          + 按需加载不能显示懒加载效果。需要完整引入
          + 样式美化
       2. 获取图片列表数据
3. 图片点击跳转至详情
    + li改为router-link，tag指定渲染为li   
4. 详情页面布局
    + 页面布局及美化
    + 获取数据    
    + 略缩图
        1. 使用`vue-preview`插件
        2. 获取图片列表，v-for渲染数据
        3. img中的class不能去掉
        4. 每个图片数据对象中必须有w，h属性
##### 遇到的问题：
1. 接口改变
2. 对于模块引用比较迷
3. 使用vue-preview报错
    + 可以显示略缩图，但是点击时失败
    ````
    Property or method "$preview" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, 
    or for class-based components, by initializing the property
   ````
   ````
   Error in v-on handler: "TypeError: Cannot read property 'open' of undefined"
   ````
   ````
   Cannot read property 'open' of undefined
   ````
$preview is not defined”这个错误的分析，“$preview is not defined”错误的原因是因为vue-preview插件的使用方法已经更新了，要根据不同版本的vue-preview使用对应的模板。我恍然大悟，立刻到GitHub中查询了一下最新的vue-preview，果然使用方法已经更新。
此时问题已经明朗了，在项目中我安装的是最新版本的vue-preview，但是使用模板却是以前的，所以，解决方案无非降级法和升级法。

