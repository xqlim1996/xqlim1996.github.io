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
