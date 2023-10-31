export default function (app) {
  const requireComponent = require.context('./', true, /\.vue$/);
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName).default;
    const comName = componentConfig.name || componentConfig.__name;
    const com = componentConfig.default || componentConfig;
    app.component(comName, com);
  });
}
