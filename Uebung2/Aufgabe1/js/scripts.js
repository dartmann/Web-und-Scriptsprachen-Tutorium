/**
 * Created by david on 08.12.15.
 */
window.onload = function() {
    test();
    //requester.getJSON( 'http://www.url.tld', onResult);
};

function onResult(resultData) {
    // do something with resultData
    //alert(resultData);
    var div = document.getElementById('wettervorhersage-wrapper');
    //document.write(resultData.city);
    console.log(resultData);
}

var requester = (function(){
    return {
        getJSON: getJSON
    };

    function getJSON(url, onResultCb) {
        var req = new XMLHttpRequest();
        req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/city?q=Wuerzburg,de&lang=de&units=metric&APPID=d87b289c8ddf9b2759e3b3e075175f97');
        req.setRequestHeader('Accept', 'application/json');
        req.onreadystatechange = function() {
            if(req.readyState !== 4) {
                return;
            }
            if(req.status !== 200) {
                alert('Ein Fehler ist aufgetreten: ' + req.status + ' ' + req.statusText);
                return;
            }
            onResultCb( JSON.parse(req.responseText) );
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
                    //console.log(data);
                    var div = document.getElementById('wettervorhersage-wrapper');
                    for(var i in data) {
                        div.innerHTML += data[i].email + "<br>";
                    }
                    //div.innerHTML += data;
                    console.log(data);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
    });
}