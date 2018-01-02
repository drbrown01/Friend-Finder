// Load data
//Liking routes to a series of data sources
//these sources hold arrays of information an all possible Friends
var friends = require("../data/friends");


//routing

module.exports = function (app) {
  // API get requests
  //Below code handles when users "visit" a Page
  // in each of the below cases when a user visits a Link
  app.get("/api/friends", function (req, res) {
    res.json(friends);

  });
  // API post requests

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo:"",
      friendDifference: Infinity
    };
    //Take the results of the survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;
    //var will calculate the difference between the user's score and the userScores
    //of other users in the database
    var totalDifference;
    //loop through al the friend possibilities
    for(var i = 0; i <  friends.length; i++){
      var currentFriend = friends[i];
      totalDifference = 0;
      console.log(currentFriend.name);
      //we then loop through all the scores to find the scores of each friend
      for (var j=0; j<currentFriend.scores.length; j++){
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        totalDifference+= Math.abs(parseInt(currentUserScore)- parseInt(currentFriendScore));
      }
      if (totalDifference <= bestMatch.friendDifference){
        //Reset the best match
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    //Push the user's data into the database(this has to happen after the check)
    friends.push(userData);
    //return a JSON with the user's best match. This will be used by the html in the next Page
    res.json(bestMatch);

  });
};
