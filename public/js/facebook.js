'use strict';

function statusChangeCallback(res) {
  console.log('statusChangeCallback');

  if (res.authResponse) {
    console.log('Access Token: ', res.authResponse.accessToken);
  }

  if (res.status === 'connected') {
    testAPI();
  } else {
    document.getElementById('status').innerHTML = 'Please log into Healthera.';
  }
}

function checkLoginState() {
  FB.getLoginStatus((res) => {
    statusChangeCallback(res);
  });
}

window.fbAsyncInit = function() {
    FB.init({
    appId      : '686604078186170',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus((res) => {
    statusChangeCallback(res);
  });
};

(function(d, s, id) {
  let js;
  const fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  console.log('Welcome! Fetching your information....');

  const fields = [
    'id',
    'name',
    'first_name',
    'middle_name',
    'last_name',
    'gender',
    'email',
    'picture',
    'age_range',
    'birthday'
  ];

  FB.api('/me', {fields}, (res) => {
    console.log(`Successful login for: ${res.name}`);
    document.getElementById('status').innerHTML = `Thanks for logging in, ${res.name}!`;
  });

}
