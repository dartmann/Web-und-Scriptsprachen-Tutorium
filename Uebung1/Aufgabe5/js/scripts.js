/**
 * Created by david on 30.11.15.
 */
window.onload = function() {
    //console.log('window ready');
    var div = document.getElementById('list-of-localstorage-elements');
    if (localstorage.exists()) {
        console.log('yes');
        for (var i in window.localStorage.length) {

        }
    } else {
        console.log('no');
    }

    div.innerHTML += '<p>Test</p>';
};

/**
 * Click method for the submit botton
 */
submitButtonClick = function () {
    var registrationRequest = {
        gender : document.getElementById('dropdown-gender').options[document.getElementById('dropdown-gender').selectedIndex].text,
        firstname : document.getElementById('input-firstname').value,
        lastname : document.getElementById('input-lastname').value,
        email : document.getElementById('input-email').value,
        password : document.getElementById('input-password').value,
        password2 : document.getElementById('input-password2').value
    };

    /**
     * Method to save the registrationRequest to the {@link localStorage}.
     * @param registrationRequest the given registrationRequest
     * @return true if registration email is already used and false if otherwise
     */
    function saveToLocalStorage(registrationRequest) {

        /**
         * Method to check the store for an already registered user with his email address.
         * @param registrationRequest
         * @returns {boolean}
         */
        function checkLocalStorageForUser(registrationRequest) {
            var storageEntries = window.localStorage.length;
            console.log('Anzahl der Storage Einträge: '+storageEntries);
            for(var i = 0; i < storageEntries; i++) {
                var obj = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
                if(obj.email === registrationRequest.email) {
                    return true;
                }
            }
            return false;
        }

        if(!checkLocalStorageForUser(registrationRequest)) {
            window.localStorage.setItem(window.localStorage.length+1, JSON.stringify(registrationRequest));
            console.info('Email: '+registrationRequest.email+' erfolgreich registriert.');
        } else {
            console.warn('Nutzer bereits registriert!');
        }
    }

    /**
     * Validation of the data.
     */
    if (registrationRequest.gender &&
        registrationRequest.firstname &&
        registrationRequest.lastname &&
        registrationRequest.password &&
        registrationRequest.password2 &&
        (registrationRequest.password.length >= 6 && registrationRequest.password2.length >= 6) &&
        (registrationRequest.password == registrationRequest.password2)) {
        if(window.localStorage !== 'undefined') {
            if(saveToLocalStorage(registrationRequest)) {
                console.warn('Email: '+registrationRequest.email+' has already registered!');
            }
        } else {
            window.alert('No LocalStorage Support!')
        }
    } else {
        window.alert('Daten nicht korrekt eingegeben!')
    }
};

/**
 * Closure to check if {@link localStorage} is supported by the browser.
 */
var localstorage = (function() {

    return {
        exists: exists
    };

    function exists() {
        //simplified checking of the underlying code
        return window.localStorage !== 'undefined';
        /**
         * old overhead of checking
         *
        if(window.localStorage !== 'undefined' ? true : false;) {
            return true;
        }
        return false;
        */
    }
})();