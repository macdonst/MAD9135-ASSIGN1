/**
 * @author Thomas Wiegand
 */
var jsonObj =[
	{
		firstname: "Sidney",
		lastname: "Crosby",
		street: "123 Main St.",
		city: "Cole Harbour",
		state: "Nova Scotia",
		phone: "6135551111",
		email: "sidney.crosby@penguins.nhl.com"
	},
	{
		firstname: "Ryan",
		lastname: "Getzlaf",
		street: "123 Main St.",
		city: "Regina",
		state: "Saskatchewan",
		phone: "613555112",
		email: "ryan.getzlaf@ducks.nhl.com"
	},
	{
		firstname: "Claude",
		lastname: "Giroux",
		street: "123 Main St.",
		city: "Hearst",
		state: "Ontario",
		email: "claude.giroux@flyers.nhl.com"
	},
	{
		firstname: "Tyler",
		lastname: "Seguin",
		street: "123 Main St.",
		city: "Brampton",
		state: "Ontario",
		phone: "613555114",
		email: "tyler.seguin@stars.nhl.com"
	},
	{
		firstname: "Corey",
		lastname: "Perry",
		street: "123 Main St.",
		city: "Peterborough",
		state: "Ontario",
		phone: "613555115",
		email: "corey.perry@ducks.nhl.com"
	}
];

var HERO_COUNT = 5;

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
    	this._jsonObj = jsonObj;
    	this.hockeyHeroesJsonDone();
    },
    hockeyHeroesJsonDone: function()
    {
    	 model.addHockeyHeroes();
    },
    addHockeyHeroes: function()
    {
    	for(var i=0; i < this._jsonObj.length; i++)
    	{
    		console.log("jsonObj[" + i + "]" + this._jsonObj[i].firstname);
    		this.addContact(this._jsonObj[i], false);
    	}
    },
    addContact: function(obj, isNew)
    {
		if(isNew)this._hero_count = 0;
		// create a new contact object
		var contact = navigator.contacts.create();
		contact.displayName = obj.firstname + " " + obj.lastname;
		contact.nickname = obj.firstname + " " + obj.lastname;;            // specify both to support all devices
		
		// populate some fields
		var name = new ContactName();
		name.givenName = obj.firstname;
		name.familyName = obj.lastname;
		name.formatted = obj.firstname + " " + obj.lastname;
		contact.name = name;
		
		var emails = new ContactField();
		emails.value = obj.email;
		contact.emails = emails;
		
		var phoneNumbers = new ContactField();
		phoneNumbers.value = obj.phone;
		contact.phoneNumbers = phoneNumbers;
		
		var contactAddress = new ContactAddress();
		contactAddress.streetAddress = obj.street;
        contactAddress.locality = obj.city;
        contactAddress.region = obj.state;
		contact.addresses = contactAddress;
		// save to device
		contact.save(this.onContactSaved,function (contactError)
		{
			console.log("Save Error = " + contactError.code);
		});
    },
    onContactSaved: function(contact)
    {
    	model._hero_count++;
    	console.log("hero count: " + model._hero_count);
    	if(this._jsonObj.length == model._hero_count)
    	{
    		console.log("heroImportDone");
    		
    		//Save a flag so we don't import the heroes again'
    		localStorage.setItem('heroImportDone',"true");
    		
    		//Create an event to notify the controller that the heroes are done
	    	var event = document.createEvent('Event');
	        event.initEvent('heroImportDone', true, true);
	        document.dispatchEvent(event);
    	}
    },
    onHeroImportDone: function()
    {
    	console.log("Now call prepareContactList");
    	//When Heroes have been added we can display the Contact List
    	model.prepareContactList("");
    },
    prepareContactList: function(name)
    {
	    console.log("Get Name And Address for: " + name);
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
			alert('Find Contact Error: ' + error.code);
			model._errors += "Contacts Find Error: " + error.code + "\n";
		}, options);
    },
    getContactList: function()
    {
    	return this._contacts;
    },
    getContactById: function(id)
    {
    	console.log("Get Contact Info for: " + id);
    	
    	//Debug code to test save contact
    	//var obj = jsonObj[0];
    	//this.addContact(obj, false);
    	
		for(var i=0; i < this._contacts.length; i++)
		{
			var contact = this._contacts[i];
			if(contact.id == id)
			{
				this._contact = contact;
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

