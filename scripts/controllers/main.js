'use strict';

/* Controllers */

universalSearchApp.controller('universalSearchCtrl', function($scope, $resource, YoutubeService, FlickrService){

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
      $scope.youtubeResults = YoutubeService.get(q);
    }

    // Search for tags in Flickr
    $scope.searchFlickr = function(){
        var q = $scope.searchTerm;
        $scope.flickrResults = FlickrService.get(q);
    }

    // Play video button
    $scope.playVideo = function(item) {
        var vid = youtube_parser(item.link[0].href);
        $scope.item_title = item.title.$t;
        $scope.item_thumb = item.media$group.media$thumbnail[3].url;
        $scope.item_iframe = "http://www.youtube.com/embed/" + vid;
        
        $('#VideoModal').modal('show');
    }

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        }else{
            return false;
        }
    }    
});


