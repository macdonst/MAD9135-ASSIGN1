//Wait for device to be ready
document.addEventListener("deviceready", onDeviceReady, false);
//Used to manipulate wrapper css
var wrapper;

var pages;
//Used to manipulate the app pages 
var pageContainers;
//Used to manipulate the right Image in the header (plus / checkmark)
var rightImg;
//Used to manipulate the left Image in the header (back button;only used on contact form page)
var backDiv;

var buttons;
//
var extraButtons;

var addDivImg;

var contactToDelete;

var button_clicked = function(e) {
    e.preventDefault();
    var data = this.dataset.page;

    if (this.id == "addDiv" && data == "1") {
        hTitle.innerHTML = "Contact King";
        getFormData();
        changePage(data);
    } else if (this.id == "backDiv") {
        hTitle.innerHTML = "Contact King";
        clearContactForm();
        changePage(data);
    } else {
        hTitle.innerHTML = "Add Contact";
        getLocation();
        changePage(data);
    }
};

function editContact(data) {
    //alert (data.dataset.id);
    var contactObject = {
        id: null,
        givenName: null,
        familyName: null,
        addresses: [{
            type: null,
            streetAddress: null,
            postalCode: null,
            locality: null,
            country: null
        }],
        emails: [{
            type: null,
            value: null
        }],
        phoneNumbers: [{
            type: null,
            value: null
        }],
        organizations: [{
            name: null
        }],
        note: null,
        birthday: null
    };

    contactObject.id = data.dataset.id;
    contactObject.givenName = data.dataset.givenname;
    contactObject.familyName = data.dataset.familyname;

    var addressAmount = parseInt(data.dataset.addresslength);
    for (var h = 1; h < addressAmount; h++) {
        contactObject.addresses.push({
            type: null,
            streetAddress: null,
            postalCode: null,
            locality: null,
            country: null
        });
    }

    if (addressAmount > 1) {

        for (var b = 0; b < addressAmount; b++) {
            var temp1 = ['addressestype' + b, 'addressstreetaddress' + b, 'addresspostal' + b, 'addresslocality' + b, 'addresscountry' + b];
            contactObject.addresses[b].type = data.dataset[temp1[0]];
            contactObject.addresses[b].streetAddress = data.dataset[temp1[1]];
            contactObject.addresses[b].postalCode = data.dataset[temp1[2]];
            contactObject.addresses[b].locality = data.dataset[temp1[3]];
            contactObject.addresses[b].country = data.dataset[temp1[4]];
        }

    } else {
        contactObject.addresses[0].type = data.dataset.addresstype0;
        contactObject.addresses[0].streetAddress = data.dataset.addressstreetaddress0;
        contactObject.addresses[0].postalCode = data.dataset.addresspostal0;
        contactObject.addresses[0].locality = data.dataset.addresslocality0;
        contactObject.addresses[0].country = data.dataset.addresscountry0;
    }

    var emailsAmount = parseInt(data.dataset.emailslength);
    for (var l = 1; l < emailsAmount; l++) {
        contactObject.emails.push({
            type: null,
            value: null
        });
    }

    if (emailsAmount > 1) {

        for (var o = 0; o < emailsAmount; o++) {
            var temp2 = ['emailstype' + o, 'emailsvalue' + o];
            contactObject.emails[o].type = data.dataset[temp2[0]];
            contactObject.emails[o].value = data.dataset[temp2[1]];
        }

    } else {
        contactObject.emails[0].type = data.dataset.emailstype0;
        contactObject.emails[0].value = data.dataset.emailsvalue0;

    }

    var phoneNumbersAmount = parseInt(data.dataset.phonenumberslength);
    for (var t = 1; t < phoneNumbersAmount; t++) {
        contactObject.phoneNumbers.push({
            type: null,
            value: null
        });
    }

    if (phoneNumbersAmount > 1) {

        for (var w = 0; w < phoneNumbersAmount; w++) {
            var temp3 = ['phonenumberstype' + w, 'phonenumbersvalue' + w];
            contactObject.phoneNumbers[w].type = data.dataset[temp3[0]];
            contactObject.phoneNumbers[w].value = data.dataset[temp3[1]];
        }

    } else {
        contactObject.phoneNumbers[0].type = data.dataset.phonenumberstype0;
        contactObject.phoneNumbers[0].value = data.dataset.phonenumbersvalue0;

    }

    contactObject.organizations[0] = data.dataset.organizations;
    contactObject.note = data.dataset.note;
    contactObject.birthday = data.dataset.birthday;


    inputFormData(contactObject);

}

function nullChanger (v) {

 if (v == "null") {
    return "";
 }else {
    return v;
 }

}


function nullChanger2 (v) {

 if (v == "null" || v === null) {
    return "";
 }else {
    return ('"' + charReplace(v) + '"');
 }

}

