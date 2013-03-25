'use strict';

universalSearchApp.factory('YoutubeService', function ($resource, $cacheFactory) {
    var cache = $cacheFactory('youtubeService');

    function loadData (q) {
        
        console.log('Making the request');

        return $resource('https://gdata.youtube.com/feeds/api/videos',
          {q: q, callback: 'JSON_CALLBACK', alt: 'json'},
          {get:{method:'JSONP'}}).get();
    }
    
    /**
    * Get the data. Check if is already in cache, 
    * otherwise do the request
    */
    function getData (q) {
        if ( !cache.get(q) ) {
            var data = loadData(q);
            cache.put(q,data);
            return data;
        } else {
            return cache.get(q);
        };
    };
    
    return {
        get: getData
    };
});