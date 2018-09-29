const messaging = firebase.messaging();
messaging.usePublicVapidKey("BFQCHaewsQa9i1FulbMs1LEfe5br7rvRei8K2kmHBOluELdbBB_YUJaUVZSzlULDn57bIletaswzwghgHliwfxs");
var token;
token = messaging.getToken();
console.log(token);

messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  return messaging.getToken();
})
.then(function(token){
  console.log("im here")
  console.log(token)
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

/*
messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  token = messaging.getToken();
  console.log(token);
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    //updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  //showToken('Error retrieving Instance ID token. ', err);
  //setTokenSentToServer(false);
});

*/