function inputFormData(contactObject) {
    var contactForm = document.contactForm;
    contactForm.dataset.identity = contactObject.id;

    contactForm.firstname.value = nullChanger(contactObject.givenName);
    contactForm.lastname.value = nullChanger(contactObject.familyName);

    if (contactObject.addresses.length > 1) {
        contactForm.addressestype0.value = nullChanger(contactObject.addresses[0].type);
        contactForm.street0.value = nullChanger(contactObject.addresses[0].streetAddress);
        contactForm.zipcode0.value = nullChanger(contactObject.addresses[0].postalCode);
        contactForm.city0.value = nullChanger(contactObject.addresses[0].locality);
        contactForm.country0.value = nullChanger(contactObject.addresses[0].country);
        editContactAddExtra(contactObject, "2", contactObject.addresses.length);

    }else {
        contactForm.addressestype0.value = nullChanger(contactObject.addresses[0].type);
        contactForm.street0.value = nullChanger(contactObject.addresses[0].streetAddress);
        contactForm.zipcode0.value = nullChanger(contactObject.addresses[0].postalCode);
        contactForm.city0.value = nullChanger(contactObject.addresses[0].locality);
        contactForm.country0.value = nullChanger(contactObject.addresses[0].country);
    }
    
    if (contactObject.emails.length > 1) {
        contactForm.emailtype0.value = nullChanger(contactObject.emails[0].type);
        contactForm.email0.value = nullChanger(contactObject.emails[0].value);
        editContactAddExtra(contactObject, "1", contactObject.emails.length);
    }else {
        contactForm.emailtype0.value = nullChanger(contactObject.emails[0].type);
        contactForm.email0.value = nullChanger(contactObject.emails[0].value);
    }

    if (contactObject.phoneNumbers.length > 1) {
        contactForm.numbertype0.value = nullChanger(contactObject.phoneNumbers[0].type);
        contactForm.number0.value = nullChanger(contactObject.phoneNumbers[0].value);
        editContactAddExtra(contactObject, "0", contactObject.phoneNumbers.length);
    }else {
        contactForm.numbertype0.value = nullChanger(contactObject.phoneNumbers[0].type);
        contactForm.number0.value = nullChanger(contactObject.phoneNumbers[0].value);
    }

    contactForm.company.value = nullChanger(contactObject.organizations[0]);
    contactForm.comment.value = nullChanger(contactObject.note);
    contactForm.birthday.value = nullChanger(contactObject.birthday);

    /* OLD
    hTitle.innerHTML = "Edit Contact";
    changePage ("0");
    */

    //New
    contactToDelete = contactObject.id; 
    addDeleteButton();
    changePage ("0");

}

function addDeleteButton () {
    var comment = document.querySelector(".comment");
    
    comment.insertAdjacentHTML('afterend', '<div class="delete"><button id="deleteButton" class="addExtra" style="color:darkred;text-align:center;" >Delete Contact</button></div>');
    document.getElementById("deleteButton").addEventListener('click', deleteButton, false);
}
function deleteButton(ev){
    ev.preventDefault();
    
    var contact = navigator.contacts.create();
        contact.id = contactToDelete;
        contact.remove(onRemoveSuccess,onError);
    
}

function getLocation(){
        var success = function(position) {
            getAddress(position);
        };
        var failure = function() {
            console.log("error");
        };
        navigator.geolocation.getCurrentPosition(success, failure, {
            enableHighAccuracy: true
        });
}

function getAddress(position){
        var contactForm = document.contactForm;
        var request = XMLHttpRequest();
        request.open("GET", 
            "http://open.mapquestapi.com/geocoding/v1/reverse?key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
            position.coords.latitude + "," + position.coords.longitude, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status === 0) {
                    var obj = JSON.parse(request.responseText);
                    var city =  obj.results[0].locations[0].adminArea5;
                    var street = obj.results[0].locations[0].street;
                    var postalCode = obj.results[0].locations[0].postalCode;
                    var country = obj.results[0].locations[0].adminArea1;
                    //var city = document.getElementById("city");
                    
                    contactForm.addressestype0.value = "Current";
                    contactForm.street0.value = street;
                    contactForm.zipcode0.value = postalCode;
                    contactForm.city0.value = city;
                    contactForm.country0.value = country;
                }
            }
        };
        request.send();
}

