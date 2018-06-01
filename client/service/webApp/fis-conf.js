// FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
fis.set('project.ignore', [
  'upload/**',
  'dist/**',
  "output/**",
  "/fis-conf.js"
]);
// default settings. fis3 release
fis.hook('module', {
    mode: 'mod'
});
fis.match('/static/js/**.js', {
  parser: fis.plugin('typescript')
});
fis.match('/static/js/{plugin,common}/**', {
  parser: false
});
fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true
    }),
    packager: fis.plugin('map')
});
// Global start
fis.match('/static/js/**/*.js', {
  useHash: true,
  // optimizer: fis.plugin('uglify-js'),
  isMod: true
});
fis.match('/static/js/plugin/**/*.js', {
  useHash: false,
  isMod: false
});
fis.match('/static/js/game/html5-mario/*.js', {
  useHash: false,
  // optimizer: fis.plugin('uglify-js'),
  isMod: false
});
fis.match('/static/js/index.js', {
  useHash: true,
  // optimizer: fis.plugin('uglify-js'),
  isMod: true
});
fis.match('/static/js/common/*.js', {
  isMod: false
});
fis.match('/components/**/*.js',{
  id:"$1",
	isMod: true,
  packTo:"/static/js/components.js"
});
fis.match('/components/**/*.html',{
  release:false,
});
fis.match('/components/**/*.css',{
  packTo:"/static/css/components.css",
});

fis.match('/static/js/common/mod.js', {
  packOrder: -100
});
//插件id简写
fis.match('/static/js/plugin/vue/*.js', {
  id:"vue"
});
fis.match('/static/js/plugin/element_ui/*.js', {
  id:"element_ui"
});
fis.match('/static/js/plugin/jquery/*.js', {
  id:"jquery"
});
fis.match('/static/js/plugin/lodash.js', {
  id:"lodash"
});



