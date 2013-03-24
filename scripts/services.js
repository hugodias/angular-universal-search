'use strict';
// Here we will save the queries
universalSearchApp.factory('YoutubeCache', function($cacheFactory) {
    return $cacheFactory('youtubeCache', {
        capacity: 3 // how many queries we will store
    });
});