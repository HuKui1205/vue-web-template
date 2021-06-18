# 项目环境
* <a href="https://cli.vuejs.org/zh/guide/">vue/cli3</a>版本<a>v4.5.13</a>
* <a href="https://www.npmjs.com.cn/">npm</a>       版本    <a>v6.14.11</a>
* <a href="https://nodejs.org/en/">node</a>      版本    <a>v14.16.0</a>
# 项目结构
* `node_modules` 存放依赖文件的
* `public` 静态资源存放地
* `src`代码存放地
    * `assets`文件夹，静态资源存放地(img)
        * `404_images`文件夹，存放访问页面路径错误时，404页面的图片 
    * `components`文件夹，这里的 components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自views文件下，方便管理
    * `plugins`文件夹，`element`的引入,样式的引入
    * `poilcles`文件夹，用于保存安全策略相关的文件
    * `router`文件夹，页面路由存放地，进行页面的跳转
        * `user`文件夹，用于存放`/views/user/`文件夹里面的路由`
    * `services`文件夹，用于保存服务（接口）调用文件
        * `user`文件夹，用于存放有关于`/views/user/`文件夹的接口
    * `store`文件夹，页面数据存放地，页面与页面之间用到相同的变量的时候存放，确保页面与其他也的数据达到统一
    * `styles`文件夹，用于存放`css`样式的
    * `utils`文件夹，用户保存功能文件夹
        * `request`文件，用于存放<a href="http://www.axios-js.com/">aioxs</a>的拦截和响应
    * `views`文件夹，页面模块化管理，一个页面一个文件夹，一个大模块建立一个大文件夹
        * `error`文件夹，存放错误页面（当用户输入错误的url时，或者访问不到资源时，进入的页面）
        * `layout`文件夹，用来保存页面整体布局
* `App` 程序输出/进入口
* `mian` 全局变量存放/配置
