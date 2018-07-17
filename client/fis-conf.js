// FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
fis.set('project.ignore', [
  'upload/**',
  'dist/**',
  "output/**",
  "/fis-conf.js"
]);
fis.match('**/**', {
  release: false
});

// default settings. fis3 release
fis.hook('module', {
  mode: 'mod'
});
fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    useInlineMap: true
  }),
  packager: fis.plugin('map')
});

// Global start
fis.match('/webApp/static/js/{**/*.js,*.js}', {
  isMod: true,
});

fis.match('/webApp/static/js/plugin/{**/*.js,*.js}', {
  useHash: false,
  isMod: false
});

fis.match('/webApp/static/js/game/**/*.js', {
  useHash: false,
  isMod: false
});

fis.match('/webApp/static/js/common/*.js', {
  isMod: false
});

fis.match('/webApp/components/**/*.html', {
  release: false,
});

//插件id简写
fis.match('/webApp/static/js/plugin/vue/*.js', {
  id: "vue"
});
fis.match('/webApp/static/js/plugin/element_ui/*.js', {
  id: "element_ui"
});
fis.match('/webApp/static/js/plugin/jquery/*.js', {
  id: "jquery"
});
fis.match('/webApp/static/js/plugin/lodash.js', {
  id: "lodash"
});

fis.match('/webApp/components/**/(*).js', {
  id: "$1",
  isMod: true,
});

fis.match('/webApp/(**)', {
  release: "$1"
});

fis.media("prod").match("/webApp/static/js/{**/*.js,*.js}", {
  useHash: true,
  parser: fis.plugin('typescript'),
  optimizer: fis.plugin('uglify-js'),
  isMod: true,
}).match('/webApp/components/**/*.css', {
  packTo: "/webApp/static/css/components.css",
}).match('/webApp/components/**/(*).js', {
  packTo: "/webApp/static/js/components.js"
});