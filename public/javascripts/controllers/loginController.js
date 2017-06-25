/* global gapi, FB */

app.controller('LoginController', ['$scope', function ($scope) {
  var GoogleAuth
  var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly'
  $scope.handleClientLoad = function () {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient)
  }

  function initClient () {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
      'apiKey': 'YOUR_API_KEY',
      'discoveryDocs': [discoveryUrl],
      'clientId': 'YOUR_CLIENT_ID',
      'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance()

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus)

      // Handle initial sign-in state. (Determine if user is already signed in.)
      setSigninStatus()

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#googleSignIn').click(function () {
        handleAuthClick()
      })
      $('#googleSignOut').click(function () {
        revokeAccess()
      })
    })
  }

  function handleAuthClick () {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
      GoogleAuth.signOut()
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn()
    }
  }

  function revokeAccess () {
    GoogleAuth.disconnect()
  }

  function setSigninStatus (isSignedIn) {
    var user = GoogleAuth.currentUser.get()
    var isAuthorized = user.hasGrantedScopes(SCOPE)
    if (isAuthorized) {
      $('#googleSignIn').html('Sign out from Google')
      $('#googleSignOut').css('display', 'inline-block')
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.')
    } else {
      $('#googleSignIn').html('Sign in with Google')
      $('#googleSignOut').css('display', 'none')
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.')
    }
  }

  function updateSigninStatus (isSignedIn) {
    setSigninStatus()
  }

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback (response) {
    console.log('statusChangeCallback')
    console.log(response)
   // The response object is returned with a status field that lets the
   // app know the current login status of the person.
   // Full docs on the response object can be found in the documentation
   // for FB.getLoginStatus().
    if (response.status === 'connected') {
     // Logged into your app and Facebook.
      testAPI()
    } else {
     // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
       'into this app.'
    }
  }

 // This function is called when someone finishes with the Login
 // Button.  See the onlogin handler attached to it in the sample
 // code below.
  // function checkLoginState () {
  //   FB.getLoginStatus(function (response) {
  //     statusChangeCallback(response)
  //   })
  // }

  window.fbAsyncInit = function () {
    FB.init({
      appId: '1273518052769028',
      cookie: true,  // enable cookies to allow the server to access
                       // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.8
    })

 // Now that we've initialized the JavaScript SDK, we call
 // FB.getLoginStatus().  This function gets the state of the
 // person visiting this page and can return one of three states to
 // the callback you provide.  They can be:
 //
 // 1. Logged into your app ('connected')
 // 2. Logged into Facebook, but not your app ('not_authorized')
 // 3. Not logged into Facebook and can't tell if they are logged into
 //    your app or not.
 //
 // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
      statusChangeCallback(response)
    })
  }

 // Here we run a very simple test of the Graph API after login is
 // successful.  See statusChangeCallback() for when this call is made.
  function testAPI () {
    console.log('Welcome!  Fetching your information.... ')
    FB.api('/me', function (response) {
      console.log('Successful login for: ' + response.name)
      document.getElementById('status').innerHTML =
       'Thanks for logging in, ' + response.name + '!'
    })
  }
}])
