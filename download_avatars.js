var request = require('request');

console.log("Welcome to the GitHub Avatar Downloader!");
var GITHUB_USER = "Alex-Joseph";
var GITHUB_TOKEN = "551188a057e2f5497e24d338e892f0aa59786da0";

function  getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("result:", result);
});
