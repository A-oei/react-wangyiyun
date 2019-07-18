

####展示配置文件

react脚手架会默认隐藏配置文件`config`，我们需要通过以下命令来将隐藏文件进行展示

```javascript
npm run eject
```

这里会提示我们该命令是永久性的，不可逆，是否要继续，输入`y`即可，**注意：**使用该命令的时候需要将修改过的文件提前上传

#### 修改默认启动端口号

在`package.json`中配置`start`命令

```json
"scripts": {
  "start": "set PORT=3333&&node scripts/start.js",
  "build": "node scripts/build.js",
  "test": "node scripts/test.js"
},
```



### 使用手淘vw布局方案

* 参考

  [大漠手淘vm布局方案](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)



1. 下载必须文件

   ```no
   npm install --save postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano
   ```

2. 在`config>>webpack.config.js`中定义变量

   ```javascript
   //配置vw适配方案
   const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
   const postcssPxToViewport = require('postcss-px-to-viewport');
   const postcssWriteSvg = require('postcss-write-svg');
   const postcssCssnext = require('postcss-cssnext');
   const postcssViewportUnits = require('postcss-viewport-units');
   const cssnano = require('cssnano');
   ```

3. 在`config>>webpack.config.js`中进行配置

   ```javascript
   loader: require.resolve('postcss-loader'),
   options: {
       ident: 'postcss',
       plugins: () => [
           require('postcss-flexbugs-fixes'),
           require('postcss-preset-env')({
               autoprefixer: {
                   flexbox: 'no-2009',
               },
               stage: 3,
           }),
           postcssNormalize(),
           //配置vw适配方案 start
           
           postcssAspectRatioMini({}),// 用来处理元素容器宽高比
           postcssPxToViewport({
               viewportWidth: 750, // // 视窗的宽度，对应我们设计稿的宽度，一般是750
               viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
               unitPrecision: 3, // 指定'px'转换为视窗单位值得小数位数（很多时候无法整除）
               viewportUnit: 'vw',  //指定需要转换成的视窗单位,建议使用vw
               selectorBlackList: ['.ignore'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
               minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
               mediaQuery: false // 允许在媒体查询中转换`px
           }),
           postcssWriteSvg({ // 用来处理移动端1px的解决方案
               utf8: false
           }),
           postcssCssnext({}),// 让项目使用CSS未来特性 并对其做兼容性处理
           postcssViewportUnits({}), //给CSS的属性添加content的属性 配合viewport-units-buggyfill解决个别手机不支持vw
           cssnano({ //压缩和清理CSS代码
               "cssnano-preset-advanced": {
                   zindex: false,
                   autoprefixer: false
               },
           })
           
           //配置vw适配方案 end
       ],
       sourceMap: isEnvProduction && shouldUseSourceMap,
   }
   ```

在配置完成之后，重新执行`npm run statr`命令，使用时候直接使用px单位即可，插件会自动将px转换为vw，需要注意的是，**如果我们想要使用px**，那么可以在`selectorBlackList`中进行配置，在代码中写入配置的变量名会被自动忽略，不被进行转换，例如：

```scss
> li {
  width: 50px;
  box-sizing: border-box;
  display: inline-block;
  &.ignore {
    padding: 3px;
    }
  }
```