function getFormData() {

    var contactForm = document.contactForm;
    var mainCounter = 0;
    var addressesCounter = 0;
    var emailsCounter = 0;
    var phoneNumbersCounter = 0;

    var contactObject = {
        id: null,
        givenName: null,
        familyName: null,
        addresses: [{
            type: null,
            streetAddress: null,
            postalCode: null,
            locality: null,
            country: null
        }],
        emails: [{
            type: null,
            value: null
        }],
        phoneNumbers: [{
            type: null,
            value: null
        }],
        organizations: [{
            name: null
        }],
        note: null,
        birthday: null
    };

    contactObject.id = contactForm.dataset.identity;
    contactObject.givenName = contactForm.firstname.value;
    checkEmpty(contactForm.firstname.value);
    contactObject.familyName = contactForm.lastname.value;
    checkEmpty(contactForm.lastname.value);

    var addressAmount = parseInt(contactForm.country0.dataset.amount);
    for (var h = 1; h < addressAmount; h++) {
        contactObject.addresses.push({
            type: null,
            streetAddress: null,
            postalCode: null,
            locality: null,
            country: null
        });
    }

    if (addressAmount > 1) {

        for (var b = 0; b < addressAmount; b++) {
            addressesCounter = 0;
            var temp1 = ['addressestype' + b, 'street' + b, 'zipcode' + b, 'city' + b, 'country' + b];
            contactObject.addresses[b].type = contactForm[temp1[0]].value;
            
            contactObject.addresses[b].streetAddress = checkEmptyAddresses(contactForm[temp1[1]].value);
            contactObject.addresses[b].postalCode = checkEmptyAddresses(contactForm[temp1[2]].value);
            contactObject.addresses[b].locality = checkEmptyAddresses(contactForm[temp1[3]].value);
            contactObject.addresses[b].country = checkEmptyAddresses(contactForm[temp1[4]].value);
            
            if (b > 0) {
               if (addressesCounter === 0) {
                contactObject.addresses.splice (b, 1);
                } 
            }
            
        }

    } else {
        contactObject.addresses[0].type = contactForm.addressestype0.value;
        contactObject.addresses[0].streetAddress = checkEmptyAddresses(contactForm.street0.value);
        contactObject.addresses[0].postalCode = checkEmptyAddresses(contactForm.zipcode0.value);
        contactObject.addresses[0].locality = checkEmptyAddresses(contactForm.city0.value);
        contactObject.addresses[0].country = checkEmptyAddresses(contactForm.country0.value);
    }

    var emailsAmount = parseInt(contactForm.email0.dataset.amount);
    for (var l = 1; l < emailsAmount; l++) {
        contactObject.emails.push({
            type: null,
            value: null
        });
    }

    if (emailsAmount > 1) {

        for (var o = 0; o < emailsAmount; o++) {
            emailsCounter = 0;
            var temp2 = ['emailtype' + o, 'email' + o];
            contactObject.emails[o].type = contactForm[temp2[0]].value;
            contactObject.emails[o].value = checkEmptyEmails(contactForm[temp2[1]].value);

            if (o > 0) {
               if (emailsCounter === 0) {
                contactObject.emails.splice (o, 1);
                } 
            }
        }

    } else {
        contactObject.emails[0].type = contactForm.emailtype0.value;
        contactObject.emails[0].value = checkEmptyEmails(contactForm.email0.value);

    }

    var phoneNumbersAmount = parseInt(contactForm.number0.dataset.amount);
    for (var t = 1; t < phoneNumbersAmount; t++) {
        contactObject.phoneNumbers.push({
            type: null,
            value: null
        });
    }

    if (phoneNumbersAmount > 1) {

        for (var w = 0; w < phoneNumbersAmount; w++) {
            phoneNumbersCounter = 0;
            var temp3 = ['numbertype' + w, 'number' + w];
            contactObject.phoneNumbers[w].type = contactForm[temp3[0]].value;
            //alert (contactObject.phoneNumbers[w].type);
            contactObject.phoneNumbers[w].value = checkEmptyPhoneNumbers(contactForm[temp3[1]].value);

            if (w > 0) {
               if (phoneNumbersCounter === 0) {
                contactObject.phoneNumbers.splice (w, 1);
                } 
            }
        }

    } else {

        contactObject.phoneNumbers[0].type = contactForm.numbertype0.value;
        contactObject.phoneNumbers[0].value = checkEmptyPhoneNumbers(contactForm.number0.value);
    }

    contactObject.organizations[0] = contactForm.company.value;
    checkEmpty(contactForm.company.value);
    contactObject.note = contactForm.comment.value;
    checkEmpty(contactForm.comment.value);
    contactObject.birthday = contactForm.birthday.value;
    checkEmpty(contactForm.birthday.value);

    
    //Only save is if there is at least one input filled in inside the form
    if (mainCounter > 0) {
        individualSave(contactObject);
    }

    clearContactForm();


    function checkEmptyPhoneNumbers (a) {
        if (a === "" || a ==="null" || a === null) {
            return null;
        }else {
            phoneNumbersCounter ++;
            mainCounter ++;
            return a;
            
        }
    }

    function checkEmptyEmails (a) {
        if (a === "" || a ==="null" || a === null) {
            return null;
        }else {
            emailsCounter ++;
            mainCounter ++;
            return a;
            
        }
    }

    function checkEmptyAddresses (a) {
        if (a === "" || a ==="null" || a === null) {
            return null;
        }else {
            addressesCounter ++;
            mainCounter ++;
            return a;
            
        }
    }

    function checkEmpty (a) {
        if (a === "" || a ==="null" || a === null) {
        }else {
            mainCounter ++;
        }
    }

}
var contact_clicked = function(e) {
    e.preventDefault();
    var data = this;
    editContact(data);
};

var setClickEvents = function() {
    for (var i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener('click', button_clicked, false);
    }
    for (var j = 0; j < extraButtons.length; j++) {
        extraButtons[j].addEventListener('click', addExtra, false);
    }
};

var setContactListeners = function() {

    var contactsList = document.querySelectorAll('.contactsItems');
    for (var i = 0; i < contactsList.length; i++) {
        contactsList[i].addEventListener('click', contact_clicked, false);

    }
};

