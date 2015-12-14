/**
 * Created by david on 08.12.15.
 */
window.onload = function() {
    //test();
    xmlHttpRequester.getJSON( './json/daten.json');
};

var xmlHttpRequester = (function(){
    return {
        getJSON: getJSON
    };

    function getJSON(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.setRequestHeader('Accept', 'application/json');
        req.onreadystatechange = function() {
            if(req.readyState !== 4) {
                return;
            }
            if(req.status !== 200) {
                alert('Ein Fehler ist aufgetreten: ' + req.status + ' ' + req.statusText);
                return;
            }
            var div = document.getElementById('wettervorhersage-wrapper');
            var jsonArr = JSON.parse(req.responseText);
            for(var i in jsonArr) {
                div.innerHTML += jsonArr[i].email + "<br>";
            }
            console.log(req.responseText);
        };
        req.send(null);
    }
})();

/**
 * New functionality in form of promise bringing method "fetch".
 * See:
 * https://jakearchibald.com/2015/thats-so-fetch/<
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_AP
 * https://developers.google.com/web/updates/2015/03/introduction-to-fetch
 */
function test() {

    fetch('./json/daten.json')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    var div = document.getElementById('wettervorhersage-wrapper');
                    for(var i in data) {
                        div.innerHTML += data[i].email + "<br>";
                    }
                    console.log(data);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
    });
};