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
/*Repo.remove({}, function(err) {
  console.log('collection removed')
});*/


let save = (repository, callback) => {

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // make the new row, following the schema
  // NOTE: may need to switch to brackets for the object values
  var newRepo = new Repo({
    owner: { id: repository.owner.id, name: repository.owner.login },
    repo: { id: repository.id, name: repository.name },
    rating: repository.stargazers_count, // going by number of stars, the more the better
    url: repository.html_url
  });

  // check to see if that repo id is already in database, if so, overwrite it;
  var exists = false;
  Repo.findOne({ repo: { id: repository.id } }, (err) => {
    if (!err) {
      exists = true;
    }
  })

  if (!exists) {
    newRepo.save((err, data) => {
      if (err) {
        callback(err, newRepo);
      } else {
        callback(null, newRepo);
      }
    });
  } else {
    Repo.findOneAndUpdate({ repo: { id: repository.id } }, newRepo);
  }

}

let top25 = (/*callback*/) => {
  return Repo.find({}).sort({ rating: 'desc' }).limit(25);
}

module.exports.save = save;
module.exports.top25 = top25;