function changePage(switchPage) {

    if (switchPage == "1") {
        pages[0].style.display = "block";
        pages[1].style.display = "block";
        setTimeout(function() {
            pages[1].style.display = "none";
        }, 500);

        pageContainers[1].className = "";
        pageContainers[1].className = 'pages animation-slide-out-left';
        pageContainers[0].className = "";
        pageContainers[0].className = 'pages animation-slide-in-right';
        buttons[0].style.display = "none";
        buttons[1].dataset.page = "0";
        buttons[1].dataset.animation = "animation-slide-out-right";
        addDivImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGNJREFUeNrs1rENwCAMBdHvKHtlNbKZN3PCAiAMBRJ3vdErkGwpUUSUaKSJLm0WIECAAAECNNhdF2Vi7ukt38SbbmZus9t5Ye8PKvwhQIC2jCMfECBAgAABahz5yTnXKX0CDADFA02ENFlW2QAAAABJRU5ErkJggg==";
        buttons[1].style.display = "inline-block";
    } else if (switchPage == "0") {
        pages[1].style.display = "block";
        pages[0].style.display = "block";
        setTimeout(function() {
            pages[0].style.display = "none";
        }, 500);

        pageContainers[0].className = "";
        pageContainers[0].className = 'pages animation-slide-out-right';
        pageContainers[1].className = "";
        pageContainers[1].className = 'pages animation-slide-in-left';
        buttons[1].dataset.page = "1";
        buttons[1].dataset.animation = "animation-slide-out-left";
        addDivImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNrs2FENhDAMBuBJQMJJQMIknIQ5QsIknIRJQMJJOAm7NuGB5MjSQkubXP9kj2wfpKzLUopE/ji99wnGCuMDo3jF7VM84/wgAfHq4yyWuNoJcY2DNAvcQsRhbU5340rglHG4Uc/USR9CuKyBqxKfGxfcFlbBXaoJBg6TqW2nSRQuE1eokzbC3zUTX3QVxW0TXy5kNRyz/Rwimbiq3SN/kOq4k8jMfKZK7fzUBTFvk5MJE2nTXxlHI7vmz2j0dieTk0h6fzVA3otjIm1wDGRO1hmcVvxcWxwgfd2p7JC4oT/jCiwSiYzzFWAA4LFXPenyi00AAAAASUVORK5CYII=";
        buttons[0].style.display = "inline-block";
    }
}



function onDeviceReady() {
   //localStorage.removeItem("simonServer");
    if (typeof(Storage) !== "undefined") {
        if (localStorage.simonServer) {
            //Do nothing
        } else {
            localStorage.simonServer = false;
        }
    } else {
        // Sorry! No Web Storage support..
    }
    //alert (localStorage.simonServer);
    rightImg = document.querySelector('#rightImg');
    backDiv = document.querySelector('#backDiv');
    pages = document.querySelectorAll('[data-role=page]');
    pageContainers = document.querySelectorAll('[data-role=page] .pages');
    buttons = document.querySelectorAll('.cButtons');
    hTitle = document.querySelector("#hTitle");
    extraButtons = document.querySelectorAll('.addExtra');
    addDivImg = document.querySelector("#addDivImg");
    //console.log (addDivImg);
    setClickEvents();



    wrapper = document.getElementById("wrapper");
    //pages[0].innerHTML = "<div class='loading'><img src='img/loader1.gif' /><p>Loading Contacts...</p></div>";
    document.addEventListener("online", appOnline, false);
    document.addEventListener("offline", appOffline, false);

    findContacts();
    //checkConnection();
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);

    //This function simulates the device receiving and losing internet connection every 5 seconds
    var onlineOffline = true;
    setInterval(function() {
        if (onlineOffline) {
            sim.goOnline();
            onlineOffline = false;
        } else {
            sim.goOffline();
            onlineOffline = true;
        }
    }, 5000);
}

