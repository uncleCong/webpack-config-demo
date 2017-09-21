let path = require("path");
let htmlWebpackPlugin = require("html-webpack-plugin");
let serverConfig = require("./server");
let extractText = require("extract-text-webpack-plugin")

let getOutPut = () => {
    let DevFolder = process.env.NODE_ENV == "dev" ? "develop" : "build";
    return {
        path: path.join(__dirname, DevFolder + '/js'),
        filename: "[name].js"
    }
}

let webpackConfig = {
    entry: {
        index: './src/index/index.js',
        list: './src/list/list.js',
        detail: './src/detail/detail.js'
    },
    output: getOutPut(),
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: extractText.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }]
    },
    plugins: [
        new extractText({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css', '../css');
            },
            allChunks: true
        })
    ],
    devServer: serverConfig
};

for (let key in webpackConfig.entry) {
    webpackConfig.plugins.push(new htmlWebpackPlugin({
        template: webpackConfig.entry[key].replace("js", "html"),
        filename: '../' + key + ".html",
        inject: true,
        chunks: [key]
    }))
}

module.exports = webpackConfig;

