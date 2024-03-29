const glob = require('glob');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, controllersDir) {
    let files = glob.sync(__dirname + '/' + controllersDir + "/**/*.js");
    console.log("扫描出的js Controller文件个数=" + files.length);
    let jsFiles = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of jsFiles) {
        console.log(`process controller: ${f}...`);
        let mapping = require(f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllersDir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllersDir);
    return router.routes();
};