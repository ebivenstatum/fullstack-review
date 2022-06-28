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

  // rem to catch errors
  newRepo.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Data Saved'); // No callback so use console.log
    }
  });

}

module.exports.save = save;