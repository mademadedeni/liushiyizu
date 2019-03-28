// FIS3 会读取全部项目目录下的资源，如果有些资源不想被构建，通过以下方式排除。
fis.set('project.ignore', [
  'upload/**',
  'dist/**',
]);
fis.match('**/**', {
  release: false,
  useCompile: false
});

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

fis.match('/webApp/static/js/{**/*.js,*.js}',{
  parser: fis.plugin('babel-6.x', {
    sourceMaps: true
  }),
  rExt: 'js',
  isMod: true,
});

fis.match('/webApp/mobile/static/js/{**/*.js,*.js}', {
  isMod: true,
});

fis.match('/webApp/static/js/{plugin,common}/**', {
  parser: false,
  isMod: false,
});

fis.match('/webApp/components/**/*.html', {
  release: false,
});

//插件id简写
fis.match('/webApp/static/js/plugin/vue/vue.js', {
  id: "vue"
});
fis.match('/webApp/static/js/plugin/vue/vue-resource-1.5.1.js', {
  id: "vue-resource"
});
fis.match('/webApp/static/js/plugin/element_ui/*.js', {
  id: "element_ui"
});
fis.match('/webApp/mobile/static/js/plugin/element_ui/*.js', {
  id: "elementUI"
});
fis.match('/webApp/static/js/plugin/jquery/*.js', {
  id: "jquery"
});
fis.match('/webApp/static/js/plugin/lodash.js', {
  id: "lodash"
});
fis.match('/webApp/static/js/plugin/axios.min.js', {
  id: "axios",
  isMod: true
});


fis.match('/webApp/components/**/(*).js', {
  id: "$1",
  isMod: true,
});
fis.match('/webApp/mobile/components/**/(*).js', {
  id: "mobile-" + "$1",
  isMod: true,
});
fis.match('/webApp/static/js/vuexStore.js', {
  id: "vuexStore",
  isMod: true
});

fis.match('/webApp/views',{
  release:false,
});


fis.match('/webApp/static/js/common/config.dev.js', {
  release:"/webApp/static/js/common/config.js"
});
fis.match('/webApp/static/js/common/config.prod.js', {
  release:false
});

fis.match('/webApp/(**)', {
  release: "$1",
  useCompile: true
});



// ---------   生产模式   ------------
fis.media("prod").match('**/**', {
  release: true
})
.match('/logs/**',{
  release:false,
})
.match('/webApp/(**)', {
  release: "/dist/$1",
  url:'/$1',
  useCompile: true
})
.match('/webApp/views/**',{
  release:false,
})
.match('/webApp/components/**/*.html', {
  release: false,
})
.match('node_modules/**', {
  release: false
})
.match("/webApp/static/js/{**/*.js,*.js}", {
  useHash: false,
  query: '?t=' + Date.now(),
  optimizer: fis.plugin('uglify-js'),
  isMod: true,
})
.match("/webApp/mobile/static/js/**.js",{
  optimizer: fis.plugin('uglify-js'),
  query: '?t=' + Date.now(),
})
.match("/webApp/mobile/components/(**.js)",{
  optimizer: fis.plugin('uglify-js'),
  packTo:'/dist/mobile/static/js/components.js',
  release:"/ignore/mobile/$1"
})
.match("/dist/mobile/static/js/components.js",{
  query: '?t=' + Date.now(),
  url:"/mobile/static/js/components.js",
})
.match("{/webApp/mobile/components/**.html,/webApp/mobile/html/common.html,/webApp/html/common/common.html}",{
  release:false,
})
.match("/webApp/mobile/components/(**.css)",{
  packTo:'/dist/mobile/static/css/components.css',
  release:"/ignore/mobile/$1"
})
.match("/dist/mobile/static/css/components.css",{
  query: '?t=' + Date.now(),
  url:"/mobile/static/css/components.css",
})
.match("/webApp/mobile/static/js/plugin/**.js",{
  optimizer: false,
})
.match('/webApp/static/js/{plugin,common}/**', {
  parser: false,
  isMod: false,
})
.match("/webApp/static/js/plugin/{**/*.js,*.js}", {
  useCompile: false
})
.match("/webApp/static/js/plugin/element_ui/*.js", {
  useCompile: true,
})
.match("/webApp/static/js/plugin/axios.min.js", {
  useCompile: true,
})
.match('{/webApp/static/css/(*.css),/webApp/static/js/plugin/element_ui/(*.css)}', {
  packTo:'/dist/static/css/common.css',
  release:'/ignore/$1'
})
.match("/dist/static/css/common.css",{
  query: '?t=' + Date.now(),
  url:"/static/css/common.css"
})
.match('/webApp/static/js/plugin/element_ui/*.css', {
  packOrder:-10
})
.match('/webApp/components/**/(*.css)', {
  packTo: "/dist/static/css/components.css",
  release:"/ignore/$1"
})
.match("/dist/static/css/components.css",{
  query: '?t=' + Date.now(),
  url:"/static/css/components.css"
})
.match("/webApp/static/font/*.css",{
  query: '?t=' + Date.now(),
})
.match('/webApp/components/**/(*.js)', {
  packTo: "/dist/static/js/components.js",
  optimizer: fis.plugin('uglify-js'),
  release:"/ignore/$1",
})
.match("/dist/static/js/components.js",{
  query: '?t=' + Date.now(),
  url:"/static/js/components.js"
})
.match('/webApp/static/js/plugin/ueditor/ueditor.all.js',{
  url: '/static/js/plugin/ueditor/ueditor.all.min.js',
  release:'/ignore/ueditor.all.js',
})
.match('/webApp/static/js/plugin/lodash.js',{
  url: '/static/js/plugin/lodash.min.js',
  release:'/ignore/lodash.js',
})
.match('/webApp/static/js/plugin/vue/vue.js',{
  release:false,
})
.match('/webApp/static/js/common/config.dev.js', {
  release:false,
})
.match('{/webApp/static/js/common/(*.js),/webApp/static/js/common/config.prod.js,/webApp/static/js/plugin/vue/(vue.min.js),/webApp/static/js/plugin/(axios.min.js)}', {
  packTo:"/dist/static/js/common.js",
  release:'/ignore/$1'
})
.match('/dist/static/js/common.js', {
  url:"/static/js/common.js",
  query: '?t=' + Date.now(),
})
.match('/webApp/static/js/common/{config.prod.js,config.dev.js}', {
  packOrder:10
})
