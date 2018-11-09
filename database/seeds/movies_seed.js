
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(() => {
      // Inserts seed entries
      return knex('movies').insert({
        name: 'The Land Before Time',
        genre: 'Fastany',
        rating: 7,
        explicit: false 
      });
    })
    .then(() => {
      return knex('movies').insert({
        name: 'Ice Age: Dawn of the Dinosaurs',
        genre: 'Action/Romance',
        rating: 5,
        explicit: false
      })
    .then(() => {
      return knex('movies').insert({
        name: 'The GodFather',
        genre: 'drama/criminal',
        rating: 10,
        explicit: true
      })
    })
   })
};