function addExtra (ev) {
    ev.preventDefault();
    
    var increment;
    var beforePhone = document.querySelector("#number0");
    var parentPhone;
    
    var beforeEmail = document.querySelector("#email0");
    var parentEmail;

    var beforeAddress = document.querySelector("#country0");
    var parentAddress;

    var html;

    if (this.dataset.extra == '0'){
        increment = parseInt(beforePhone.dataset.amount);
        html = '<div class="clearIt2"><select name="numbertype' + increment + '"><option value="Mobile" selected>Mobile</option><option value="Home">Home</option><option value="Work">Work</option><option value="Personal">Personal</option></select><input type="tel" id="number' + increment + '" name="number' + increment + '" placeholder="Phone" value=""></div>';

        if (increment == 1) {
            parentPhone = beforePhone.parentNode;
        }else {
            var tempBeforePhone = document.querySelectorAll(".phoneNumbers .clearIt2");
            parentPhone = tempBeforePhone[tempBeforePhone.length - 1];
        }
        parentPhone.insertAdjacentHTML('afterend', html);
        beforePhone.dataset.amount = increment + 1;

    }else if (this.dataset.extra == '1') {
        increment = parseInt(beforeEmail.dataset.amount);
        html = '<div class="clearIt2"><select name="emailtype' + increment + '"><option value="Personal" selected>Personal</option><option value="Home">Home</option><option value="Work">Work</option></select><input type="email" id="email' + increment + '" name="email' + increment + '" placeholder="Email" value=""></div>';

        if (increment == 1) {
            parentEmail = beforeEmail.parentNode;
        }else {
            var tempBeforeEmail = document.querySelectorAll(".emails .clearIt2");
            parentEmail = tempBeforeEmail[tempBeforeEmail.length - 1];
        }
        parentEmail.insertAdjacentHTML('afterend', html);
        beforeEmail.dataset.amount = increment + 1;

    }else if (this.dataset.extra == '2') {
        increment = parseInt(beforeAddress.dataset.amount);
        html = '<div class="clearIt2"><select name="addressestype' + increment + '"><option value="Home" selected>Home</option><option value="Work">Work</option><option value="Cottage">Cottage</option></select><input type="text" class="street" id="street' + increment + '" name="street' + increment + '" placeholder="Street" value=""><input type="text" class="zipcode" id="zipcode' + increment + '" name="zipcode' + increment + '" placeholder="Zip code" value=""><input type="text" class="city" id="city' + increment + '" name="city' + increment + '" placeholder="City" value=""><input type="text" class="country" id="country' + increment + '" name="country' + increment + '" placeholder="Country" value=""></div>';
        
        if (increment == 1) {
            parentAddress = beforeAddress.parentNode;
        }else {
            var tempBeforeAddress = document.querySelectorAll(".addresses .clearIt2");
            parentAddress = tempBeforeAddress[tempBeforeAddress.length - 1];
        }
        parentAddress.insertAdjacentHTML('afterend', html);
        beforeAddress.dataset.amount = increment + 1;
    }

}

function editContactAddExtra (contactObject, whatEle, amount) {
    
    var increment;
    var beforePhone = document.querySelector("#number0");
    var parentPhone = beforePhone.parentNode; 
    
    var beforeEmail = document.querySelector("#email0");
    var parentEmail = beforeEmail.parentNode;

    var beforeAddress = document.querySelector("#country0");
    var parentAddress = beforeAddress.parentNode;

    var html = "";

    if (whatEle == '0'){
        increment = parseInt(beforePhone.dataset.amount);

        for (var h=1;h<amount;h++) {
            html = '<div class="clearIt2"><select name="numbertype' + increment + '"><option value="Mobile">Mobile</option><option value="Home">Home</option><option value="Work">Work</option><option value="Personal">Personal</option></select><input type="tel" id="number' + increment + '" name="number' + increment + '" placeholder="Phone" value=' + nullChanger2(contactObject.phoneNumbers[h].value) + '></div>';
            increment++;
        }

        parentPhone.insertAdjacentHTML('afterend', html);
        beforePhone.dataset.amount = increment;

    }else if (whatEle == '1') {
        increment = parseInt(beforeEmail.dataset.amount);
        for (var j=1;j<amount;j++) {
            html = '<div class="clearIt2"><select name="emailtype' + increment + '"><option value="Personal" selected>Personal</option><option value="Home">Home</option><option value="Work">Work</option></select><input type="email" id="email' + increment + '" name="email' + increment + '" placeholder="Email" value=' + nullChanger2(contactObject.emails[j].value) + '></div>';
            increment++;
        }

        parentEmail.insertAdjacentHTML('afterend', html);
        beforeEmail.dataset.amount = increment;

    }else if (whatEle == '2') {

        increment = parseInt(beforeAddress.dataset.amount);

        for (var i=1;i<amount-1;i++) {
            html += '<div class="clearIt2"><select name="addressestype' + increment + '"><option value="Home" selected>Home</option><option value="Work">Work</option><option value="Cottage">Cottage</option></select><input type="text" class="street" id="street' + increment + '" name="street' + increment + '" placeholder="Street" value='+ nullChanger2(contactObject.addresses[i].streetAddress) +'><input type="text" class="zipcode" id="zipcode' + increment + '" name="zipcode' + increment + '" placeholder="Zip code" value='+nullChanger2(contactObject.addresses[i].postalCode)+'><input type="text" class="city" id="city' + increment + '" name="city' + increment + '" placeholder="City" value='+nullChanger2(contactObject.addresses[i].locality)+'><input type="text" class="country" id="country' + increment + '" name="country' + increment + '" placeholder="Country" value='+nullChanger2(contactObject.addresses[i].country)+'></div>';
            increment++;
        }
        //console.log (html);
        parentAddress.insertAdjacentHTML('afterend', html);
        beforeAddress.dataset.amount = increment;
    }

}

function findContacts() {

    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;

    navigator.contacts.find(["*"], getDeviceContacts, failContacts, options);
}

