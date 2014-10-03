var links = [];
var pages = [];
var numLinks = 0;
var numPages = 0;
var counter = 0;
var totalContacts = 0;
var contactID;
var allContacts = {};

// Declare all variables for the "p" in contactDetailsPage
var firstname = document.getElementById("firstName");
var lastname = document.getElementById("lastName");
var streetAddress = document.getElementById("streetAddress");
var city = document.getElementById("city");
var state = document.getElementById("state");
var email = document.getElementById("email");
var phoneNumber = document.getElementById("phoneNumber");

// Declare all variables for the inputs in editContactPage
var inputFirstName = document.querySelector("input[name='editFirstName']");
var inputLastName = document.querySelector("input[name='editLastName']");
var inputStreetAddress = document.querySelector("input[name='editStreetAddresses']");
var inputCity = document.querySelector("input[name='editCities']");
var inputState = document.querySelector("input[name='editStates']");
var inputEmail = document.querySelector("input[name='editEmails']");
var inputPhoneNum = document.querySelector("input[name='editPhones']");

// Declare all variables for the inputs in addContactPage
var inputFirstName2 = document.querySelector("input[name='addFirstName']");
var inputLastName2 = document.querySelector("input[name='addLastName']");
var inputStreetAddress2 = document.querySelector("input[name='addStreetAddresseses']");
var inputCity2 = document.querySelector("input[name='addCities']");
var inputState2 = document.querySelector("input[name='addStates']");
var inputEmail2 = document.querySelector("input[name='addEmails']");
var inputPhoneNum2 = document.querySelector("input[name='addPhones']");

