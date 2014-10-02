/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		
		console.log('Received Event: ' + id);
    }
};

document.addEventListener("online", function() {
	if(localStorage.info) {
		alert("You already have our contacts");
		getDeviceContacts();
	} else {
		alert("Downloading contacts to device");
		getContacts();
	}
}, false);

document.addEventListener("offline", function() {
	alert("You do not have an internet connection");
	getDeviceContacts();
}, false);

function getDeviceContacts() {
	var onSuccess = function(contacts) {     
		for (i = 0; i < contacts.length; i++) {
			console.log(contacts[i].displayName); 
			document.getElementById("contactList").innerHTML += '<li id="' + contacts[i].id + '">' + contacts[i].displayName + '</li>';
				
		}
	};
	
	var onError = function(contactError) {     
		alert('onError!'); 
	};
	
	var options = new ContactFindOptions(); 
	options.filter   = ""; 
	options.multiple = true; 
	navigator.contacts.find(["*"], onSuccess, onError, options);
}

getContacts = function(){
	var request = new XMLHttpRequest();
	request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json", "async");
	request.send();
	
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var contactObject = JSON.parse(request.responseText);
				console.log(request.responseText);
				var jsonResponse = contactObject;
				localStorage.setItem("info", "1");
				saveContacts(jsonResponse);
			}       
		}
	}
};

var saveContacts = function(jsonResponse) {
	
	for (i = 0; i < jsonResponse.length; i++) {
		var firstName = jsonResponse[i].firstname;
		var lastName = jsonResponse[i].lastname;
		var userStreet = jsonResponse[i].street;
		var userCity = jsonResponse[i].city;
		var userState = jsonResponse[i].state;
		var userPhone = jsonResponse[i].phone;
		var userEmail = jsonResponse[i].email;
	
		var contact = navigator.contacts.create(); 
		contact.displayName = (firstName + " " + lastName);
	
		var name = new ContactName(); 
		name.givenName = firstName; 
		name.familyName = lastName; 
		contact.name = name;
	
		var phoneArray =[];
		var phone = new ContactField();
		phone.pref = "true";
		phone.type = "home";
		phone.value = userPhone;
		phoneArray[0] = phone;
		contact.phoneNumbers = phoneArray;
		
		var addressArray = [];
		var address = new ContactAddress();
		address.locality = userCity;
		address.pref = "true";
		address.region = userState;
		address.streetAddress = userStreet;
		address.type = "home";
		addressArray[0] = address;
		contact.addresses = addressArray;
		
		var emailArray = [];
		var email = new ContactField();
		email.pref = "true";
		email.type = "home";
		email.value = userEmail;
		emailArray[0] = email;
		contact.emails = emailArray;
		
		contact.save(onSuccess,onError);
	}
	
	alert("Contacts BOOM!");
	getDeviceContacts();
};
	//ADDS CLICK LISTENERS TO THE CONTACTS AND BUTTONS (EXCEPT FOR THE SAVE NEW CONTACT BUTTON)
	//THE CLICK LISTENER FOR THE CONTACTS IS JUST THE UL AS A WHOLE RIGHT NOW... WILL NEED TO BE CHANGED TO EACH INDIVIDUAL CONTACT
	
document.getElementById('contactList').addEventListener("click", function(e) {
	console.log(e.target.id);
	document.getElementById('contacts').style.display="none";
    document.getElementById('contactInfo').style.display="block";
    document.getElementById('addContact').style.display="none";
	
	editContact(e.target.id);
});

document.getElementById('backBtn1').addEventListener("click", function(e) {
    document.getElementById('contacts').style.display="block";
    document.getElementById('contactInfo').style.display="none";
    document.getElementById('addContact').style.display="none";
});

document.getElementById('backBtn2').addEventListener("click", function(e) {
    document.getElementById('contacts').style.display="block";
    document.getElementById('contactInfo').style.display="none";
    document.getElementById('addContact').style.display="none";
});

