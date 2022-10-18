const {merge}=require("webpack-merge")
const commonConfig=require("./webpack.common")
const {EnvironmentPlugin} = require("webpack")

const configDev={
    mode:"development",
       plugins: [
        new EnvironmentPlugin({
            HOST_NAME:'127.0.0.1:8000',
            DEBUG: true,
        })
    ]
};

module.exports=merge(commonConfig,configDev)