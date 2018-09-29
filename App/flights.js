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

  for (var i = 0; i < passengerList.length; i++){
    var bookingRef = passengerList[i].bookingReference;
    var firstName = passengerList[i].firstName;
    var lastName = passengerList[i].lastName;
    var bookingClass = passengerList[i].bookingClass;
    var checkInStatus = passengerList[i].checkInStatus;
    var travelFlexi = "Yes";
    var contact = "Contact";



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

    var td_contact = tr.insertCell(-1);
    var contact_button = document.createElement("h4");
    contact_button.className = "panel-title btn btn-primary";
    contact_button.style.marginTop = "4px";
    contact_button.style.marginBottom = "4px";

    var contact_button_link = document.createElement("a");
    contact_button_link.setAttribute("href", "chat.html");
    contact_button_link.style.color = "white";
    contact_button_link.innerHTML = contact;
    contact_button.appendChild(contact_button_link);
    td_contact.appendChild(contact_button);
    
  }

  var flight_number = document.getElementsByClassName("flight-number");
  flight_number[0].innerHTML = flightNo;

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



var settings1 = {
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
  "data": "{ \"flightNo\": \"SQ318\", \"flightDate\": \"2018-07-20\" }"
}

var obj = $.ajax(settings1).done(function (response) {
  
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

  var table = document.getElementsByClassName("passenger-list")[1];

  for (var i = 0; i < passengerList.length; i++){
    var bookingRef = passengerList[i].bookingReference;
    var firstName = passengerList[i].firstName;
    var lastName = passengerList[i].lastName;
    var bookingClass = passengerList[i].bookingClass;
    var checkInStatus = passengerList[i].checkInStatus;
    var travelFlexi = "Yes";
    var contact = "Contact";



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

    var td_contact = tr.insertCell(-1);
    var contact_button = document.createElement("h4");
    contact_button.className = "panel-title btn btn-primary";
    contact_button.style.marginTop = "4px";
    contact_button.style.marginBottom = "4px";

    var contact_button_link = document.createElement("a");
    contact_button_link.setAttribute("href", "chat.html");
    contact_button_link.style.color = "white";
    contact_button_link.innerHTML = contact;
    contact_button.appendChild(contact_button_link);
    td_contact.appendChild(contact_button);
    
  }

  var flight_number = document.getElementsByClassName("flight-number");
  flight_number[1].innerHTML = flightNo;

  var departure_date = document.getElementsByClassName("departure-date");
  var arrival_date = document.getElementsByClassName("arrival-date");
  departure_date[1].innerHTML = flightDate;
  arrival_date[1].innerHTML = flightDate;

  var overcapacity_indicator = document.getElementsByClassName("overcapacity-indicator")[1];
  var overcapacity_indicator_html = "";

  //economy progress bar

  //checkinCounter_economy = 48;

  var checkin_capacity_economy = document.getElementsByClassName("checkin-capacity-economy");
  checkin_capacity_economy[1].setAttribute("aria-valuemax", economyClassCapacity);
  checkin_capacity_economy[1].setAttribute("aria-valuenow", checkinCounter_economy);
  var checkin_percent_economy = (checkinCounter_economy / economyClassCapacity) * 100;
  checkin_capacity_economy[1].innerHTML = (checkinCounter_economy + "/" + economyClassCapacity);

  checkin_capacity_economy[1].style.width = (checkin_percent_economy.toString() + "%");

  var checkin_bookedload_economy = document.getElementsByClassName("checkin-bookedload-economy");
  checkin_bookedload_economy[1].setAttribute("aria-valuemin", economyClassCapacity);
  checkin_bookedload_economy[1].setAttribute("aria-valuemax", economyClassBookedLoad);
  checkin_bookedload_economy[1].setAttribute("aria-valuenow", checkinCounter_economy);

  var economy_overbooked = checkinCounter_economy - economyClassCapacity;

  if (economy_overbooked > 0){

    var economy_overbooked_capacity = (economy_overbooked / (economyClassBookedLoad - economyClassCapacity)) * 100;

    checkin_bookedload_economy[1].style.width = (economy_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_economy[1].innerHTML = (economy_overbooked + " seats over capacity!");
    overcapacity_indicator_html = ("Economy over capacity: " + economy_overbooked + " seat(s)!<br>")
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

  //business progress bar

  //checkinCounter_business = 6;

  var checkin_capacity_business = document.getElementsByClassName("checkin-capacity-business");
  checkin_capacity_business[1].setAttribute("aria-valuemax", businessClassCapacity);
  checkin_capacity_business[1].setAttribute("aria-valuenow", checkinCounter_business);
  var checkin_percent_business = (checkinCounter_business / businessClassCapacity) * 100;
  checkin_capacity_business[1].innerHTML = (checkinCounter_business + "/" + businessClassCapacity);
  

  checkin_capacity_business[1].style.width = (checkin_percent_business.toString() + "%");

  var checkin_bookedload_business = document.getElementsByClassName("checkin-bookedload-business");
  checkin_bookedload_business[1].setAttribute("aria-valuemin", businessClassCapacity);
  checkin_bookedload_business[1].setAttribute("aria-valuemax", businessClassBookedLoad);
  checkin_bookedload_business[1].setAttribute("aria-valuenow", checkinCounter_business);

  var business_overbooked = checkinCounter_business - businessClassCapacity;

  if (business_overbooked > 0){

    var business_overbooked_capacity = (business_overbooked / (businessClassBookedLoad - businessClassCapacity)) * 100;

    checkin_bookedload_business[1].style.width = (business_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_business[1].innerHTML = (business_overbooked + " seats over capacity!");

    overcapacity_indicator_html = overcapacity_indicator_html.concat(("Business over capacity: " + business_overbooked + " seat(s)!"))
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

});

var settings2 = {
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
  "data": "{ \"flightNo\": \"SQ494\", \"flightDate\": \"2018-07-20\" }"
}

var obj = $.ajax(settings2).done(function (response) {
  
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

  var table = document.getElementsByClassName("passenger-list")[2];

  for (var i = 0; i < passengerList.length; i++){
    var bookingRef = passengerList[i].bookingReference;
    var firstName = passengerList[i].firstName;
    var lastName = passengerList[i].lastName;
    var bookingClass = passengerList[i].bookingClass;
    var checkInStatus = passengerList[i].checkInStatus;
    var travelFlexi = "Yes";
    var contact = "Contact";



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

    var td_contact = tr.insertCell(-1);
    var contact_button = document.createElement("h4");
    contact_button.className = "panel-title btn btn-primary";
    contact_button.style.marginTop = "4px";
    contact_button.style.marginBottom = "4px";

    var contact_button_link = document.createElement("a");
    contact_button_link.setAttribute("href", "chat.html");
    contact_button_link.style.color = "white";
    contact_button_link.innerHTML = contact;
    contact_button.appendChild(contact_button_link);
    td_contact.appendChild(contact_button);
    
  }

  var flight_number = document.getElementsByClassName("flight-number");
  flight_number[2].innerHTML = flightNo;

  var departure_date = document.getElementsByClassName("departure-date");
  var arrival_date = document.getElementsByClassName("arrival-date");
  departure_date[2].innerHTML = flightDate;
  arrival_date[2].innerHTML = flightDate;

  var overcapacity_indicator = document.getElementsByClassName("overcapacity-indicator")[2];
  var overcapacity_indicator_html = "";

  //economy progress bar

  //checkinCounter_economy = 48;

  var checkin_capacity_economy = document.getElementsByClassName("checkin-capacity-economy");
  checkin_capacity_economy[2].setAttribute("aria-valuemax", economyClassCapacity);
  checkin_capacity_economy[2].setAttribute("aria-valuenow", checkinCounter_economy);
  var checkin_percent_economy = (checkinCounter_economy / economyClassCapacity) * 100;
  checkin_capacity_economy[2].innerHTML = (checkinCounter_economy + "/" + economyClassCapacity);
  

  checkin_capacity_economy[2].style.width = (checkin_percent_economy.toString() + "%");

  var checkin_bookedload_economy = document.getElementsByClassName("checkin-bookedload-economy");
  checkin_bookedload_economy[2].setAttribute("aria-valuemin", economyClassCapacity);
  checkin_bookedload_economy[2].setAttribute("aria-valuemax", economyClassBookedLoad);
  checkin_bookedload_economy[2].setAttribute("aria-valuenow", checkinCounter_economy);

  var economy_overbooked = checkinCounter_economy - economyClassCapacity;

  if (economy_overbooked > 0){

    var economy_overbooked_capacity = (economy_overbooked / (economyClassBookedLoad - economyClassCapacity)) * 100;

    checkin_bookedload_economy[2].style.width = (economy_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_economy[2].innerHTML = (economy_overbooked + " seats over capacity!");
    overcapacity_indicator_html = ("Economy over capacity: " + economy_overbooked + " seat(s)!<br>")
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

  //business progress bar

  //checkinCounter_business = 6;

  var checkin_capacity_business = document.getElementsByClassName("checkin-capacity-business");
  checkin_capacity_business[2].setAttribute("aria-valuemax", businessClassCapacity);
  checkin_capacity_business[2].setAttribute("aria-valuenow", checkinCounter_business);
  var checkin_percent_business = (checkinCounter_business / businessClassCapacity) * 100;
  checkin_capacity_business[2].innerHTML = (checkinCounter_business + "/" + businessClassCapacity);
  

  checkin_capacity_business[2].style.width = (checkin_percent_business.toString() + "%");

  var checkin_bookedload_business = document.getElementsByClassName("checkin-bookedload-business");
  checkin_bookedload_business[2].setAttribute("aria-valuemin", businessClassCapacity);
  checkin_bookedload_business[2].setAttribute("aria-valuemax", businessClassBookedLoad);
  checkin_bookedload_business[2].setAttribute("aria-valuenow", checkinCounter_business);

  var business_overbooked = checkinCounter_business - businessClassCapacity;

  if (business_overbooked > 0){

    var business_overbooked_capacity = (business_overbooked / (businessClassBookedLoad - businessClassCapacity)) * 100;

    checkin_bookedload_business[2].style.width = (business_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_business[2].innerHTML = (business_overbooked + " seats over capacity!");

    overcapacity_indicator_html = overcapacity_indicator_html.concat(("Business over capacity: " + business_overbooked + " seat(s)!"))
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

});

var settings3 = {
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
  "data": "{ \"flightNo\": \"SQ872\", \"flightDate\": \"2018-07-20\" }"
}

var obj = $.ajax(settings3).done(function (response) {
  
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

  var table = document.getElementsByClassName("passenger-list")[3];

  for (var i = 0; i < passengerList.length; i++){
    var bookingRef = passengerList[i].bookingReference;
    var firstName = passengerList[i].firstName;
    var lastName = passengerList[i].lastName;
    var bookingClass = passengerList[i].bookingClass;
    var checkInStatus = passengerList[i].checkInStatus;
    var travelFlexi = "Yes";
    var contact = "Contact";



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

    var td_contact = tr.insertCell(-1);
    var contact_button = document.createElement("h4");
    contact_button.className = "panel-title btn btn-primary";
    contact_button.style.marginTop = "4px";
    contact_button.style.marginBottom = "4px";

    var contact_button_link = document.createElement("a");
    contact_button_link.setAttribute("href", "chat.html");
    contact_button_link.style.color = "white";
    contact_button_link.innerHTML = contact;
    contact_button.appendChild(contact_button_link);
    td_contact.appendChild(contact_button);
    
  }

  var flight_number = document.getElementsByClassName("flight-number");
  flight_number[3].innerHTML = flightNo;

  var departure_date = document.getElementsByClassName("departure-date");
  var arrival_date = document.getElementsByClassName("arrival-date");
  departure_date[3].innerHTML = flightDate;
  arrival_date[3].innerHTML = flightDate;

  var overcapacity_indicator = document.getElementsByClassName("overcapacity-indicator")[3];
  var overcapacity_indicator_html = "";

  //economy progress bar

  //checkinCounter_economy = 48;

  var checkin_capacity_economy = document.getElementsByClassName("checkin-capacity-economy");
  checkin_capacity_economy[3].setAttribute("aria-valuemax", economyClassCapacity);
  checkin_capacity_economy[3].setAttribute("aria-valuenow", checkinCounter_economy);
  var checkin_percent_economy = (checkinCounter_economy / economyClassCapacity) * 100;
  checkin_capacity_economy[3].innerHTML = (checkinCounter_economy + "/" + economyClassCapacity);
  

  checkin_capacity_economy[3].style.width = (checkin_percent_economy.toString() + "%");

  var checkin_bookedload_economy = document.getElementsByClassName("checkin-bookedload-economy");
  checkin_bookedload_economy[3].setAttribute("aria-valuemin", economyClassCapacity);
  checkin_bookedload_economy[3].setAttribute("aria-valuemax", economyClassBookedLoad);
  checkin_bookedload_economy[3].setAttribute("aria-valuenow", checkinCounter_economy);

  var economy_overbooked = checkinCounter_economy - economyClassCapacity;

  if (economy_overbooked > 0){

    var economy_overbooked_capacity = (economy_overbooked / (economyClassBookedLoad - economyClassCapacity)) * 100;

    checkin_bookedload_economy[3].style.width = (economy_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_economy[3].innerHTML = (economy_overbooked + " seats over capacity!");
    overcapacity_indicator_html = ("Economy over capacity: " + economy_overbooked + " seat(s)!<br>")
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }


  //business progress bar

  //checkinCounter_business = 6;

  var checkin_capacity_business = document.getElementsByClassName("checkin-capacity-business");
  checkin_capacity_business[3].setAttribute("aria-valuemax", businessClassCapacity);
  checkin_capacity_business[3].setAttribute("aria-valuenow", checkinCounter_business);
  var checkin_percent_business = (checkinCounter_business / businessClassCapacity) * 100;
  checkin_capacity_business[3].innerHTML = (checkinCounter_business + "/" + businessClassCapacity);
  

  checkin_capacity_business[3].style.width = (checkin_percent_business.toString() + "%");

  var checkin_bookedload_business = document.getElementsByClassName("checkin-bookedload-business");
  checkin_bookedload_business[3].setAttribute("aria-valuemin", businessClassCapacity);
  checkin_bookedload_business[3].setAttribute("aria-valuemax", businessClassBookedLoad);
  checkin_bookedload_business[3].setAttribute("aria-valuenow", checkinCounter_business);

  var business_overbooked = checkinCounter_business - businessClassCapacity;

  if (business_overbooked > 0){

    var business_overbooked_capacity = (business_overbooked / (businessClassBookedLoad - businessClassCapacity)) * 100;

    checkin_bookedload_business[3].style.width = (business_overbooked_capacity.toString() + "%"); 
    checkin_bookedload_business[3].innerHTML = (business_overbooked + " seats over capacity!");

    overcapacity_indicator_html = overcapacity_indicator_html.concat(("Business over capacity: " + business_overbooked + " seat(s)!"))
    overcapacity_indicator.innerHTML = overcapacity_indicator_html;
  }

});



//Doent work:
/*
var xmlhttp = new XMLHttpRequest();
var request = {
   "flightNo": "SQ890", 
   "flightDate": "2018-07-20" 
 };


xmlhttp.open("POST", "https://apigw.singaporeair.com/appchallenge/api/flight/passenger");
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.setRequestHeader("apikey", "aghk73f4x5haxeby7z24d2rc");
xmlhttp.send(JSON.stringify(request));

var data = xmlhttp.responseText;

parsed_data = JSON.parse(data);

console.log(parsed_data);*/

// Create the XHR object.

/*
var invocation = new XMLHttpRequest();
var url = 'https://apigw.singaporeair.com/appchallenge/api/flight/passenger';
var body = {"flightNo": "SQ890", "flightDate": "2018-07-20"};

    
function callOtherDomain(){
  if(invocation)
    {
      invocation.open('POST', url, true);
      invocation.setRequestHeader('apikey', 'aghk73f4x5haxeby7z24d2rc');
      invocation.setRequestHeader('Content-Type', 'application/json');
      invocation.send(body); 
    }
}

callOtherDomain();*/