function charReplace(a) {
    return String(a).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getDeviceContacts(contacts) {

    pageContainers[0].style.height = '100vh';
    pageContainers[0].innerHTML = "<div class='loading'><img src='img/loader1.gif' /><p>Loading Contacts...</p></div>";

    var contactsArray = [];
    var contactCounter = 0;

    for (var i in contacts) {

        var contactObject = {
            id: null,
            givenName: null,
            familyName: null,
            addresses: [{
                type: null,
                streetAddress: null,
                postalCode: null,
                locality: null,
                country: null
            }],
            emails: [{
                type: null,
                value: null
            }],
            phoneNumbers: [{
                type: null,
                value: null
            }],
            organizations: [{
                name: null
            }],
            note: null,
            birthday: null
        };

        contactObject.id = contacts[i].id;

        if (contacts[i].name.givenName !== null) {
            contactObject.givenName = charReplace(contacts[i].name.givenName);
        }

        if (contacts[i].name.familyName !== null) {
            contactObject.familyName = charReplace(contacts[i].name.familyName);
        }

        if (contacts[i].addresses) {
            //console.log (contacts[i]);
            for (var h = 1; h < contacts[i].addresses.length; h++) {
                contactObject.addresses.push({
                    type: null,
                    streetAddress: null,
                    postalCode: null,
                    locality: null,
                    state: null
                });
            }

            for (var j in contacts[i].addresses) {
                contactObject.addresses[j].type = charReplace(contacts[i].addresses[j].type);
                contactObject.addresses[j].streetAddress = charReplace(contacts[i].addresses[j].streetAddress);
                contactObject.addresses[j].postalCode = charReplace(contacts[i].addresses[j].postalCode);
                contactObject.addresses[j].locality = charReplace(contacts[i].addresses[j].locality);
                contactObject.addresses[j].country = charReplace(contacts[i].addresses[j].country);
            }

        }

        if (contacts[i].emails) {

            for (var l = 1; l < contacts[i].emails.length; l++) {
                contactObject.emails.push({
                    type: null,
                    value: null
                });
            }

            for (var o in contacts[i].emails) {
                contactObject.emails[o].type = charReplace(contacts[i].emails[o].type);
                contactObject.emails[o].value = charReplace(contacts[i].emails[o].value);
            }

        }

        if (contacts[i].phoneNumbers) {

            for (var u = 1; u < contacts[i].phoneNumbers.length; u++) {
                contactObject.phoneNumbers.push({
                    type: null,
                    value: null
                });
            }

            for (var y in contacts[i].phoneNumbers) {
                contactObject.phoneNumbers[y].type = charReplace(contacts[i].phoneNumbers[y].type);
                contactObject.phoneNumbers[y].value = charReplace(contacts[i].phoneNumbers[y].value);
            }

        }

        if (contacts[i].organizations) {

            for (var t in contacts[i].organizations) {
                contactObject.organizations[t].name = charReplace(contacts[i].organizations[t].name);
            }

        }

        if (contacts[i].note !== null) {
            contactObject.note = charReplace(contacts[i].note);
        }

        if (contacts[i].birthday !== null) {
            contactObject.birthday = contacts[i].birthday;
        }

        //console.log(contacts[i]);
        contactsArray[contactCounter] = contactObject;
        contactCounter++;
    }

    if (contactsArray.length === 0) {
        //emptyContactList();
    } else {
        outputContacts(contactsArray);
    }
}

/* OLD
function emptyContactList() {
    setTimeout(function() {
        pageContainers[0].innerHTML = '<div id="noContacts"><h3>There are no contacts currently on your device</h3><p>Would you like me to search Simons server for some contacts? Or would you like to add a contact?<div class="noContactButtons"><button>Search Simon</button><button>Add Contact</button></div></div></div>';
    }, 5000);
}*/
function emptyContactList() {
    
    setTimeout(function() {
        pageContainers[0].style.height = '100vh';
        pageContainers[0].innerHTML = "";
        pageContainers[0].insertAdjacentHTML('beforeend', '<div id="noContacts"><h3>There are no contacts currently on your device</h3><p>Would you like me to search Simons server for some contacts? Or would you like to add a contact?<div class="noContactButtons"><button id="searchSimonButton">Search Simon</button><button id="addContactButton" data-page="0">Add Contact</button></div></div></div>');
        //Add click listener for Search Simon dandandan
        //Add click listener for Add Contact
        //class="addExtra" data-extra="0"
        document.getElementById('addContactButton').addEventListener('click', button_clicked, false);
        document.getElementById('searchSimonButton').addEventListener('click', getContactInfo, false);
        
    }, 5000);
}


function failContacts() {
    setTimeout(function() {
        pageContainers[0].innerHTML = "";
        pageContainers[0].insertAdjacentHTML('beforeend', '<div id="noContacts"><h3>You must allow Contact King accesst to your contacts Edit it in your settings</h3><p>Would you like me to search Simons server for some contacts? Or would you like to add a contact?<div class="noContactButtons"><button id="searchSimonButton">Search Simon</button><button id="addContactButton" data-page="0">Add Contact</button></div></div></div>');
        //Add click listener for Search Simon dandandan
        //Add click listener for Add Contact
        //class="addExtra" data-extra="0"
        document.getElementById('addContactButton').addEventListener('click', button_clicked, false);
        document.getElementById('searchSimonButton').addEventListener('click', getContactInfo, false);
        
    }, 5000);
}

function outputContacts(contactsArray) {

    //removeAllContacts(contactsArray);

    var html = '<div class="contacts"><ul class="contactsList">';

    for (var i = 0; i < contactsArray.length; i++) {

        html += '<li class="contactsItems" data-id="' + contactsArray[i].id + '" data-givenname="' + contactsArray[i].givenName + '" data-familyname="' + contactsArray[i].familyName + '"';

        var addressLength = contactsArray[i].addresses.length;
        for (var h = 0; h < addressLength; h++) {
            html += ' data-addresslength="' + addressLength + '" data-addresstype' + h + '="' + contactsArray[i].addresses[h].type + '" data-addressstreetaddress' + h + '="' + contactsArray[i].addresses[h].streetAddress + '" data-addresspostal' + h + '="' + contactsArray[i].addresses[h].postalCode + '" data-addresslocality' + h + '="' + contactsArray[i].addresses[h].locality + '" data-addresscountry' + h + '="' + contactsArray[i].addresses[h].country + '"';
        }

        var emailsLength = contactsArray[i].emails.length;
        for (var j = 0; j < emailsLength; j++) {
            html += ' data-emailslength="' + emailsLength + '" data-emailstype' + j + '="' + contactsArray[i].emails[j].type + '" data-emailsvalue' + j + '="' + contactsArray[i].emails[j].value + '"';
        }

        var phoneNumbersLength = contactsArray[i].phoneNumbers.length;
        //alert (phoneNumbersLength);
        for (var k = 0; k < phoneNumbersLength; k++) {
            html += ' data-phonenumberslength="' + phoneNumbersLength + '" data-phoneNumberstype' + k + '="' + contactsArray[i].phoneNumbers[k].type + '" data-phonenumbersvalue' + k + '="' + contactsArray[i].phoneNumbers[k].value + '"';
        }

        html += ' data-organizations="' + contactsArray[i].organizations[0].name + '" data-note="' + contactsArray[i].note + '" data-birthday="' + contactsArray[i].birthday + '"';

        html += '>' + getName(contactsArray[i]) + '</li>';

    }

    html += '</ul></div>';
    pageContainers[0].style.height = 'auto';
    pageContainers[0].innerHTML = html;

    
    setContactListeners();

}

function removeAllContacts(contactsArray) {

    for (var i = 0; i < contactsArray.length; i++) {
        var contact = navigator.contacts.create();
        contact.id = contactsArray[i].id;
        contact.remove(onRemoveSuccess,onError);
    }

}

function onRemoveSuccess () {
    
    clearContactForm();
    changePage("1");
    findContacts();
    alert ("Contact Removed successfully");
}

function convertDate(date, a) {
    if (!a) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        return (year + '-' + month + '-' + day);
    } else {
        var e = date.split("-");
        var dd = new Date();
        dd.setFullYear(e[0], e[1], e[2]);
        return dd.getTime();
    }
}