var app = {
    initialize: function () {
        this.bindEvents();
        //app.appStart();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        document.addEventListener('online', app.startApp, false);
        document.addEventListener('offline', function () {
            alert("Device is offline. Check your network status");
        }, false);
    },
    onDeviceReady: function () {
        // Add controls such as link clicks to the app
        app.addControls();

        /*// Check if it's the first time the user runs the app
        var firstRun = localStorage.getItem("key");
        if (firstRun == null) {
            // Initialize all contacts from Simon's JSON file to the device contacts
            app.initializeContacts();
        } else {
            // Get all contacts from the device contacts and display it on the home page
            app.getContacts();
        }*/
    },
    startApp: function () {
        // Check if it's the first time the user runs the app
        var firstRun = localStorage.getItem("key");
        if (firstRun == null) {
            // Initialize all contacts from Simon's JSON file to the device contacts
            app.initializeContacts();
        } else {
            // Get all contacts from the device contacts and display it on the home page
            app.getContacts();
        }
    },
    addControls: function () {
        links = document.querySelectorAll("[data-role='link']");
        pages = document.querySelectorAll("[data-role='page']");
        numLinks = links.length;
        numPages = pages.length;

        for (var l = 0; l < numLinks; l++) {
            links[l].addEventListener('click', this.handleClick, false);
        }
    },
    handleClick: function (link) {
        link.preventDefault();
        var href = link.currentTarget.href;
        var parts = href.split("#");
        app.loadPage(parts[1]);

        var id = link.currentTarget.id;
        var className = link.currentTarget.className;
        if (className == "contacts") {
            app.getContactDetails(id);
        }

        if (id == "doneEditBtn") {
            app.editContact();
        } else if (id == "doneAddBtn") {
            app.addContact();
        } else if (id == "addContactBtn") {
            app.getGeoInfo();
        }
    },
    loadPage: function (page) {
        for (var p = 0; p < numPages; p++) {
            if (pages[p].id == page) {
                pages[p].className = "active";
            } else {
                pages[p].className = "";
            }
        }
    },
    initializeContacts: function () {
        var request = new XMLHttpRequest();
        request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json", true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    var result = JSON.parse(request.responseText);
                    totalContacts = result.length;

                    // Assign all contacts to the device contacts
                    // Declare the contact variables so we just have to make the variables once
                    var newContact;
                    var contactName;
                    var contactAddresses = [];
                    var contactPhoneNumbers = [];
                    var contactEmails = [];
                    for (var i = 0; i < result.length; i++) {
                        // Create the contact
                        newContact = navigator.contacts.create();
                        newContact.displayName = result[i].firstname + " " + result[i].lastname;

                        // Assign the contact's name
                        contactName = new ContactName();
                        contactName.givenName = result[i].firstname;
                        contactName.familyName = result[i].lastname;
                        newContact.name = contactName;

                        // Assign the contact's addresses
                        contactAddresses[0] = new ContactAddress();
                        contactAddresses[0].pref = true;
                        contactAddresses[0].type = "home";
                        contactAddresses[0].formatted = result[i].street + ", " + result[i].city + ", " + result[i].state;
                        contactAddresses[0].streetAddress = result[i].street;
                        contactAddresses[0].locality = result[i].city;
                        contactAddresses[0].country = result[i].state;
                        newContact.addresses = contactAddresses;

                        // Assign the contact's phone numbers
                        if (result[i].phone === undefined) {
                            contactPhoneNumbers[0] = new ContactField("mobile", " ", true);
                        } else {
                            contactPhoneNumbers[0] = new ContactField("mobile", result[i].phone, true);
                        }
                        newContact.phoneNumbers = contactPhoneNumbers;

                        // Assign the contact's emails
                        if (result[i].email === undefined) {
                            contactEmails[0] = new ContactField("home", " ", true);
                        } else {
                            contactEmails[0] = new ContactField("home", result[i].email, true);
                        }
                        newContact.emails = contactEmails;

                        // Save the contact
                        newContact.save(app.onContactSuccess, app.onContactError);
                    }
                }
            }
        };
        request.send();
    },
    onContactSuccess: function (contact) {
        counter++;

        if (counter == totalContacts) {
            app.getContacts();
            localStorage.setItem("key", "1");
        }
    },
    onContactError: function (error) {
        counter++;

        if (counter == totalContacts) {
            app.getContacts();
            localStorage.setItem("key", "1");
        }
    },
    getContacts: function () {
        var fields = ["displayName"];
        var options = new ContactFindOptions();
        options.multiple = true;
        navigator.contacts.find(fields, app.onGetContactsSuccess, app.onGetContactsError, options);
    },
    onGetContactsSuccess: function (contacts) {
        //console.log("Successfully got " + contacts.length + " contacts!");
        var contactsWrapper = document.querySelector(".contacts");
        var contactList;
        var contactLink;

        for (var i = 0; i < contacts.length; i++) {
            contactList = document.createElement("li");
            contactLink = document.createElement("a");
            contactLink.href = "#contactDetailsPage"
            contactLink.setAttribute("data-role", "link");
            contactLink.id = contacts[i].id;
            contactLink.className = "contacts";
            contactLink.innerHTML = contacts[i].displayName;
            contactLink.addEventListener('click', app.handleClick, false);
            contactList.appendChild(contactLink);
            contactsWrapper.appendChild(contactList);
        }
    },
    onGetContactsError: function (contactError) {
        alert("Error with error code: " + contactError.code);
    },
    //----- Start of Timo's Latest Code - Oct 2, 1:20pm -----//
    getContactDetails: function (id) {
        contactID = id;
        var fields = ["*"];
        var options = new ContactFindOptions();
        options.multiple = true;
        navigator.contacts.find(fields, app.onGetContactDetailsSuccess, app.onGetContactsError, options);
    },
    onGetContactDetailsSuccess: function (contact) {
        allContacts = contact;
        //console.log(allContacts);

        firstname.innerHTML = "";
        lastname.innerHTML = "";
        streetAddress.innerHTML = "";
        city.innerHTML = "";
        state.innerHTML = "";
        email.innerHTML = "";
        phoneNumber.innerHTML = "";

        inputFirstName.value = "";
        inputLastName.value = "";
        inputStreetAddress.value = "";
        inputCity.value = "";
        inputState.value = "";
        inputEmail.value = "";
        inputPhoneNum.value = "";

        if (contact.length != 0) {
            for (var i = 0; i < contact.length; i++) {
                if (contact[i].id === contactID) {
                    firstname.innerHTML = contact[i].name.givenName;
                    lastname.innerHTML = contact[i].name.familyName;
                    streetAddress.innerHTML = contact[i].addresses[0].streetAddress;
                    city.innerHTML = contact[i].addresses[0].locality;
                    state.innerHTML = contact[i].addresses[0].country;
                    email.innerHTML = contact[i].emails[0].value;
                    phoneNumber.innerHTML = contact[i].phoneNumbers[0].value; // ERROR for contact "Claude Giroux"

                    inputFirstName.value = contact[i].name.givenName;
                    inputLastName.value = contact[i].name.familyName;
                    inputStreetAddress.value = contact[i].addresses[0].streetAddress;
                    inputCity.value = contact[i].addresses[0].locality;
                    inputState.value = contact[i].addresses[0].country;
                    inputEmail.value = contact[i].emails[0].value;
                    inputPhoneNum.value = contact[i].phoneNumbers[0].value;

                    inputFirstName.id = contact[i].id;
                    console.log(inputFirstName.id);
                }
            }
        } else {
            alert("Unable to get that contact");
        }
    },
    editContact: function () {
        var contactId = inputFirstName.id;
        //console.log(contactId);

        for (var i = 0; i < allContacts.length; i++) {
            if (allContacts[i].id === contactId) {
                allContacts[i].displayName = inputFirstName.value + " " + inputLastName.value;

                var contactName = new ContactName();
                contactName.givenName = inputFirstName.value;
                contactName.familyName = inputLastName.value;
                allContacts[i].name = contactName;

                var contactAddresses = [];
                contactAddresses[0] = new ContactAddress();
                contactAddresses[0].pref = true;
                contactAddresses[0].type = "home";
                contactAddresses[0].formatted = inputStreetAddress.value + ", " + inputCity.value + ", " + inputState.value;
                contactAddresses[0].streetAddress = inputStreetAddress.value;
                contactAddresses[0].locality = inputCity.value;
                contactAddresses[0].country = inputState.value;
                allContacts[i].addresses = contactAddresses;

                var contactPhoneNumbers = [];
                contactPhoneNumbers[0] = new ContactField("mobile", inputPhoneNum.value, true);
                allContacts[i].phoneNumbers = contactPhoneNumbers;

                var contactEmails = [];
                contactEmails[0] = new ContactField("home", inputEmail.value, true);
                allContacts[i].emails = contactEmails;

                allContacts[i].save(app.onEditContactSuccess, app.onEditContactError)
            }
        }
    },
    onEditContactSuccess: function (contact) {
        console.log("Contact successfully edited!");
    },
    onEditContactError: function (error) {
        console.log("Error = " + error);
    },
    //----- End of Timo's Latest Code - Oct 2, 1:20pm -----//
    getGeoInfo: function () {
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
    },
    onGeoSuccess: function (position) {
        inputFirstName2.value = "";
        inputLastName2.value = "";
        inputPhoneNum2.value = "";
        inputEmail2.value = "";
        inputStreetAddress2.value = "";
        inputCity2.value = "";
        inputState2.value = "";

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var request = XMLHttpRequest();
        request.open("GET", "http://open.mapquestapi.com/geocoding/v1/reverse?" +
            "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + latitude + "," + longitude, true);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 0) {
                    var currentLocation = JSON.parse(request.responseText);
                    //console.log("CurrentLocation" + currentLocation.results[0].locations[0].adminArea5);

                    var geoStreet = currentLocation.results[0].locations[0].street;
                    inputStreetAddress2.value = geoStreet;
                    var geoCity = currentLocation.results[0].locations[0].adminArea5;
                    inputCity2.value = geoCity;
                    var getState = currentLocation.results[0].locations[0].adminArea3;
                    inputState2.value = getState;
                }
            }
        }

        request.send();
    },
    addContact: function () {
        var firstNameToAdd = inputFirstName2.value; // First Name Input
        var lastNameToAdd = inputLastName2.value; // Last Name Input
        var phoneToAdd = inputPhoneNum2.value; // Phone Input
        var emailToAdd = inputEmail2.value; // Email Input | Not Working
        var streetAddressToAdd = inputStreetAddress2.value; // Street Address Input | Not Working
        var cityToAdd = inputCity2.value; // City Input 
        var stateToAdd = inputState2.value; // State Input

        // Create a New Contact
        var contact = navigator.contacts.create();
        contact.displayName = firstNameToAdd + " " + lastNameToAdd;

        // Add Name Fields To Contacts
        var name = new ContactName();
        name.givenName = firstNameToAdd;
        name.familyName = lastNameToAdd;
        contact.name = name;

        // Add Address to Contacts under Formatted Option
        var addresses = [];
        addresses[0] = new ContactAddress();
        addresses[0].pref = true;
        addresses[0].type = "home";
        addresses[0].formatted = inputStreetAddress2.value + ", " + inputCity2.value + ", " + inputState2.value;
        addresses[0].streetAddress = inputStreetAddress2.value;
        addresses[0].locality = inputCity2.value;
        addresses[0].country = inputState2.value;
        contact.addresses = addresses;

        // Add Phone Number Input to Contact
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', phoneToAdd, true);
        contact.phoneNumbers = phoneNumbers;

        // Add Emails Input to Contact
        var emails = [];
        emails[0] = new ContactField('home', emailToAdd, true);
        contact.emails = emails;

        contact.save(app.onSaveSuccess, app.onSaveError);
    },
    onSaveSuccess: function (contact) {
        var contacts = document.querySelector(".contacts");
        contacts.innerHTML = "";

        app.getContacts();
    },
    onSaveError: function (contactError) {
        alert("Error = " + contactError);
    },
};

(function init() {
    app.initialize();
})();


// TODO: Check the 'online' and 'offline' listener
// Do something with the Add button inside the editContactPage and addContactPage
// Add postal code to each contacts