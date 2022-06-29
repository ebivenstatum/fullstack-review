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
  var username = 'ebivenstatum';

  // Should be an array of object, each object being a repo
  helper.getReposByUsername(username, (response) => {
    response.data.forEach(d => database.save(d, (err) => {
      if (err) {
        console.log(err);
      }
    }));
    res.send();

  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  database.top25().then(results => res.end(JSON.stringify(results)));
  //res.send(JSON.stringify([results]));


});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