function getName(contactsArray) {

    var nameReturn = 'No Name';

    if (contactsArray.givenName !== null && contactsArray.familyName !== null) {
        nameReturn = contactsArray.givenName + ' ' + contactsArray.familyName;
    } else if (contactsArray.givenName !== null) {
        nameReturn = contactsArray.givenName;
    } else if (contactsArray.familyName !== null) {
        nameReturn = contactsArray.familyName;
    } else if (contactsArray.organizations[0].name !== null) {
        nameReturn = contactsArray.organizations[0].name;
    } else if (contactsArray.phoneNumbers[0].value !== null) {
        nameReturn = contactsArray.phoneNumbers[0].value;
    } else if (contactsArray.emails[0].value !== null) {
        nameReturn = contactsArray.emails[0].value;
    }

    return nameReturn;

}
// onSuccess Geolocation
//
function getContactInfo() {
    //var element = document.getElementById('geolocation');
    var request = new XMLHttpRequest();
    request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json", true);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status === 200 || request.status === 0) {
                var jsonResponse = JSON.parse(request.responseText);
                createContacts(jsonResponse);
            }
        }
    };
    request.send();


}


function individualSave (contactObject) {

        //MISSING BDAY ORGANIZATIONS AND NOTES
        //alert ("FUCK");
        var contact = navigator.contacts.create();
        var name = new ContactName();
        var addresses = [];
        var phoneNumbers = [];
        var emails = [];
        addresses[0] = new ContactAddress();
        
        if (contactObject.id == "null") {
            contactObject.id = null;
        }

        contact.id = contactObject.id;

        name.givenName = contactObject.givenName;
        name.familyName = contactObject.familyName;
        contact.name = name;

        if (contactObject.addresses.length > 1) {
            for (var i = 0; i < contactObject.addresses.length; i++) {
                addresses.push(new ContactAddress());
            }
        }

        for (var o=0;o<contactObject.addresses.length;o++) {
            addresses[o].type = contactObject.addresses[o].type;

            addresses[o].streetAddress = contactObject.addresses[o].streetAddress;
            
            addresses[o].locality = contactObject.addresses[o].locality;

            addresses[o].country = contactObject.addresses[o].country;

            addresses[o].postalCode = contactObject.addresses[o].postalCode;
        }
        
        contact.addresses = addresses;

        var checker = true;
        //alert (contactObject.phoneNumbers[j].value);
        for (var j = 0; j < contactObject.phoneNumbers.length; j++) {
            if (checker) {
                 phoneNumbers.push(new ContactField(contactObject.phoneNumbers[j].type, contactObject.phoneNumbers[j].value, true));
            }else {
                phoneNumbers.push(new ContactField(contactObject.phoneNumbers[j].type, contactObject.phoneNumbers[j].value, false));
            }
            checker = false;
        }
        //phoneNumbers[0] = new ContactField(contactObject.phoneNumbers[0].type, contactObject.phoneNumbers[0].value, true);

        contact.phoneNumbers = phoneNumbers;
        
       
        for (var l = 0; l < contactObject.emails.length; l++) {
            emails.push(new ContactField(contactObject.emails[l].type, contactObject.emails[l].value, false));
        }
        
        contact.emails = emails;

        // save to device
        contact.save(onSuccess, onError);

    
}

