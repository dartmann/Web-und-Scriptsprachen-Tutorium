/**
 * Created by david on 01.12.15.
 */
window.onload = function() {

    var userAgent = navigator.userAgent;
    var userAgentLc = userAgent.toLocaleLowerCase();

    var color = checkUserAgent(userAgentLc);

    document.getElementById('p-useragent').innerHTML = userAgent;
    document.body.style.background = color;
};

/**
 * Method to check the given userAgent String, which already is set to lowercase for the
 * different UA Strings of Chrome, Firefox and Safari and additionally for the version.
 * @param userAgentLc the given useragent string
 * @returns {string} the set color in dependency of the useragent
 */
function checkUserAgent(userAgentLc) {

    var color = '';
    var browserVersion = '';

    /**
     * for example:
     * Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36
     *
     * Chrome latest version: 46.0.2490.86 (10.11.2015)
     */
    if(userAgentLc.indexOf('chrome') > -1 && userAgentLc.indexOf('safari') > -1) {
        color = 'yellow';
        browserVersion = userAgentLc.substring(userAgentLc.lastIndexOf('chrome/'))
            .substring(userAgentLc.search('/'));
        if(parseFloat(browserVersion) < 44.0) {
            showObsoletVersionAlert(browserVersion);
        }
    }
    /**
     * for example:
     * Mozilla/5.0 (X11; Linux x86_64; rv:42.0) Gecko/20100101 Firefox/42.0
     *
     * Firefox latest version: 42.0 (November 2015)
     */
    else if(userAgentLc.indexOf('firefox') > -1 && userAgentLc.indexOf('gecko')) {
        color = 'orange';
        browserVersion = userAgentLc.substring(userAgentLc.lastIndexOf('firefox/'))
                .substring(userAgentLc.search('/')+1) < 40.0;
        if(parseFloat(browserVersion) < 40.0) {
            showObsoletVersionAlert(browserVersion);
        }
    }
    /**
     * for example:
     * Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A
     *
     * Safari latest version: 9.0.1 (Oktober 2015)
     */
    else if(userAgentLc.indexOf('safari') > -1 && userAgentLc.indexOf('version') > -1) {
        color = 'blue';
        browserVersion = userAgentLc.substring(userAgentLc.lastIndexOf('version/'))
            .substring(userAgentLc.search('/')+1)
            .substring(0, 5);
        if(parseFloat(browserVersion) < 7.0) {
            showObsoletVersionAlert(browserVersion);
        }
    } else {
        color = 'white';
    }
    return color;
}

/**
 * Method to show an alert dialog with a given versionnumber of a browser.
 * @param browserVersion
 */
function showObsoletVersionAlert(browserVersion) {
    window.alert('Ihr Browser hat Version: '+browserVersion+', diese ist veraltet. Bitte aktualisieren Sie.')
}