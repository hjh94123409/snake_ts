const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    //指定打包文件所在目录
    output: {
        // 指定打包文件目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的名字
        filename: "bundle.js",

        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },

    //指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则 
        rules: [
            //设置ts文件处理
            {
                // 指定规则生效的文件 ，以ts结尾的文件，正则   
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options: {
                            //设置预定义环境
                            presets: [
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        "targets":{
                                            "chrome": 88
                                        },
                                        //指定corejs版本
                                        "corejs": "3",
                                        //使用corejs的方式 usage 表示按需加载
                                        "useBuiltIns": "usage"
                                        
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude: /node_modules/
            },
            //设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss 用来兼容浏览器样式
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    //配置webpack插件
    plugins: [
        //先把dist目录清空，再填加
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html"
        })
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },

    //  "development" | "production" | "none"
    mode: 'production'//开发模式
}