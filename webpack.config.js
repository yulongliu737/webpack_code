const path = require('path'); // nodejs和兴模块 专门用来处理路径问题
const HtmlWebpackPlugin = require('html-webpack-plugin'); // nodejs和兴模块 专门用来处理路径问题

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // __dirname nodejs的遍历，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'),
        filename: "static/js/output.js",
        // 自动清空上次打包的内容
        clean: true
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/, // 只检测.css文件
                use: [
                    // 执行顺序，从下到上
                    "style-loader", // 将js中css通过创建style标签添加到html文件中
                    "css-loader", // 将css资源编译成commonjs的模块到js
                ]
            },
            {
                test: /\.less/,
                use: [
                    // 执行顺序，从下到上
                    "style-loader", // 将js中css通过创建style标签添加到html文件中
                    "css-loader", // 将css资源编译成commonjs的模块到js
                    "less-loader", // 将less编译成css文件
                ]
            },
            {
                test: /\.s[ac]ss/,
                use: [
                    // 执行顺序，从下到上
                    "style-loader", // 将js中css通过创建style标签添加到html文件中
                    "css-loader", // 将css资源编译成commonjs的模块到js
                    "sass-loader", // 将sass编译成css文件
                ]
            },
            {
                test: /\.styl/,
                use: [
                    // 执行顺序，从下到上
                    "style-loader", // 将js中css通过创建style标签添加到html文件中
                    "css-loader", // 将css资源编译成commonjs的模块到js
                    "stylus-loader", // 将stylus编译成css文件
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset", // 指定转base64类型
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图标转base64
                        // 优点：减少请求数量 缺点：体积会更大
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    // 输出图片名称 hash值只取前10位
                    filename: "static/images/[hash:10][ext][query]",
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource", // 按照原始文件输出
                generator: {
                    // 输出图片名称 hash值只取前10位
                    filename: "static/media/[hash:10][ext][query]",
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以public/index.html文件创建新的html文件，新的文件结构和原来一致会自动引入包输出的资源
            template: path.resolve(__dirname, 'public/index.html'),
        })
    ],
    // 开发服务器 (热部署)
    devServer: {
        host:"127.0.0.1",
        port: 3000,
        open: true, // 是否自动打开浏览器
    },
    // 模式
    mode: "development"
}