function createContacts(contactsObject) {
    // create a new contact object

    for (var i in contactsObject) {

        var contact = navigator.contacts.create();
        var name = new ContactName();
        var addresses = [];
        var phoneNumbers = [];
        var emails = [];
        addresses[0] = new ContactAddress();
        addresses[0].type = 'Home';

        if (contactsObject[i].firstname) {
            name.givenName = contactsObject[i].firstname;
        }

        if (contactsObject[i].lastname) {
            name.familyName = contactsObject[i].lastname;
        }

        contact.name = name;

        if (contactsObject[i].street) {
            addresses[0].streetAddress = contactsObject[i].street;
        }

        if (contactsObject[i].city) {
            addresses[0].locality = contactsObject[i].city;
        }

        if (contactsObject[i].state) {
            addresses[0].country = contactsObject[i].state;
        }

        contact.addresses = addresses;

        if (contactsObject[i].phone) {
            phoneNumbers[0] = new ContactField('Mobile', contactsObject[i].phone, true);
            contact.phoneNumbers = phoneNumbers;
        }

        if (contactsObject[i].email) {
            emails[0] = new ContactField('Personal', contactsObject[i].email, false);
            contact.emails = emails;
        }

        // save to device
        contact.save(onSuccess, onError);

    }


}

function appOnline() {

    console.log("WE ONLINE");

    if (localStorage.simonServer == "false") {

        getContactInfo();
    }

}

function appOffline() {
    console.log("WE OFFLINE");
}

var sim = {
    goOffline: function() {
        sim._dispatchEvent("offline");
    },
    goOnline: function() {
        sim._dispatchEvent("online");
    },
    _dispatchEvent: function(eventType) {
        var event = document.createEvent('Event');
        event.initEvent(eventType, true, true);
        document.dispatchEvent(event);
    }
};

function onSuccess(contact) {
    localStorage.simonServer = true;
    findContacts();
    console.log("Save Success");
}

function onError(contactError) {
    console.log("Error = " + contactError.code);
}

function clearContactForm() {
    for (var j = 0; j < extraButtons.length; j++) {
        extraButtons[j].removeEventListener('click', addExtra, false);
    }

    var html = '<fieldset><div class="allNames"><input type="text" id="firstname" name="firstname" placeholder="Name" maxlength="40" value=""></div><div class="allNames"><input type="text" id="lastname" name="lastname" placeholder="Last name" value=""></div><div class="allNames"><input type="text" id="company" name="company" placeholder="Company" value=""></div><div class="phoneNumbers"><div class="clearIt"><select name="numbertype0"><option value="Mobile" selected>Mobile</option><option value="Home">Home</option><option value="Work">Work</option><option value="Personal">Personal</option></select><input type="tel" id="number0" name="number0" data-amount="1" placeholder="Phone" value=""></div><button class="addExtra" data-extra="0">Add Phone Number<img src="img/plusextra.png" /></button></div><div class="emails"><div class="clearIt"><select name="emailtype0"><option value="Personal" selected>Personal</option><option value="Home">Home</option><option value="Work">Work</option></select><input type="email" id="email0" name="email0" data-amount="1" placeholder="Email" value=""></div><button class="addExtra" data-extra="1">Add Email<img src="img/plusextra.png" /></button></div><div class="addresses"><div class="clearIt"><select name="addressestype0"><option value="Home" selected>Home</option><option value="Work">Work</option><option value="Cottage">Cottage</option></select><input type="text" class="street" id="street0" name="street0" placeholder="Street" value=""><input type="text" class="zipcode" id="zipcode0" name="zipcode0" placeholder="Zip code" value=""><input type="text" class="city" id="city0" name="city0" placeholder="City" value=""><input type="text" class="country" id="country0" name="country0" data-amount="1" placeholder="Country" value=""></div><button class="addExtra" data-extra="2">Add Address<img src="img/plusextra.png" /></button></div><div class="birthday"><input type="date" id="birthday" name="birthday" placeholder="Birthday" value=""></div><div class="comment"><input type="text" id="comment" name="comment" placeholder="Comment" value=""></div></fieldset>';
    var contactForm = document.contactForm;
    contactForm.dataset.identity = 'null';
    contactForm.innerHTML = html;

    extraButtons = document.querySelectorAll('.addExtra');
    for (var i = 0; i < extraButtons.length; i++) {
        extraButtons[i].addEventListener('click', addExtra, false);
    }
}
