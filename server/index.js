const express = require('express');
let app = express();
const helper = require('../helpers/github.js');
const saveToDB = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // req comes from index.js, data: "{username: username}"
  var userObj = JSON.parse(req.body);
  var username = userObj.username;

  // Should be an array of object, each object being a repo
  var repoData;
  helper.getReposByUsername(username, (data) => {
    repoData = JSON.parse(data);
  });

  // need to assign each separate repo to the database
  repoData.forEach(repo, saveToDB.save(repo));
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

