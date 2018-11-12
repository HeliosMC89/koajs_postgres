const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/indexRoute');
const movieRoutes = require('./routes/movies');
const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());

const server = app.listen(PORT, (err) => {
   if (err) {
       throw("Error al iniciar el servidor");
   }
   console.info(`Server listening on port ${PORT}`);
})


module.exports = server;