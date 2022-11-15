'use strict';
var version='v20';
var cacheNameSpace='Dominos';
var cacheName=cacheNameSpace+'-'+version;
var staticAssetRegex=/(^(https?:\/\/)(.*\/public?\/m\.dominos\.co\.id)*)/i;

self.addEventListener('install',function(){
  console.log('[service-worker] Installing .. ');

self.skipWaiting()});

self.addEventListener('activate',function(e){
  console.log('[service-worker] Activating...');
});
// self.clients.claim();

// e.waitUntil(caches.keys().then(function(storedCaches){
//   return Promise.all(storedCaches.map(function(storedCacheName){
//     if(storedCacheName.indexOf(cacheNameSpace)===0&&storedCacheName.indexOf(cacheName)===-1){
//       console.log('%c DELETE: Out of date cache: %s','color: #ff0000',storedCacheName);
//       caches.delete(storedCacheName)}
//       return false}))}))});

// var fetchWithSave=function fetchWithSave(cache,request){
//   return new Promise(function(resolve,reject){
//     fetch(request).then(function(response){
//       console.log('putting in cache and serving the response');
//       cache.put(request,response.clone());
//       resolve(response)}).catch(function(error){
//         console.error('Fetching failed:',error);
//         reject(error)})})};

// var cacheWithNWFallback=function cacheWithNWFallback(cacheName,request,alwaysNet){
//   return new Promise(function(resolve,reject){
//     caches.open(cacheName).then(function(cache){
//       return cache.match(request).then(function(response){
//         if(response){alwaysNet&&fetchWithSave(cache,request);
//           console.log('serving response from cache '+cacheName,response);
//         return resolve(response)}return resolve(fetchWithSave(cache,request))}).catch(function(e){
//           console.log('Cache open error occured',request.url);reject(e)})})})};

// self.addEventListener('fetch',function(event){
//   if(staticAssetRegex.test(event.request.url)){
//     event.respondWith(cacheWithNWFallback(cacheName,event.request))}
//     else if(event.request.mode==='navigate'&&!urisToExclude.test(event.request.url)||flyoutsRegex.test(event.request.url)){
//       event.respondWith(cacheWithNWFallback(cacheName,event.request,true))}});