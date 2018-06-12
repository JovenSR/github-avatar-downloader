var request = require('request');
var secrets = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var parsed = JSON.parse(body);
    console.log(parsed);
    cb(err, parsed);

  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

});

function cb(err, data) {
  if(err) {
    console.log("There was an error")
    return;
  }
  for(var i = 0; i < data.length; i++) {
    console.log(data[0].avatar_url);
  }
}







