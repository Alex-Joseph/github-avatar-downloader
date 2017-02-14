var request = require('request');
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");
var GITHUB_USER = "Alex-Joseph";
var GITHUB_TOKEN = "551188a057e2f5497e24d338e892f0aa59786da0";

function  getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {url : requestURL, headers: {'User-Agent': "GitHub Avatar Downloader - Student Project"} };
  request.get(options, function(err, response, body) {
    if (err) throw err;
    cb(err, JSON.parse(body));
  });
}
// calls the function
getRepoContributors("jquery", "jquery", function(err, results) {
  console.log("Downloading...");
  results.forEach(function(profile) {
    var avatar_url = profile.avatar_url;
    var dir = "./avatars";
    var filePath = dir + "/" + profile.login + ".jpg";
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir);
    }
    downloadImageByURL(avatar_url, filePath);
  });
  console.log("Download complete.");
});
// function (url, filepath)
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
       throw err;
     })
     .on('response', function (response) {
     })
     .pipe(fs.createWriteStream(filePath));
};
