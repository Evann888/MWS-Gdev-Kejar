const staticCacheName = 'SW-V-1';

var urlsToCache = [
  '/'
  // '/Images',
  // '/Project2/css/mystyle.css'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(staticCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


// Call Install Event
// self.addEventListener('install', e => {
//   console.log('Service Worker: Installed');
// })



// self.addEventListener('activate', function(event){
//   console.log('active');
//   event.waitUntil(
//       caches.keys().then(function(cacheNames){
//         return Promise.all(
//           cacheNames.filter(function(cacheName){
//             return cacheName.startsWith('SW-V-') && cacheName != staticCacheName;
//           }).map(function(cacheName){
//             console.log('cache deleted');
//             return cache.delete(cacheName);
//           })
//         );
//       })
//   );
// });

// Call Activate Event to
self.addEventListener('activate', e => {
  console.log('SW Active');
  // Get rid old caches
  e.waitUntil(
    //get cachces name
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== staticCacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
// self.addEventListener('fetch', function(event){
//   console.log('SW Fetch');
//   event.respondWith(
//     fetch(event.request).then(function(response) {
//       if(response.status === 404){
//         return new Response("error 404")
//       }
//       return response;
//       })
//     .then(res => {
//       // Make copy/clone of response
//       const resClone = res.clone();
//       // Open cahce
//       caches.open(staticCacheName).then(cache => {
//         // put(req,res) or cache.addAll Add response to cache
//         cache.put(event.request, resClone);
//       });
//       return res;
//     })
//                   //caches.match(request) try to find match in any cachces
//     .catch(err => caches.match(event.request).then(res => res))
//   );
// });

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cahce
        caches.open(staticCacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
