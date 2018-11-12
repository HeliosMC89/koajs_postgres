const Router = require('koa-router');
const passport = require('koa-passport');
const path = require('path');

const fs = require('fs');
const queries = require('../database/queries/users');

const router = new Router();

/**
router.get('/users/:username', async (ctx) => {
  try {
    let username = ctx.params.username;
    const user = await knex('users').where({ username }).first();
    if (user) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        user: user
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        status: 'fail',
        message: 'User not found'
      }
    }
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      status: 'error',
      message: err.message || 'User not found'
    }
  }
}); **/

router.get('/auth/register', async (ctx) => {
   ctx.type = 'html';
   ctx.body = fs.createReadStream(path.join(__dirname, '../views/register.html'));
});

router.post('/auth/register', async (ctx) => {
   const user = await queries.addUser(ctx.request.body);

   return passport.authenticate('local', async (err, user, info, status) => {
      if (user === false) {
         ctx.status = 401;
         ctx.body = {
             status: 'error'
         };
      } else {
        ctx.login(user);
        ctx.redirect('/auth/status');
      } 
   })(ctx);
});

router.get('/auth/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../views/status.html'));
  } else {
    ctx.redirect('/auth/login');
  }
});

router.get('/auth/login', (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../views/login.html'));
  } else {
    ctx.redirect('/auth/status');
  }
})

router.post('/auth/login', async (ctx) => {
 return await passport.authenticate('local', (err, user, info, status) => {
   if (user) {
    ctx.login(user);
    ctx.redirect('/auth/status');
   } else {
    ctx.status = 400;
    ctx.body = {
      status: 'error'
    } 
   }
 }) 
});

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = {
      success: false
    };
    ctx.throw(401);
  }
})

module.exports = router;