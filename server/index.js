const express = require('express');
let app = express();
const helper = require('../helpers/github.js');
const database = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // req comes from index.js
  var username = req.body || 'octocat';

  // Should be an array of object, each object being a repo
  helper.getReposByUsername(username, (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      var repoData = JSON.parse(data);
      // need to assign each separate repo to the database
      repoData.forEach(repo, database.save(repo, (err) => {
        if (err) {
          console.log(err);
        }
      }));
      res.send();
    }

  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  var results = database.top25((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

