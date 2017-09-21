const path = require("path");
const webpack = require('webpack');

const serverConfig = {
    contentBase: "develop/",
    compress: true,
    port: '9000',
    host:'0.0.0.0',
    open: true,
    inline:true,
    stats: {colors: true}
}

module.exports = serverConfig