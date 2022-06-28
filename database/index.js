const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner: { id: Number, name: String },
  repo: { id: Number, name: String },
  rating: Number,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */ repository) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // make the new row, following the schema
  // NOTE: may need to switch to brackets for the object values
  var newRepo = new Repo({
    owner: { id: repository.owner.id, name: repository.owner.login },
    repo: { id: repository.id, name: repository.name },
    rating: repository.forks, // going by number of forks, the more the better
    url: repository.url
  });

  // check to see if that repo id is already in database, if so, overwrite it;
  var exists = false;
  Repo.findOne({repo: {id: repository.id}}, (err, count) => {
    if (count > 0) {
      exists = true;
    }
  })

  if (!exists) {
    newRepo.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data Saved'); // No callback so use console.log
      }
    });
  } else {
    Repo.findOneAndUpdate({repo: {id: repository.id}}, newRepo);
  }
  // rem to catch errors


}

module.exports.save = save;