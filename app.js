const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controllers');
let staticFiles = require('./staticFiles');
let rest = require('./rest');

let app = new koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  await next();
});
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(bodyParser());

app.use(rest.restify());

app.use(controller());
app.listen(3001);
console.log('app started at port 3001...');