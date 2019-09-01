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
#### 商品购买
1. 设置路由
2. 经典两列布局
3. 加载数据
4. 点击进入商品详情
5. 制作商品详情页面
     + 借助mui的card完成三大模块
     + 借助首页的轮播图，做一个轮播图的组件，直接调用，注意的是图片的宽度，绑定属性
     + 完成点击加入购物车的小球动画，半场动画（@befre-enter、@enter、@after-enter）
          + 需要注意的是，当分辨率或者页面位置滚动后，所写的固定位置不能满足要求，需要借助距离屏幕的位置计算所需坐标
          + 借助于 domObject.getBoundingClientRect()
6. 将购物车的数量穿给父组件
     + 子组件传值给父组件，父组件得到要加入购物车的数量 @func=''
     + 什么情况下将数据传给父组件：当numbox的值改变的时候
     + 最大购买数量：最大购买数量为库存量
         + 父组件向子组件传值：props   :name=''
         ````
         :max="goodsinfo.stock_quantity"
         ````
         + 修改numbox的样式data-numbox-max值为max，无效果，在钩子函数中输出max，显示undefined
         原因：max的值是异步获取的，当没得到的时候传给子组件就是undefined，不知道什么时候能够拿到max值
         解决：监听max，使用watch，总会有max数值的出现
         + 使用JS API 设置numbox最大值`setOptions()`
7. 点击加入购物车 ， 购物车组件显示相同的
    + 借助vuex ,将商品的信息放在state中
    + 实现徽标数值更新  getters
       + 刷新之后，购物车清零，运用，本地存储localStorge
8. 绘制购物车页面    
    + mui的card制作两个框（购物车框、价钱框）
    + mintUI的switch框，还有shopcar的numbox框
    + 获取数据渲染
    + 购物车的数量和本地存储数量结合
       + 可以先创建一个空对象，循环购物车中所有的商品数据，返回一个`id:count`形成的对象
       ````
       getGoodsCount(state){
                  var o={};
                  state.car.forEach(item=>{
                      o[item.id]=item.count;
                  });
                  return o
              }
         ````
         将count传给子组件numbox
       + 问题：在购物车内增加或者减少，刷新后恢复为初始值
          解决：每当购物车的数量改变时，将新的数量同步到store，覆盖旧的值，修改之后，将最新的数据保存在本地
    + 实现删除功能
       + 删除goodslist中的数据，删除本地存储的数据
9. 绘制结算区域
10. switch状态
    + v-model：mintUI开关属性
    + 获得id:selected对象
    + 将store的状态渲染至页面
    + 将修改的状态同步到store中
11. 已勾选件数和总价
    + {勾选数量，勾选总价}
#### 标题返回按钮
1. 监听`$route.path`，若为`/home`，隐藏返回，否则，显示
2. 刷新之后，无返回按钮
    + 页面刷新后，路由无改变
    + 需要在页面created的时候，判断path，设置flag


#### 尝试在手机上进行项目的预览和测试
1. 手机和电脑在同一个WIFI，也就是同一网段
2. package.json文件，dev脚本中添加`--host`,把当前电脑的WIFI ip值设置为`--host`的值
3. 经调试，图片分享中的图片分类滑块有bug 应将click事件改为tap(只有mui可以使用tap)
#### 页面跳转
+ 在网页中，有两种跳转方式：
    -  使用标签a的形式，标签跳转
    -  使用`window.location.href`的形式，编程式导航


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
4. 小球半场运动位移问题
     + 不同环境位移不同：动态计算坐标值`domObject.getBoundingClientRect`可以获取元素距离页面顶部的值和左面的值
     
