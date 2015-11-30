/**
 * Created by david on 30.11.15.
 */
window.onload = function() {
    console.log('window ready');
};

submitButtonClick = function () {
    var registrationRequest = {
        gender : document.getElementById('dropdown-gender').options[document.getElementById('dropdown-gender').selectedIndex].text,
        firstname : document.getElementById('input-firstname').value,
        lastname : document.getElementById('input-lastname').value,
        email : document.getElementById('input-email').value,
        password : document.getElementById('input-password').value,
        password2 : document.getElementById('input-password2').value
    };

    function saveToLocalStorage(registrationRequest) {
        function checkLocalStorageForUser(registrationRequest) {
            var storageEntries = window.localStorage.length;
            console.log('Anzahl der Storage Einträge: '+storageEntries);
            for(var i = 0; i < storageEntries; i++) {
                var obj = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
                if(obj.email === registrationRequest.email) {
                    console.warn('Email: '+registrationRequest.email+' has already registered!');
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

    if (registrationRequest.gender &&
        registrationRequest.firstname &&
        registrationRequest.lastname &&
        registrationRequest.password &&
        registrationRequest.password2 &&
        (registrationRequest.password.length == 6 && registrationRequest.password2.length == 6) &&
        (registrationRequest.password == registrationRequest.password2)) {
        if(window.localStorage !== 'undefined') {
            saveToLocalStorage(registrationRequest);
        } else {
            console.warn('No LocalStorage Support!')
        }
    } else {
        console.warn('Daten nicht korrekt eingegeben!')
    }
    //console.log(registrationRequest);
};