document.getElementById('addBtn').addEventListener("click", function(e) {
	document.getElementById('addContact').style.display="block";
    document.getElementById('contacts').style.display="none";
    document.getElementById('contactInfo').style.display="none";
    getGPSLocation();
});


function editContact(contactID) {
	alert(contactID);
	
	var onSuccess = function(contacts) {     
		console.log(contacts[0].displayName);
		
		contactName.value = contacts[0].displayName;
		contactPhone.value = contacts[0].phoneNumbers[0].value;
		contactEmail.value = contacts[0].emails[0].value;
		contactStreet.value = contacts[0].addresses[0].streetAddress;
		contactCity.value = contacts[0].addresses[0].locality;
		contactPostalCode.value = contacts[0].addresses[0].region;
	};
	
	var onError = function(contactError) {     
		alert('onError!'); 
	};
	
	var options = new ContactFindOptions(); 
	options.filter   = "Corey"; 
	options.multiple = true; 
	navigator.contacts.find(["*"], onSuccess, onError, options);
}

document.getElementById('submit').addEventListener("click", function(e) {
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var userStreet = document.getElementById('street').value;
	var userCity = document.getElementById('city').value;
	var userState = document.getElementById('postalCode').value; //THIS IS THE STATE!!!
	var userPhone = document.getElementById('phone').value;
	var userEmail = document.getElementById('email').value;
	
	var contact = navigator.contacts.create(); 
		contact.displayName = (firstName + " " + lastName);
		document.getElementById("contactList").innerHTML += '<li>' + firstName + " " + lastName + '</li>';
	
		var name = new ContactName(); 
		name.givenName = firstName; 
		name.familyName = lastName; 
		contact.name = name;
	
		var phoneArray =[];
		var phone = new ContactField();
		phone.pref = "true";
		phone.type = "home";
		phone.value = userPhone;
		phoneArray[0] = phone;
		contact.phoneNumbers = phoneArray;
		
		var addressArray = [];
		var address = new ContactAddress();
		address.locality = userCity;
		address.pref = "true";
		address.region = userState;
		address.streetAddress = userStreet;
		address.type = "home";
		addressArray[0] = address;
		contact.addresses = addressArray;
		
		var emailArray = [];
		var email = new ContactField();
		email.pref = "true";
		email.type = "home";
		email.value = userEmail;
		emailArray[0] = email;
		contact.emails = emailArray;
		
		contact.save(onSuccess,onError);
		
		alert("Contact Added!");
});

var onSuccess = function() {     
};

var onError = function(contactError) {     
	alert("Error = " + contactError.code); 
}

//FUNCTION THAT GETS THE USERS CURRENT POSITION

function getGPSLocation(){
	console.log('whereami');
        var success = function(position) {
            console.log(JSON.stringify(position));
            whatcity(position);
        };
        var failure = function() {
            console.log("error");
        };
        navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true
        });
};

function whatcity(position) {
	 var request = new XMLHttpRequest();
        request.open("GET", 
            "http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
            position.coords.latitude + "," + position.coords.longitude, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    console.log(request.responseText);
                    var obj = JSON.parse(request.responseText);
                    var city = document.getElementById("city");
                    city.value = obj.results[0].locations[0].adminArea5;
					var street = document.getElementById("street");
                    street.value = obj.results[0].locations[0].street;
					var state = document.getElementById("postalCode");
                    state.value = obj.results[0].locations[0].adminArea3;
                }
            }
        };
        request.send();
}

//FUNCTION THAT HANDLES WHEN THE GET POSITION FUNCTION RETURNS SUCCESS

//function successCallback(position){
	//alert("We found your location");
//}



//FUNCTION THAT HANDLES WHEN THE GET POSITION FUNCTION RETURNS AN ERROR

//function errorCallback(error){
	//alert("We can't find your current location. You will need to enter it manually.");
//}



(function init() {     
	app.initialize(); 
})()

