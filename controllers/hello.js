/**
 * Created by wangpan on 30/10/2017.
 */
var hello = async (ctx, next) => {
    var name = ctx.params.name;
    let code = ctx.query.code;
    ctx.response.body = `<h1>Hello, ${name}, code = ${code}</h1>`;
};

module.exports = {
    'GET /hello/:name': hello
};