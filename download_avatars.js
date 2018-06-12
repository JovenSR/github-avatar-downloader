var request = require('request');
var fs = require('fs');
var secrets = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = process.argv[2];
var repoName = process.argv[3];
if(!(repoOwner || repoName) || process.argv.length > 4) {
  return "There was an error";
}


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',

    }, 'auth': {'bearer' : secrets.GITHUB_TOKEN }
  };

  request(options, function(err, res, body) {
    var parsed = JSON.parse(body);
    console.log(parsed);
    cb(err, parsed);

  });

}

getRepoContributors(repoOwner, repoName, function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
  if(err) {
    console.log("There was an error")
    return;
  }
  for(var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, './avatars/' + result[i].login + '.jpg');
  }

});


function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
            throw err;
         })
         .on('response', function (response) {
            console.log('Response')
         })
          .pipe(fs.createWriteStream(filePath));


}







