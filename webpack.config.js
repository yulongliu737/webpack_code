const path = require('path'); // nodejs和兴模块 专门用来处理路径问题

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output: {
        // __dirname nodejs的遍历，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'),
        filename: "output.js",
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
            }
        ]
    },
    // 插件
    plugins: [
    ],
    // 模式
    mode: "development"
}