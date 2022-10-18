const {merge}=require("webpack-merge")
const commonConfig=require("./webpack.common")
const {EnvironmentPlugin} = require("webpack")

const configProd={
    mode:"production",
       plugins: [
        new EnvironmentPlugin({
            HOST_NAME:"*",
            //todo replace * on host name production
            DEBUG: false,
        })
    ]
};

module.exports=merge(commonConfig,configProd)