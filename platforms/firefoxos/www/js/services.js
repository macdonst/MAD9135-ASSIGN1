angular.module('CollarAppSrvs', [])

/**
 * Contacts service
 */
 .service('contactSrv', function($http,$state) {
    var initStatus = false;
    var selectedContact;

    this.detectConnection = function() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';

        alert('Connection type: ' + states[networkState]);
        return networkState;
    };

    this.ifInited = function(){
        return initStatus;
    };

    this.stopInit = function(){
        initStatus = true;
    }

    this.setSelectedContact = function(contact){
        selectedContact = contact;
    };

    this.getSelectedContact = function(){
        return selectedContact;
    }

    this.addContact = function(data){
        var contact = navigator.contacts.create();
            contact.displayName = data.firstname + " " + data.lastname;
            var name = new ContactName();
            name.givenName = data.firstname;
            name.familyName = data.lastname;
            contact.name = name;

            var email = {};
                email.value = data.email;
                contact.emails = [];
                contact.emails.push(email);

                var phone = {};
                phone.value = data.phone;
                contact.phoneNumbers = [];
                contact.phoneNumbers.push(phone);

                contact.addresses = [];
                var address = new ContactAddress();
                address.streetAddress = data.street;
                address.locality = data.city;
                address.region = data.state;

                contact.addresses.push(address);


            contact.save(function(){
                console.log('saved');
                $state.go('contacts');
            }, function(){
                console.log('error');
        });
    }


    });



    // this.initAllOffline = function() {
    //     return contactSrv.getAllDeviceContacts();
    // };

    // this.setSelectedContact = function(contact) {
    //     selectedContact = contact;
    // };

    // this.getSelectedContact = function() {
    //     return selectedContact;
    // };






// var currentContactId;

// function onCreatePhoneContactSuccess() {

// }

// function onCreatePhoneContactError() {

// }

// function onGetPhoneContactsSuccess(contacts) {
//     for (var i = 0; i < contacts.length; i++) {
//         console.log(contacts[i]);
//         //                for (var j = 0; j < contacts[i].addresses.length; j++) {
//         //                    alert("Pref: " + contacts[i].addresses[j].pref + "\n" +
//         //                        "Type: " + contacts[i].addresses[j].type + "\n" +
//         //                        "Formatted: " + contacts[i].addresses[j].formatted + "\n" +
//         //                        "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
//         //                        "Locality: " + contacts[i].addresses[j].locality + "\n" +
//         //                        "Region: " + contacts[i].addresses[j].region + "\n" +
//         //                        "Postal Code: " + contacts[i].addresses[j].postalCode + "\n" +
//         //                        "Country: " + contacts[i].addresses[j].country);
//         //                }
//     }
// };

// function onGetPhoneContactsError(contactError) {
//     alert('onError!');
// };

// return {
//     getAll: function() {
//         return contacts;
//     },
//     initAll: function(downloadedContacts) {
//         contacts = downloadedContacts;

//     },
//     setSelectedContact: function(contact) {
//         selectedContact = contact;
//     },
//     getSelectedContact: function() {
//         return selectedContact;
//     },
//     updateContact: function(newContent, id) {
//         var onSuccess = function() {
//             alert("Save Success");
//         };
//         var onError = function(contactError) {
//             alert("Error = " + contactError.code);
//         };
//         var contact = navigator.contacts.create();
//         contact.displayName = "Guy Incognito";
//         var name = new ContactName();
//         name.givenName = "Guy";
//         name.familyName = "Incognito";
//         contact.name = name;
//         contact.save(onSuccess, onError);
//     }









//     addContact: function(contact) {
//         if (contacts) {
//             contacts.push(contact);
//         } else {
//             contacts = {};
//             contacts.push(contact);
//         }
//     },
//     changeContact: function(id, contact) {
//         contacts[id] = contact;
//     },

//     getContact: function(contactId) {
//         // Simple index lookup
//         return contacts[contactId];
//     },
//     setCurrentContact: function(id) {
//         currentContactId = id;
//     },
//     getCurrentContact: function() {
//         return currentContactId;
//     },
//     initContact: function(downloadedContacts) {
//         contacts = downloadedContacts;

//     },

//     getPhoneContacts: function() {
//         // get all contacts from the phone
//         var options = new ContactFindOptions();
//         options.filter = "";
//         var filter = ["displayName", "addresses"];
//         navigator.contacts.find(filter, onGetPhoneContactsSuccess, onGetPhoneContactsError, options);
//     },

//     createPhoneContact: function() {
//         // create a new contact object
//         var contact = navigator.contacts.create();
//         contact.displayName = "Plumber";
//         contact.nickname = "Plumber"; // specify both to support all devices

//         // populate some fields
//         var name = new ContactName();
//         name.givenName = "Jane";
//         name.familyName = "Doe";
//         contact.name = name;

//         var phoneNumbers = [];
//         phoneNumbers[0] = new ContactField('work', '212-555-1234', true);
//         contact.phoneNumbers = phoneNumbers;

//         var emails = [];
//         emails[0] = new ContactField('work', 'jane@gmail.com', true);
//         contact.emails = emails;

//         var addresses = [];
//         addresses[0] = new ContactAddress(true, "home", true, "123 main street", "Ottawa", "Ontario", "K2E4R5");
//         contact.addresses = addresses;

//         // save to device
//         contact.save(onCreatePhoneContactSuccess, onCreatePhoneContactError);
//     }


// }
