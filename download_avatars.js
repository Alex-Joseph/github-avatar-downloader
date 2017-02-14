// requires request for data retrieval, fs for write stream
var request = require('request');
var fs = require('fs');
// necessary for the throw request, slice...[0] prevents an empty array returning as true
var owner = process.argv.slice(2, 3)[0];
var repo = process.argv.slice(3, 4)[0];
// constructor function that generates throw error
function UserError(message) {
  this.message = message;
  console.log(message);
}
// conditional ensures that owner and repo are entered in CLI
if (!owner || !repo) {
  throw new UserError("Please enter an owner and a repo agrument");
}

console.log("Welcome to the GitHub Avatar Downloader!");
var GITHUB_USER = "Alex-Joseph";
var GITHUB_TOKEN = "551188a057e2f5497e24d338e892f0aa59786da0";
// function that uses a header to access array of objects, callback with parameter parsed object
function  getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {url : requestURL, headers: {'User-Agent': "GitHub Avatar Downloader - Student Project"} };
  request.get(options, function(err, response, body) {
    if (err) throw err;
    cb(err, JSON.parse(body));
  });
}
// function is defined before it is called by the .forEach loop with parameters url and filePath
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath)); //filePath is defined in the function below
};

getRepoContributors(owner, repo, function(err, results) {
  console.log("Downloading..."); //just for aesthetics
  results.forEach(function(profile) {
    var avatar_url = profile.avatar_url;
    var dir = "./avatars";
    var filePath = dir + "/" + profile.login + ".jpg";
    if (!fs.existsSync(dir)) { //checks to see if the directory exists, if not, it creates one
      fs.mkdir(dir);
    }
    downloadImageByURL(avatar_url, filePath);
  });

  console.log("Download complete."); //just for aesthetics
});
