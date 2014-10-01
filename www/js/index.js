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
	getContacts();
}, false);

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
				saveContacts(jsonResponse);
				
				for (var i in contactObject) { 
					document.getElementById("contactList").innerHTML += "<li>" + contactObject[i].firstname + " " + contactObject[i].lastname + "</li>";
				}
			}       
		}
	}
};

var saveContacts = function(jsonResponse) {
	console.log(jsonResponse[0].firstname)
	console.log(jsonResponse[0].lastname)
	console.log(jsonResponse[0].street)
	console.log(jsonResponse[0].city)
	console.log(jsonResponse[0].state)
	console.log(jsonResponse[0].phone)
	console.log(jsonResponse[0].email)
	
	var firstName = jsonResponse[0].firstname;
	var lastName = jsonResponse[0].lastname;
	var street = jsonResponse[0].street;
	var city = jsonResponse[0].city;
	var state = jsonResponse[0].state;
	var userPhone = jsonResponse[0].phone;
	var userEmail = jsonResponse[0].email;
	
	var contact = navigator.contacts.create(); 
	contact.displayName = (firstName + " " + lastName);
	
	var name = new ContactName(); 
	name.givenName = firstName; 
	name.familyName = lastName; 
	contact.name = name;
	
	var phone = new ContactField();
	phone.pref = "true";
	phone.type = "home";
	phone.value = userPhone;
	contact.phoneNumbers = phone;
	
	contact.save(onSuccess,onError);
};

var onSuccess = function() {     
	alert("Save Success"); 
};

var onError = function(contactError) {     
	alert("Error = " + contactError.code); 
}

document.addEventListener("offline", function() {
	alert("You do not have an internet connection")
}, false);

(function init() {     
	app.initialize(); 
})()

