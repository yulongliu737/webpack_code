const path = require('path'); // nodejs和兴模块 专门用来处理路径问题
const HtmlWebpackPlugin = require('html-webpack-plugin'); // nodejs和兴模块 专门用来处理路径问题
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 拆分css到不同路径工具
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css压缩插件

function getStyleLoader(pre) {
    return [
        // 执行顺序，从下到上
        MiniCssExtractPlugin.loader, // 提取css成单独文件
        "css-loader", // 将css资源编译成commonjs的模块到js
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ]
                }
            }
        },
        pre
    ].filter(Boolean) // 自动过滤undefined的值，若pre没有则无此配置
}

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // __dirname nodejs的遍历，代表当前文件的文件夹目录
        path: path.resolve(__dirname, '../dist'),
        filename: "static/js/output.js",
        // 自动清空上次打包的内容
        clean: true
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                // 每个文件只能被其中一个loader配置处理
                oneOf: [
                    {
                        test: /\.css$/, // 只检测.css文件
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less/,
                        use: getStyleLoader('less-loader')
                    },
                    {
                        test: /\.s[ac]ss/,
                        use: getStyleLoader('sass-loader')
                    },
                    {
                        test: /\.styl/,
                        use: getStyleLoader('stylus-loader')
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
                        // exclude: /node_modules/, // 排除node_modules下的文件，其他文件都处理 不能喝include同时使用
                        include: path.resolve(__dirname, '../src'), // 只处理src下的文件
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true, // 开启babel缓存
                            cacheCompression: false, // 关闭缓存文件压缩
                        }
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以public/index.html文件创建新的html文件，新的文件结构和原来一致，会自动引入包输出的资源
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css" // 指定所有css文件打包路径
        }),
        new CssMinimizerPlugin()
    ],
    // 模式
    mode: "production",
    devtool: "source-map",
}