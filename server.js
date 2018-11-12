const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const store = require('./session');
const session = require('koa-session');
const morgan = require('koa-morgan');
const passport = require('koa-passport');
const indexRoutes = require('./routes/indexRoute');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const app = new Koa();
const PORT = process.env.PORT || 1337;

// sessions
app.keys = ['super-secret-key'];
app.use(session({
    store
}, app));


// morgan
app.use(morgan('dev'));

// body parser
app.use(bodyParser());

// authentication
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, (err) => {
   if (err) {
       throw("Error al iniciar el servidor");
   }
   console.info(`Server listening on port ${PORT}`);
})


module.exports = server;