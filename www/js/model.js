/**
 * @author Thomas Wiegand
 */
var jsonObj;

var model = {
	_contacts:"",
	_contact:"",
	_errors:"",
	_jsonObj:null,
	_hero_count:0,
	_hero_length:0,
	isOnline:true,
    init: function() {
    	document.addEventListener('heroImportDone',this.onHeroImportDone,false);
    },
    logContactList: function(contacts)
    {
		var strNames = "";
		for(var i = 0; i < contacts.length; i++)
		{
			strNames += contacts[i].name.formatted + "\n";
		}
		console.log('\n\nFound ' + contacts.length + ' contacts.\n' + strNames);
    },

     getHockeyHeroesJson: function()
    {
        console.log("Ian: AJAX CALL");
        var request = new XMLHttpRequest();


        // add in the URL later
        request.open("GET", "https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json", true);
            request.onreadystatechange = function()
            {
                if(request.readyState === 4)
                {
                    if(request.status=== 200 || request.status===0)
                    {
                    	console.log(request.responseText);

                        model._jsonObj = JSON.parse(request.responseText);
			            model.hockeyHeroesJsonDone();
                    }
                }

            };

            request.send();
            console.log("IAN HERE");

    },
    hockeyHeroesJsonDone: function()
    {
    	 model.addHockeyHeroes();
    },
    addHockeyHeroes: function()
    {
    	var count = 0;
    	for(var i=0; i < this._jsonObj.length; i++)
    	{
    		console.log("jsonObj[" + i + "]" + this._jsonObj[i].firstname);
    		//Test for match Here
    		if(this.noContactFound(this._jsonObj[i].email))
    		{
    			//increment the contact counter
    			this._hero_count++;
    			count++;
    			var hockeyImport = true;
    			this.addContact(this._jsonObj[i], hockeyImport);
    		}
    	}
    	if(!count)
    	{
    		var event = document.createEvent('Event');
        	event.initEvent('contactListReady', true, true);
        	document.dispatchEvent(event);
    	}
    },
    noContactFound: function(email)
    {



    	for(var i=0; i < this._contacts.length; i++)
    	{

    		var test = this._contacts[i].emails; 
    		if(test && test.length > 0)
    		{
	    		var current_email = this._contacts[i].emails[0].value;
	    		if(email == current_email)
	    		{
	    			return false;
	    		}
	    	}
    	}
    	return true;
    },
    getEmptyContact:function()
    {
		var contact = navigator.contacts.create();
		contact.displayName = "";
		contact.nickname = "";            // specify both to support all devices
		
		// populate some EMPTY fields
		var name = new ContactName();
		name.givenName = "";
		name.familyName = "";
		name.formatted = "";
		contact.name = name;
		
		var emails = [];
		var email = new ContactField();
		email.value = "";
		emails[0] = email;
		contact.emails = emails;
		
		var phoneNumberArray = [];
		var phoneNumber = new ContactField();
		phoneNumber.value = "";
		phoneNumber.pref = "";
		phoneNumber.type = "";
		phoneNumberArray[0] = phoneNumber;
		contact.phoneNumbers = phoneNumberArray;
		
		var addresses = [];
		var contactAddress = new ContactAddress();
		contactAddress.streetAddress = "";
        contactAddress.locality = "";
        contactAddress.region = "";
        addresses[0] = contactAddress;
		contact.addresses = addresses;
		
		return contact;
    },
    addContact: function(obj, hockeyImport)
    {
		//if(isNew)this._hero_count = 0;
		// create a new contact object
		var contact = navigator.contacts.create();
		contact.displayName = obj.firstname + " " + obj.lastname;
		contact.nickname = obj.firstname + " " + obj.lastname;            // specify both to support all devices
		
		// populate some fields
		var name = new ContactName();
		name.givenName = obj.firstname;
		name.familyName = obj.lastname;
		name.formatted = obj.firstname + " " + obj.lastname;
		contact.name = name;
		
		var emails = [];
		var email = new ContactField();
		email.value = obj.email;
		emails[0] = email;
		contact.emails = emails;
		
		var phoneNumberArray = [];
		var phoneNumber = new ContactField();
		phoneNumber.value = obj.phone;
		phoneNumber.pref = "true";
		phoneNumber.type = "home";
		phoneNumberArray[0] = phoneNumber;
		contact.phoneNumbers = phoneNumberArray;
		
		var addresses = [];
		var contactAddress = new ContactAddress();
		contactAddress.streetAddress = obj.street;
        contactAddress.locality = obj.city;
        contactAddress.region = obj.state;
        addresses[0] = contactAddress;
		contact.addresses = addresses;
		// save to device
		if(hockeyImport)
		{
			contact.save(this.onContactSaved,function (contactError)
			{
				console.log("Save Error = " + contactError.code);
			});			
		}
		else{
			contact.save(function()
			{
				//console.log("Saved New Contact");
				//Call some update function
			},function()
			{
				console.log("Error Saving Contact");
			});	
		}
    },
    onContactSaved: function(contact)
    {
    	model._hero_count--;
    	//console.log("hero count: " + model._hero_count);
    	//Push the resulting contact onto the contacts list
    	model._contacts.push(contact);
    	if(0 == model._hero_count)
    	{
    		//console.log("heroImportDone");
    		//Save a flag so we don't import the heroes again'
    		//localStorage.setItem('heroImportDone',"true");
    		var event = document.createEvent('Event');
        	event.initEvent('contactListReady', true, true);
        	document.dispatchEvent(event);
       	}
    },
    onHeroImportDone: function()
    {
    	//console.log("Now call prepareContactList");
    	//When Heroes have been added we can display the Contact List
    	//model.prepareContactList("");
    },
    prepareContactList: function(name)
    {
	    //console.log("Get Name And Address for: " + name);
		var options      = new ContactFindOptions();
		options.filter   = name;
		options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		var fields = [navigator.contacts.fieldType.name];
		
		//Do not use navigator.contacts.fieldType.displayName
		//FFOS ContactProxy: Unable to search by displayName on FFOS 1.2
		//var fields = [navigator.contacts.fieldType.displayName];		
		navigator.contacts.find(fields,
		function(contacts) //Success Callback
		{
			model.logContactList(contacts);
			//Save the contacts list
			model._contacts = contacts;
			model.getHockeyHeroesJson();
			
		}, function(error) //Error Callback
		{
			alert('Find Contact Error: ' + error.code);
			model._errors += "Contacts Find Error: " + error.code + "\n";
		}, options);
    },
    getContactList: function()
    {
    	return this._contacts;
    },
    //Test if any null arrays and set them to empty array
    fixNullArrayFields: function(contact)
    {
    	contact.emails = contact.emails ? contact.emails : contact.emails = []; 
    	contact.addresses = contact.addresses ? contact.addresses : contact.addresses = []; 
    	contact.phoneNumbers = contact.phoneNumbers ? contact.phoneNumbers : contact.phoneNumbers = [];
    	return contact; 
    },
    getContactById: function(id)
    {
		for(var i=0; i < this._contacts.length; i++)
		{
			var contact = this._contacts[i];
			if(contact.id == id)
			{
				this._contact = this.fixNullArrayFields(contact);
				continue;
			}	
		}
		return this._contact;
    },
    getContact: function()
    {
    	return this._contact;
    },
    setOnlineStatus: function(isOnline)
    {
    	this.isOnline = isOnline;
    	console.log("Online Status:" + this.isOnline);
    },
    //Error Event Handler
    onError: function(contactError) {
    	console.log("Error:" + contactError.code);
    }
};

