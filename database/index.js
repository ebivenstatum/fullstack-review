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

let save = (repository, callback) => {
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

  Repo.sort({rating: 'desc'});

}

let top25 = (callback) => {
  var repos = Repo
                .find({})
                .limit(25)
                .then(result => {
                  let repoList = result.map((data) => {
                    return {
                      owner: {id: data._doc.owner.id, name: data._doc.owner.name},
                      repo: {id: dat._doc.repo.id, name: dat._doc.repo.name},
                      rating: dat._doc.rating,
                      url: dat._doc.url
                    };
                  });
                });
  callback(repos);
}

module.exports.save = save;
module.exports.top25 = top25;