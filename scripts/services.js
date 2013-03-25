'use strict';
// // Here we will save the queries
// universalSearchApp.factory('YoutubeCache', function($cacheFactory) {
//     return $cacheFactory('youtubeCache', {
//         capacity: 3 // how many queries we will store
//     });
// });
universalSearchApp.factory('YoutubeService', function ($resource, $cacheFactory) {
    var cache = $cacheFactory('youtubeService');

    function loadData ( q ) {
        
        console.log('making request - should do this only 1 time');

        return $resource('https://gdata.youtube.com/feeds/api/videos',
          {q: q, callback: 'JSON_CALLBACK', alt: 'json'},
          {get:{method:'JSONP'}}).get();
    }
    
    // Get the data
    function getData ( q ) {
        // Check if is already in cache
        if ( !cache.get(q) ) {
            // Store the results from request
            var data = loadData(q);
            // Cache the query
            cache.put(q,data);
            // Return the data
            return data;
        } else {
            // Return from cache
            return cache.get(q);
        };
    };
    
    return {
        get: getData
    };
});