var clientId = '669071039142.apps.googleusercontent.com';
var apiKey = 'uDyKdztcqwLXac9ABXgPVXyd';
var scopes = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
var $loginButton;
var CLIENT = {
    id: "",
    name: "",
    gender: ""
};
jQuery(document).ready(function () {
    $loginButton = $('#googleLogin');
});

function handleClientLoad() {
    window.setTimeout(function () {
        checkAuth();
    }, 1);
}

function checkAuth() {

    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {

    if (authResult && !authResult.error) {
        $('#main-google-login').addClass("hide");
        $('#mainContent').removeClass("hide");
        gapi.client.load('oauth2', 'v2', function () {
            console.log("loaded oauth, yay! getting email");
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                console.log(resp);
                CLIENT.id = resp.email;
                CLIENT.name = resp.given_name;
                CLIENT.gender = resp.gender;
            });
        });
        gapi.client.load('tasks', 'v1', loadedTaskApi);

    } else {
        $loginButton.on('click', handleAuthClick);
    }
}

function handleAuthClick(event) {
    console.log('========>>>>> 123321');
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}