// module.exports = function override(config, env) {
//     //do stuff with the webpack config...
//     return config;
// }

const {override,addDecoratorsLegacy,fixBabelImports, addLessLoader} = require("customize-cra")
const modifyVars = require("./theme")
module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    })
)