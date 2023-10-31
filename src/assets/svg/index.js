
// 全局引入xxx.svg
const req = require.context('/src/assets/svg/icons', false, /\.svg$/);
req.keys().forEach((svgIcon) => {
  req(svgIcon);
});