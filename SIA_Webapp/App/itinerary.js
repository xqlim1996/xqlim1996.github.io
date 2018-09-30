
var name0 = "Localicious Kitchen";

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://tih-api.stb.gov.sg/content/v1/food-beverages/name/"+ name0 +"?apikey=0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
  "headers": {
    "apikey": "0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
    "Cache-Control": "no-cache",
    "Postman-Token": "5d71bfe7-6544-4328-a32c-166540cf382d"
  },
}

var obj = $.ajax(settings).done(function (response) {
  console.log(response);

  var description = response.data.description;

  var description_output = document.getElementsByClassName("description");
  console.log(description_output[0].innerHTML);
  description_output[0].innerHTML = description;

});


var name1 = "BATTLEBOX";

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://tih-api.stb.gov.sg/content/v1/attractions/name/"+ name1 +"?apikey=0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
  "headers": {
    "apikey": "0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
    "Cache-Control": "no-cache",
    "Postman-Token": "5d71bfe7-6544-4328-a32c-166540cf382d"
  },
}

var obj = $.ajax(settings).done(function (response) {
  console.log(response);

  var description = response.data.description;

  var description_output = document.getElementsByClassName("description");
  console.log(description_output[1].innerHTML);
  description_output[1].innerHTML = description;

});




var name2 = "GARDENS BY THE BAY";

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://tih-api.stb.gov.sg/content/v1/attractions/name/"+ name2 +"?apikey=0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
  "headers": {
    "apikey": "0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
    "Cache-Control": "no-cache",
    "Postman-Token": "5d71bfe7-6544-4328-a32c-166540cf382d"
  },
}

var obj = $.ajax(settings).done(function (response) {
  console.log(response);

  var description = response.data.description;

  var description_output = document.getElementsByClassName("description");
  console.log(description_output[2].innerHTML);
  description_output[2].innerHTML = description;

});



var name3 = "Maxwell Food Centre";

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://tih-api.stb.gov.sg/content/v1/food-beverages/name/"+ name3 +"?apikey=0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
  "headers": {
    "apikey": "0XGLMEVUr3YI1RFAydllRPOEKiSoQExM",
    "Cache-Control": "no-cache",
    "Postman-Token": "5d71bfe7-6544-4328-a32c-166540cf382d"
  },
}

var obj = $.ajax(settings).done(function (response) {
  console.log(response);

  var description = response.data.description;

  var description_output = document.getElementsByClassName("description");
  console.log(description_output[3].innerHTML);
  description_output[3].innerHTML = description;

});