let path = require("path");
let htmlWebpackPlugin = require("html-webpack-plugin");
let serverConfig = require("./server");

let getOutPut = () => {
    let DevFolder = process.env.NODE_ENV == "dev" ? "develop" : "build";
    return {
        path: path.join(__dirname, DevFolder+'/js'),
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
        loaders: [
            { test: /\.(less|css)$/, loader: "style-loader!css-loader!less-loader" },
        ]
    },
    plugins: [
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

