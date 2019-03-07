// webpack是需要传入一个配置对象(configuration object)。取决于你如何使用webpack，可以通过两种方式之一: 终端或Node.js。
const path = require("path")
// 注意整个配置中webpack使用Node内置的path模块()，并在它前面加上__dirname这个全局变量。
// 可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
module.exports = {
  // mode可选值： 'production'  |  'development'  |  'none'
  mode: "production",  
  // mode: "development",  
  // mode: "none",  

  // entry值类型： string  |  object  |  array  
  entry: "./app/entry",
  // entry: { a: './app/entry1',  b: './app/entry2' },
  // entry: ['./app/entry1', './app/entry2'],
  // 这里应用程序开始执行
  // webpack开始打包

  // webpack 如何输出结果的相关选项
  output: {
    path: path.resolve(__dirname,  'dist'),  //  string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用Node.js的path模块）

    filename: 'bundle.js', //  string
    // filename: '[name].js',  //  用于多个entry point
    // filename: '[chunkhash].js', //  用于长效缓存
    // entry chunk的文件名模块

    // 输出解析文件的目录，url相对于HTML页面
    publicPath: '/assets',  //  string
    // publicPath: '',
    // publicPath: 'https://cdn.example.com/',

    // 导出库(exported library)的名称
    library: 'MyLibrary', //  string

    // 导出库的类型
    libraryTarget: 'umd', // 通用模块定义
    // libraryTarget: 'umd2', // 通用模块定义
    // libraryTarget: 'commonjs2', // exported with module.exports
    // libraryTarget: 'commonjs-module', // 使用module.exports导出
    // libraryTarget: 'commonjs', // 作为exports的属性导出
    // libraryTarget: 'amd', // 使用AMD定义方法来定义
    // libraryTarget: 'this', // 在this上设置属性
    // libraryTarget: 'var', // 变量定义域根做作用域下
    // libraryTarget: 'assign', // 盲分配(blind assignment)
    // libraryTarget: 'window', // 在window对象上设置属性
    // libraryTarget: 'global', // 设置在global对象上
    // libraryTarget: 'jsonp', // jsonp wrapper

    // ********高级输出配置*****************
    // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息
    pathinfo: true, //boolean

    // 附加分块(additional chunk)的文件名模板
    chunkFilename: '[id].js',
    // chunkFolename: '[chunkhash].js', // 长效缓存(/guides/caching)

    // 用于加载分块的JSONP函数名
    jsonpFunction: 'myWebpackJsonp', // string

    // source map 位置的文件名模板
    sourceMapFilename: '[file].map', // string
    // sourceMapFilename: 'sourcemaps/[file].map', // string

    // devtool中模块的文件名模板
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]', // string

    // devtool中模块的文件名模板(用于冲突)
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]', // string

    // 在UMD库中使用命名的AMD模块
    umdNamedDefine: true, // boolean

    // 指定运行时如何发出跨域请求问题
    crossOriginLoading: 'use-credentials', // 枚举
    // crossOriginLoading: 'anonymous',
    // crossOriginLoading: false,

    // **********----------- 专家级输出配置 ------------***************
    // 为这些模块使用1:1映射SourceMaps（快速）
    devtoolLineToLine: {
      test: /\.jsx/
    },

    // HMR清单 的文件名模板
    hotUpdateMainFilename: '[hash].hot-update.json', // string

    // HMR分块 的文件名模板
    hotUpdateChunkFilename: '[id].[hash].hot-update.js', // string

    // 包内前置式模块资源具有更好可读性
    sourcePrefix: '\t', // string
  },

  // 关于模块配置
  module: {
    // 模块规则(配置loader、解析器等)
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'app/demo-files')
        ],
        // 这里是一个匹配条件，每个选项都接受一个正则表达式或字符串
        // test和include具有相同的作用，都是必须匹配选项
        // exclude是必不匹配选项(优先于test和include)
        // 最佳实践
        // - 只在test和文件名匹配中使用正则表达式
        // - 在include和exclude中使用绝对路径
        // - 尽量避免 exclude，更倾向于include

        // issuer条件(导入源)
        issuer: { test, include, exclude},

        // 标识应用这些规则，即使规则覆盖(高级选项)
        enforce: 'pre',
        // enforce: 'post',

        // 应该应用的loader，它相对上下文解析
        loader: 'babel-loader',
        // 为了更清晰，'-loader'后缀在webpack 2中不再是可选的，查看webpack 1 升级指南(https://www.webpackjs.com/guides/migrating)

        // loader的可选项
        options: {
          presets: ['es2015']
        }
      },

      {
        test: /\.html$/,
        // test: '\.html$',
        use: [
          // 应用多个loader
          'htmllint-loader',
          {
            loader: 'html-loader',
            options: {
              // 配置
            }
          }
        ]
      },

      // 使用这些嵌套规则之一
      { oneOf: [ /* rules */ ] },

      // 使用所有这些嵌套规则
      { rules: [ /* rules */ ] },

      // 仅当所有条件都匹配时才匹配
      { resource: { and: [ /* 条件 */ ] } },

      // 任意条件匹配时匹配
      { resource: { or: [ /* 条件 */ ] } },
      { resource: [ /* 条件 */ ] },

      // 条件不匹配时匹配
      { resource: { not: [ /* 条件 */ ] } }
    ],
    // ******高级配置***********
    // 不解析这里的模块
    noParse: [
      /special-library\.js/
    ],

    // specifies default behavior for dynamic requests
    unknownContextRequest: '.',
    unknownContextRecursive: true,
    unknownContextRegExp: /^\.\/.*$/,
    unknownContextCritical: true,
    exprContextRequest: '.',
    exprContextRegExp: /^\.\/.*$/,
    exprContextRecursive: true,
    exprContextCritical: true,
    wrappedContextRegExp: /.*/,
    wrappedContextRecursive: true,
    wrappedContextCritical: false,
  },

  // 解析模块请求的选项(不适用于对loader解析)
  resolve: {
    // 用于查找模块的目录
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],

    // 使用的扩展名
    extensions: ['.js', '.json', '.jsx', '.css'],

    // 模块别名列表
    alias: {
      // 起别名: 'module' -> 'new-module' 和 'module/path/file' -> 'new-module/path/file'
      'module': 'new-module',

      // $ 正则匹配结尾
      // 起别名: 'only-module' -> 'new-module',但不匹配'only-module/path/file' -> 'new-module/path/file'
      'only-module$': 'new-module',

      // 起别名 'module' -> './app/third/module.js' 和 'module/file'会导致错误
      // 模块别名相对于当前上下文导入
      'module': path.resolve(__dirname, 'app/third/module.js'),
    },
    // ****可选的别名语法****
    // alias: [
    //   {
    //     // 旧的请求
    //     name: 'module',
    //     // 新的请求
    //     alias: 'new-module',
    //     // 如果为true，只有'module'是别名
    //     // 如果为false，'module/inner/path'也是别名
    //     onlyModule: true
    //   }
    // ],

    // ***********高级解析选项**********
    // 遵循符号链接(symlinks)到新位置
    symlinks: true,

    // 从package描述中读取的文件
    descriptionFiles: ['package.json'],

    // 当请求文件夹时，从描述文件中读取的属性
    mainFields: ['main'],

    // 从描述文件中读取的属性，以对此package的请求起别名
    aliasFields: ['browser'],
    
    // 如果为true，请求必不包括扩展名
    // 如果为false，请求可以包括扩展名
    enforceExtension: false,

    // 类似 extensions/enforceExtension,但是用模块名替换文件
    moduleExtensions: ['-module'],
    enforceModuleExtension: false,

    // 为解析的请求启用缓存
    // 这是不安全，因为文件夹结构可能会改动
    // 但是性能改善是很大的
    unsafeCache: true,
    // unsafeCache: {},

    // predicate function which selects requests for caching
    cachePredicate: (path, request) => true
  },

  performance: {
    hints: 'warning', // 枚举
    // hints: 'error', //  性能提示中抛出错误
    // hints: false, // 关闭性能提示
    maxAssetSize: 200000, // 整数类型(以字节为单位)
    maxEntrypointSize: 400000, // 整数类型(以字节为单位)
    assetFilter: function(assetFilename){
      // 提供资源文件名的断言函数
      return assetFilename.endWith('.css') || assetFilename.endsWith('.js')
    }
  },

  // 生成的map文件
  devtool: 'source-map', // enum枚举
  // devtool: 'inline-source-map', // 嵌入到源文件中
  // devtool: 'eval-source-map', // SourceMap嵌入到每个模块中
  // devtool: 'hidden-source-map', // SourceMap不在原文件中引用
  // devtool: 'cheap-source-map', // 没有 模块映射(module mappings)的SourceMap低级变体(cheap-variant)
  // devtool: 'cheap-module-source-map', // 有 模块映射(module mapping)的SourceMap低级变体
  // devtool: 'eval', // 没有模块映射，而是命名模块。以牺牲细节达到最快
  // 通过浏览器调试工具(Browser devtools)中添加 元信息(meta info)增强调试
  // 牺牲了构建速度的`source-map`是最详细的

  // webpack的主目录
  // entry和module.rules.loader选项相对于此目录解析
  context: __dirname, // string （绝对路径）

  // 包(bundle)应该运行时的环境
  // 更改 模块行为(chunk loading behavior) 和 可用模块(available module)
  target: 'web', // 枚举
  // target: 'webworker', // WebWorker
  // target: 'node', // node.js通过require
  // target: 'async-node', // node.js通过 fs 和 vm
  // target: 'node-webkit', // nw.js
  // target: 'electron-main', // electron,主进程(main process)
  // target: 'electron-renderer', // electron,渲染进程（render process）
  // target: (compiler) => { /* ... */ }, // 自定义

  // 不要遵循/打包这些模块，而是在运行时环境中请求他们
  exterbals: ['react', /^@angular\//],
  // externals: 'react', // string (精确匹配)
  // externals: /^[a-z\-]+($|\/)/, // 正则
  // externals: { // 对象
  //   angular: 'this angular', // this['angular']
  //   react: { // UMD
  //     commonjs: 'react',
  //     commonjs2: 'react',
  //     amd: 'react',
  //     root: 'React'
  //   }
  // },
  // externals: (request) => { /* ... */ return 'commonjs ' + request },

  // 精确控制要显示的bundle信息
  stats: 'errors-only',
  // stats: { // object
  //   assets: true,
  //   colors: true,
  //   errors: true,
  //   errorDetails: true,
  //   hash: true,
  //   // ...
  // },

  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'),  //  boolean | string | array  静态文件
    // 压缩 
    compress: true, //  启用gzip压缩
    historyApiFallback: true, // true for index.html upon 404,object for multiple paths
    // 
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // 
    https: false, // true for self-signed, object for cert authority
    // 仅错误和警告在热重载上
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  // 附加插件列表
  plugins: [
    // ...
  ],
  // ******高级配置*******
  // 独立解析选项的loader
  resolveLoader: { /* 等同于resolve */},

  // 限制并行处理模块的数量
  parallelism: 1, // number

  // 捕获时机信息
  profile: true, // boolean

  // 在第一个错误处抛出，而不是无视错误
  bail: true,

  // 禁用/启用缓存                                                                                         
  cache: false,

  // 启用观察
  watch: true,

  watchOptions: {
    // 将多个更改聚合到单个重构建(rebuild)
    aggregateTimeout: 1000, // 单位毫秒

    // 启用轮询观察模式
    // 必须用在不通知更改的文件系统中
    // 即 nfs shares (译者注：Network FileSystem[http://linux.vbird.org/linux_server/0330nfs/0330nfs.php]最大的功能就是可以透过网络，让不同的机器、不同的作业系统可以彼此分享个别的档案[share file])
    poll: true,
    // poll: 500, // 间隔单位 ms
  },

  node: {
    // Polyfills and mocks to run Node.js-enviroment code in non-Node environment.
    console: false, //  boolean | 'mock'
    global: true, // boolean | 'mock'
    process: true, // boolean
    __filename: 'mock', // boolean | 'mock'
    __dirname: 'mock', // boolean | 'mock'
    Buffer: true, // boolean | 'mock'
    setImmediate: true, // boolean | 'mock' | 'empty'
  },

  recordsPath: path.resolve(__dirname, 'build/records.json'),
  recordsInputPath: path.resolve(__dirname, 'build/records.json'),
  recordsOutputPath: path.resolve(__dirname, 'build/records.json')
}