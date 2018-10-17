/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function delay (URL) {
    setTimeout( function() { window.location = URL }, 1000 );
}

//hides time and progressbar

var timedetails = document.getElementsByClassName("time-details");
for (i = 0; i < timedetails.length; i++){
    timedetails[i].style.display = "none";
  }


var progressbar_container = document.getElementById("progressbar-container");
progressbar_container.style.display = "none";

var tableFilled = false;

//fetches flight and passenger data from api
var settings0 = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://apigw.singaporeair.com/appchallenge/api/flight/passenger",
  "method": "POST",
  "headers": {
    "apikey": "aghk73f4x5haxeby7z24d2rc",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Postman-Token": "080e84c1-9730-4797-ae69-0c119dbed7ad"
  },
  "processData": false,
  "data": "{ \"flightNo\": \"SQ890\", \"flightDate\": \"2018-07-20\" }"
}

//updates data fields with api data
var obj = $.ajax(settings0).done(function (response) {
  console.log(response.response);
  var obj = response.response;
  var flightNo = obj.flightNo;
  var flightDate = obj.flightDate;
  var loadSummary = obj.loadSummary;
  var businessClassCapacity = loadSummary["businessClassCapacity:"];
  var businessClassBookedLoad = loadSummary["businessClassBookedLoad"];
  var economyClassCapacity = loadSummary["economyClassCapacity:"];
  var economyClassBookedLoad = loadSummary["economyClassBookedLoad"];
  var checkinCounter_economy = 0;
  var checkinCounter_business = 0;


  var passengerList = obj.passengerList;
  console.log(passengerList);

  var table = document.getElementsByClassName("passenger-list")[0];

  for (var i = 0; i < passengerList.length ; i++){
    var bookingRef = passengerList[i].bookingReference;
    var firstName = passengerList[i].firstName;
    var lastName = passengerList[i].lastName;
    var name = firstName + " " + lastName;
    var bookingClass = passengerList[i].bookingClass;
    var checkInStatus = passengerList[i].checkInStatus;
    var travelFlexi = "Yes";
    var contact = "Contact ";
    var bumpbidOffer = "";

    if (i < 3){
      var bumpbidOffer_value = 100*(i+1);
      bumpbidOffer = "$" + bumpbidOffer_value;
    }
    


    if (checkInStatus == "Checked-In"){
      if (bookingClass == "Economy"){
        checkinCounter_economy++;
      }
      if (bookingClass == "Business"){
        checkinCounter_business++;
      }
      
    }
    
    var tr = table.insertRow(-1);
    tr.style.border = "solid";
    var td_bookingRef = tr.insertCell(-1);
    td_bookingRef.innerHTML = bookingRef;

    var td_firstName = tr.insertCell(-1);
    td_firstName.innerHTML = firstName ;

    var td_lastName = tr.insertCell(-1);
    td_lastName.innerHTML = lastName;

    var td_bookingClass = tr.insertCell(-1);
    td_bookingClass.innerHTML = bookingClass;

    var td_checkInStatus = tr.insertCell(-1);
    td_checkInStatus.innerHTML = checkInStatus;

    var td_travelFlexi = tr.insertCell(-1);
    td_travelFlexi.innerHTML = travelFlexi;
    
    var td_bumpbidOffer = tr.insertCell(-1);
    td_bumpbidOffer.innerHTML = bumpbidOffer;

    var td_contact  = tr.insertCell(-1);
    var contact_button = document.createElement("h4");
    contact_button.className = "panel-title btn btn-primary";
    contact_button.style.marginTop = "4px";
    contact_button.style.marginBottom = "4px";

    var contact_button_link = document.createElement("a");
    contact_button_link.setAttribute("href", "javascript:delay('chat.html')");
    contact_button_link.style.color = "white";
    contact_button_link.innerHTML = contact;
    contact_button_link.className = "contact-button";
    contact_button_link.id = name;
    //contact_button_link.setAttribute("onClick", "chat(" + name + ")")
    contact_button.appendChild(contact_button_link);
    td_contact.appendChild(contact_button);

    if (i == (passengerList.length-1)){
      tableFilled = true;
      addContactFunction();
    }
    
  }

  var flight_number = document.getElementsByClassName("flight-number");
  flight_number[0].innerHTML = "Flight " + flightNo;

  var departure_date = document.getElementsByClassName("departure-date");
  var arrival_date = document.getElementsByClassName("arrival-date");
  departure_date[0].innerHTML = flightDate;
  arrival_date[0].innerHTML = flightDate;

  var overcapacity_indicator = document.getElementsByClassName("overcapacity-indicator")[0];
  var overcapacity_indicator_html = "";

  //economy progress bar



  checkinCounter_economy = 48;

  var checkin_capacity_economy = document.getElementsByClassName("checkin-capacity-economy");
  checkin_capacity_economy[0].setAttribute("aria-valuemax", economyClassCapacity);
  checkin_capacity_economy[0].setAttribute("aria-valuenow", checkinCounter_economy);
  var checkin_percent_economy = (checkinCounter_economy / economyClassCapacity) * 100;
  checkin_capacity_economy[0].innerHTML = (checkinCounter_economy + "/" + economyClassCapacity);
  

  checkin_capacity_economy[0].style.width = (checkin_percent_economy.toString() + "%");

  var checkin_bookedload_economy = document.getElementsByClassName("checkin-bookedload-economy");
  checkin_bookedload_economy[0].setAttribute("aria-valuemin", economyClassCapacity);
  checkin_bookedload_economy[0].setAttribute("aria-valuemax", economyClassBookedLoad);
  checkin_bookedload_economy[0].setAttribute("aria-valuenow", checkinCounter_economy);

  var economy_overbooked = checkinCounter_economy - economyClassCapacity;

  if (economy_overbooked > 0){

    var economy_overbooked_capacity = (economy_overbooked / (economyClassBookedLoad - economyClassCapacity)) * 100;

    checkin_bookedload_economy[0].style.width = (economy_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_economy[0].innerHTML = (economy_overbooked + " seats over capacity!");
    overcapacity_indicator_html = ("Economy over capacity: " + economy_overbooked + " seat(s)!<br>")
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

  //business progress bar

  checkinCounter_business = 6;

  var checkin_capacity_business = document.getElementsByClassName("checkin-capacity-business");
  checkin_capacity_business[0].setAttribute("aria-valuemax", businessClassCapacity);
  checkin_capacity_business[0].setAttribute("aria-valuenow", checkinCounter_business);
  var checkin_percent_business = (checkinCounter_business / businessClassCapacity) * 100;
  checkin_capacity_business[0].innerHTML = (checkinCounter_business + "/" + businessClassCapacity);
  

  checkin_capacity_business[0].style.width = (checkin_percent_business.toString() + "%");

  var checkin_bookedload_business = document.getElementsByClassName("checkin-bookedload-business");
  checkin_bookedload_business[0].setAttribute("aria-valuemin", businessClassCapacity);
  checkin_bookedload_business[0].setAttribute("aria-valuemax", businessClassBookedLoad);
  checkin_bookedload_business[0].setAttribute("aria-valuenow", checkinCounter_business);

  var business_overbooked = checkinCounter_business - businessClassCapacity;

  if (business_overbooked > 0){

    var business_overbooked_capacity = (business_overbooked / (businessClassBookedLoad - businessClassCapacity)) * 100;

    checkin_bookedload_business[0].style.width = (business_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_business[0].innerHTML = (business_overbooked + " seats over capacity!");

    overcapacity_indicator_html = overcapacity_indicator_html.concat(("Business over capacity: " + business_overbooked + " seat(s)!"))
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }


});

var config = {
  apiKey: "AIzaSyA84PV-dux0D63LqkNyIs0W7AhGMGS1aXo",
  authDomain: "skylight-87b14.firebaseapp.com",
  databaseURL: "https://skylight-87b14.firebaseio.com",
  projectId: "skylight-87b14",
  storageBucket: "skylight-87b14.appspot.com",
  messagingSenderId: "183105683833",
  };

  firebase.initializeApp(config);

  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
timestampsInSnapshots: true
});

db.collection("bids").doc("SQ890").update({
      isOngoing: false,
      CurrentBid: 0,
      OldBid: 0,
      WinningBid: 10000,
      CustomersAccepted: 3
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

db.collection("bids").doc("SQ890")
    .onSnapshot(function(doc) {
        if (doc.data().CustomersAccepted >= doc.data().SeatsRequired && doc.data().isOngoing == true){
          document.getElementById("customersAccepted_indicator").className = "card text-black bg-success o-hidden h-100";
          document.getElementsByClassName("customersAccepted")[0].innerText = doc.data().CustomersAccepted;
          var cancel = confirm("Enough customers have been found! Stop BumpBid?");
          if (cancel){
            cancel_bumpbid();
          }
          else{
            alert("Bumpbid still ongoing!")
          }
        }
    });


//  contact button functionality


function addContactFunction(){
  var contact_button = document.getElementsByClassName("contact-button"); 
  console.log(contact_button.length); 

  for (var i = 0; i < contact_button.length; i++){
    var name = contact_button[i].id;
    console.log("name is " + name); 
    
    contact_button[i].addEventListener("click", function(i){

      var name = this.id;
      console.log("nam2 is " + name); 

      db.collection("conversations")
      .get()
      .then(function(querySnapshot) {
          var nameExists = false;
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var chat = doc.data();

              if (name == chat.customer){
                nameExists = true;
              }
              })

              if (nameExists == false){
                db.collection("conversations").add({
                created: Date().toString(),
                customer: name,
                messages: []
              })               
                console.log("written");
                }
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    });
  }
}

function chatTimeout(name){
  setTimeout(chat(name), 5000);
}

function chat(button_id){
  console.log("chat function runnig: ", name);

  var name = button_id;

  console.log("name is " + name); 

  db.collection("conversations")
  .get()
  .then(function(querySnapshot) {
      var nameExists = false;
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var chat = doc.data();

          if (name == chat.customer){
            nameExists = true;
          }
          })

          if (nameExists == false){
            db.collection("conversations").add({
            created: Date().toString(),
            customer: name,
            messages: []
          })               
            console.log("written");
            }
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });  
}


var timedetails_button = document.getElementById("time-details-button");

timedetails_button.addEventListener('click', function(){
  var timedetails = document.getElementsByClassName("time-details");
  for (i = 0; i < timedetails.length; i++){
    if (timedetails[i].style.display == ""){
      timedetails[i].style.display = "none";
    }
    else{
      timedetails[i].style.display = "";
    }
    
  }
})

var bumpbidValue_button = document.getElementById("bumpbid-value-button");
var bumpbidValue_display = document.getElementsByClassName("bumpBidValue")[0];

bumpbidValue_button.addEventListener('click', function(){

  db.collection("bids").doc("SQ890").get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().isOngoing == true){
          var newBumpbid_value = Number(prompt("Please enter new BumpBid Offer"));
          //bumpbidValue_display.innerText = "$" + newBumpbid_value;

           db.collection("bids").doc("SQ890").update({
            CurrentBid: newBumpbid_value
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
        }
        else {
          alert("Bumpbid not started!");
        }
        

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

})

var progressbar_button = document.getElementById("progressbar-container-button");

progressbar_button.addEventListener('click', function(){

  var progressbar_container = document.getElementById("progressbar-container");
  
  if (progressbar_container.style.display == ""){
    progressbar_container.style.display = "none";
    console.log(progressbar_container.style.display);
  }
  else{
    progressbar_container.style.display = "";
  }
})

var bumpbidPassengers_button = document.getElementById("bumpbid-passengers-button");

var isFiltered = false;

bumpbidPassengers_button.addEventListener('click', function(){

  var table, tr, td, i;
  
  var table = document.getElementsByClassName("passenger-list")[0];
  tr = table.getElementsByTagName("tr");

  if (isFiltered){
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[6];
      if (td) {
        tr[i].style.display = "";
      }       
    }
    isFiltered = false;
  }

  else{
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[6];
      if (td) {
        if (td.innerHTML == "") {
          tr[i].style.display = "none";
        } else {
          tr[i].style.display = "";
        }
      }       
    }
    isFiltered = true;

  }

})

var bumpbidStart_button = document.getElementById("bumpbid-start-button");

bumpbidStart_button.addEventListener('click', function(){
  var starting_bumpbid = Number(prompt("BumpBid Started! Enter starting BumpBid"));
  // Add a new document in collection "cities"

  db.collection("bids").doc("SQ890").update({
      isOngoing: true,
      CurrentBid: starting_bumpbid,
      OldBid: starting_bumpbid,
      WinningBid: 10000
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

  db.collection("bids").doc("SQ890")
    .onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    }, function(doc) {
        bumpbidValue_display.innerText = "$" + doc.data().CurrentBid;
    });

})

function cancel_bumpbid(){
  
  db.collection("bids").doc("SQ890").get().then(function(doc) {
      if (doc.exists) {

        db.collection("bids").doc("SQ890").update({
            isOngoing: false,
            WinningBid: doc.data().CurrentBid
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        alert("BumpBid Ended! Winning Bid is: " + doc.data().WinningBid);
        

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  

}

var bumpbidStop_button = document.getElementById("bumpbid-stop-button");
bumpbidStop_button.addEventListener('click', cancel_bumpbid);


//SORT

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));
