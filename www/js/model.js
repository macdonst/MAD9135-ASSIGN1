/**
 * @author Thomas Wiegand
 */
var model = {
	_contacts:"",
	_contact:"",
	_errors:"",
	isOnline:false,
    init: function() {
    },
    logContactList: function(contacts)
    {
		var strNames = "";
		for(var i = 0; i < contacts.length; i++)
		{
			strNames += contacts[i].name.formatted + "\n";
		}
		//alert('Found ' + contacts.length + ' contacts.\n' + strNames);
		console.log('\n\nFound ' + contacts.length + ' contacts.\n' + strNames);
		for(var i = 0; i < contacts.length; i++)
		{
			var str = "Formatted: "  + contacts[i].name.formatted       + "\n" +
            "Family Name: "  + contacts[i].name.familyName      + "\n" +
            "Given Name: "   + contacts[i].name.givenName       + "\n" +
            "Middle Name: "  + contacts[i].name.middleName      + "\n" +
            "Id: "       + contacts[i].id + "\n" +
            "DisplayName: "       + contacts[i].displayName + "\n";	
            console.log(str);
            console.log("Number of address: " + contacts[i].addresses.length);
            for (var j = 0; j < contacts[i].addresses.length; j++)
            {
            	str = "Type: "     + contacts[i].addresses[j].type          + "\n" +
                "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
                "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
                "Region: "         + contacts[i].addresses[j].region        + "\n" +
                "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
                "Country: "        + contacts[i].addresses[j].country;
                console.log(str);
            }
    	}
    },
    prepareContactList: function(name)
    {
    	//TODO add Hockey Hero code
		if(this.isOnline)
		{
			//Add the hockey heroes to the list
		}
	    console.log("Get Name And Address for: " + name);
		//var options      = new ContactFindOptions();
		//options.filter   = name;
		//options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		//var fields = [navigator.contacts.fieldType.displayName];
		
		//var options      = new ContactFindOptions();
		//options.filter   = name;
		//options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		//var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		
		//var options = new ContactFindOptions();
		//options.filter = name;
		//var fields = ["displayName", "addresses"];
		//var fields = [navigator.contacts.fieldType.name];
		
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
			//Create an event to notify the controller that the list is ready
	    	var event = document.createEvent('Event');
	        event.initEvent('contactListReady', true, true);
	        document.dispatchEvent(event);
		}, function(error) //Error Callback
		{
			alert('Error: ' + error.code);
			model._errors += "Contacts Find Error: " + error.code + "\n";
		}, options);
    },
    getContactList: function()
    {
    	return this._contacts;
    },
    prepareContactForm: function(id)
    {
    	console.log("Get Contact Info for: " + id);
		var options      = new ContactFindOptions();
		options.filter   = ""; //id;
		//options.multiple = true;
		//options.desiredFields = [navigator.contacts.fieldType.id];
		//var fields = [navigator.contacts.fieldType.name];
		var filter = ["displayName","addresses"];
		navigator.contacts.find(filters,
		function(contacts) //Success Callback
		{
			if(contacts.length > 1)
			{
				//This should never happen since the id should be unique
				//Due to FirefoxOS limitations we are using name and this will not be unique
			}
			else
			{
				//model.logContactList(contacts);
				//Save the contact
				model._contact = contacts[0];
				console.log("sending contactFormReady event for:" + model._contact);
				//Create an event to notify the controller that the Contact is ready
		    	var event = document.createEvent('Event');
		        event.initEvent('contactFormReady', true, true);
		        document.dispatchEvent(event);
			}
		},function(error) //Error Callback
		{
			alert('Error: ' + error.code);
			model._errors += "Contacts Find Error: " + error.code + "\n";
		}, options);
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

