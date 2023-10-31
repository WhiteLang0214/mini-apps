const path = require('path');
const name = require('./package.json').name;
const timeStamp = new Date().getTime();

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  productionSourceMap: true,
  devServer: {},
  chainWebpack(config) {
    // svg规则配置一下，排除icons目录
    config.module.rule('svg').exclude.add(resolve('src/assets/svg/icons')).end();
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // 使用图标的名称
      .end();
  },
};
