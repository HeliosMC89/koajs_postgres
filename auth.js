const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const knex = require('./database/connections');

const options = {};

async function comparePassword(userPassword, dbPassword) {
    return await bcrypt.compareSync(userPassword, dbPassword);
}

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    return knex('users').where({ id }).first()
        .then(user => {
           done(null, user);
        }).catch(err=> {
           done(err, null);
        })
});

passport.use('local', new LocalStrategy((username, password, done) => {
   return knex('users').where({ username }).first()
        .then(user => {
            if (!user) {
                return done(null, false);
            } 
            if (!comparePassword(password, user.password)) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        }).catch(err => {
            return done(err);
        });
}));