const bcrypt = require('bcryptjs');
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('johnson', salt);
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return Promise.join(
        knex('users').insert({
          username: 'jeremy',
          password: hash
        })
      )
    });
};
