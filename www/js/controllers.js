var CollarAppCtrls = angular.module('CollarAppCtrls', []);

    CollarAppCtrls.controller('rootCtrl', function($scope, $state, httpRaw, contactSrv) {
        $scope.$state = $state;



        function init(httpRaw) {

            if (httpRaw.length == 0) {
                // call find contacts
                navigator.contacts.find(["*"], function(data) {
                    console.log('initDone');
                    console.log(data);
                    //init completed.
                    contactSrv.stopInit();
                    $scope.contacts = data;
                }, function(error) {
                    console.log(error);
                });
            } else {
                var rawContact = httpRaw.pop();
                var contact = navigator.contacts.create();
                contact.displayName = rawContact.firstname + " " + rawContact.lastname;
                var name = new ContactName();
                name.givenName = rawContact.firstname;
                name.familyName = rawContact.lastname;
                contact.name = name;

                var email = {};
                email.value = rawContact.email;
                contact.emails = [];
                contact.emails.push(email);

                var phone = {};
                phone.value = rawContact.phone;
                contact.phoneNumbers = [];
                contact.phoneNumbers.push(phone);

                contact.addresses = [];
                var address = new ContactAddress();
                address.streetAddress = rawContact.street;
                address.locality = rawContact.city;
                address.region = rawContact.state;

                contact.addresses.push(address);
                contact.save(function() {
                    init(httpRaw);
                }, function() {
                    console.log('error');
                });
            }
        };

        if(contactSrv.ifInited()){
            navigator.contacts.find(["*"], function(data) {
                    $scope.contacts = data;
                }, function(error) {
                    console.log(error);
                });
        }else{
            init(httpRaw);
        }
        
        $scope.goDetails = function(contact) {
            contactSrv.setSelectedContact(contact);
            $state.go('details');
        };

    });

    CollarAppCtrls.controller('detailsCtrl', function($scope, $state, selectedContact, contactSrv) {
        $scope.selectedContact = selectedContact;
        $scope.$state = $state;

        $scope.saveEdit = function() {
            //contactSrv.updateContact($scope.editingContact, $scope.selectedContact.id);
            var data = $scope.selectedContact;
            console.log(data);
            var contact = navigator.contacts.create();
            contact.id = data.id;
            contact.displayName = data.displayName;
            var name = new ContactName();
            name.givenName = data.name.givenName;
            name.familyName = data.name.familyName;
            contact.name = name;

            var email = {};
            email.value = data.emails[0].value;
            contact.emails = [];
            contact.emails.push(email);

            var phone = {};
            phone.value = data.phoneNumbers[0].value;
            contact.phoneNumbers = [];
            contact.phoneNumbers.push(phone);

            contact.addresses = [];
            var address = new ContactAddress();
            address.streetAddress = data.addresses[0].streetAddress;
            address.locality = data.addresses[0].locality;
            address.region = data.addresses[0].region;

            contact.addresses.push(address);
            contact.save(function() {
                console.log('changes saved');
            }, function() {
                console.log('error');
            });
        };

    });

    CollarAppCtrls.controller('addCtrl', function($scope, $state, contactSrv) {
        //Contacts.fetchContacts();
        $scope.$state = $state;

        function handler() {
            if (xmlhttpGeo.readyState == 4 /* complete */ ) {
                if (xmlhttpGeo.status == 200) {
                    myFunction(xmlhttpGeo.responseText);
                }
            }
        };

        function myFunction(response) {
            var result = JSON.parse(response);
            $scope.contact = {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                street: result.results[0].locations[0].street,
                city: result.results[0].locations[0].adminArea5,
                state: result.results[0].locations[0].adminArea1
            };
        };

        function errorCallback(error) {
            alert(error.code);
        };

        function successCallback(position) {

            var positionlan = "http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" + position.coords.latitude + "," + position.coords.longitude

            xmlhttpGeo = new XMLHttpRequest();
            xmlhttpGeo.open("GET", positionlan, true);
            xmlhttpGeo.onreadystatechange = handler;
            xmlhttpGeo.send();
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        $scope.addContact = function() {
            console.log($scope.contact);
            contactSrv.addContact($scope.contact);
        };
    });
