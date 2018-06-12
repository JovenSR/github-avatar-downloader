var request = require('request');
var fs = require('fs');
var secrets = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');


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

getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
  for(var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, './avatars/' + result[i].login + '.jpg');
  }

});

function cb(err, data) {
  if(err) {
    console.log("There was an error")
    return;
  }
  for(var i = 0; i < data.length; i++) {
    downloadImageByURL(data[i].avatar_url, './avatars/' + data[i].login + '.jpg');
  }
}

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







