'use strict';

/* Controllers */

universalSearchApp.controller('universalSearchCtrl', function($scope, $resource, YoutubeCache){

    // Search for keywords in Twitter
    $scope.searchTweet = function() {
      var q = $scope.searchTerm;
      $scope.twitter = $resource('http://search.twitter.com/:action',
        {action: 'search.json', q: q, callback: 'JSON_CALLBACK'},
        {get:{method:'JSONP'}});
      $scope.twitterResults = $scope.twitter.get();      
    }

    // Search for keywords in Youtube
    $scope.searchYoutube = function(){
      var q = $scope.searchTerm;

      // Check if the query was already performed
      if (YoutubeCache.get(q)) {

        $scope.youtubeResults = YoutubeCache.get(q);
        console.log('Query pulled from cache.');

      } else {
        $scope.youtube = $resource('https://gdata.youtube.com/feeds/api/videos',
          {q: q, callback: 'JSON_CALLBACK', alt: 'json'},
          {get:{method:'JSONP'}});

        $scope.youtubeResults = $scope.youtube.get();

        // Store this query in cache
        YoutubeCache.put(q,$scope.youtubeResults); 

        console.log('Writting results in cache..');       
      };
            
    }
});


