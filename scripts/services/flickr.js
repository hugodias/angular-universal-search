'use strict';

universalSearchApp.factory('FlickrService', function ($resource, $cacheFactory) {
    var cache = $cacheFactory('flickrService');
    var api_key = '8a98738f5a99d81cde0c89ee1a9cd5fd';

    function loadData (q) {
        
        console.log('Making the request');

        return $resource('http://api.flickr.com/services/rest/',
          {tags: q, 
            method: 'flickr.photos.search',
            jsoncallback: 'JSON_CALLBACK', 
            format: 'json', 
            api_key: api_key,
            safe_search: 1,
            per_page: 20
        },{get:{method:'JSONP'}}).get();
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