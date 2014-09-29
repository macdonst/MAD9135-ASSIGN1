//Set to true to display a DEBUG button and defer
//startup code until button is pushed.    
var DEBUG_FIX = true;

var app = {
	
	///////////////////// Your app code ////////////////////////
	  
	onDeviceReady: function()
	{
	    if(DEBUG_FIX)
	    {
	    	//Get the div element you want to put your button in
	    	var div = document.getElementById('some_div');
	    	div.innerHTML = '<button id="debug_button">DEBUG</button>';
	    	//Create an event handler for your button
	    	document.getElementById('debug_button').addEventListener('click',function(ev)
	    	{
	    		//Remove the button now
        		document.getElementById('some_div').removeChild(document.getElementById('debug_button'));	

	    		//Execute your Startup Code after DEBUG button is pushed
	    		someStartUpFuncion();
	    	}, false);
	    }
	    else
	    {
	    	//Execute your Startup Code
	    	someStartUpFuncion();
	    }
	}
}


function getContactListByName(name)
{
	console.log("Get Name And Address for: " + name);
	var options      = new ContactFindOptions();
	options.filter   = name; //Thomas Wiegand
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	var fields = [navigator.contacts.fieldType.name];
	
	//Do not use navigator.contacts.fieldType.displayName
	//FFOS ContactProxy: Unable to search by displayName on FFOS 1.2
	//var fields = [navigator.contacts.fieldType.displayName];		
	
	navigator.contacts.find(fields, function(contacts)
	{
		var strNames = "";
		for(var i = 0; i < contacts.length; i++)
		{
			strNames += contacts[i].name.formatted + "\n";
		}
		alert('Found ' + contacts.length + ' contacts.\n' + strNames);
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
	}, function(error)
	{
		alert('Error: ' + error.code);
	}, options);

}

//displayName

function McDoSample()
{
	var options = new ContactFindOptions();
	options.filter = "7f5a08b8ff514641a0c0508abf71131f";  //just it's an example. Looking for id 20.
	//NOTE this will not work in Firefox OS
	//Throws the following error
	//"FXOS ContactProxy: inallowed field passed to search filtered out: id"
	var fields = [navigator.contacts.fieldType.id];
	var contact;   
	navigator.contacts.find(fields,function(contacts)
	{
		var strNames = "";
		for(var i = 0; i < contacts.length; i++)
		{
			strNames += contacts[i].name.formatted + "\n";
		}
		alert('Found ' + contacts.length + ' contacts.\n' + strNames);
	},
	function(contactError)
	{
		alert('Error in contact find: '+ contactError.code);
	       //navigator.notification.alert('Error contact find: '+ contactError.code,function(){},'Title');
	}, options);
}

function nameAndId(name)
{
	console.log("Name and Id");
	var options      = new ContactFindOptions();
	options.filter   = name; //Amanda Amina
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	var fields = [navigator.contacts.fieldType.name];//, navigator.contacts.fieldType.id];		
	navigator.contacts.find(fields, function(contacts)
	{
		alert('Found ' + contacts.length + ' contacts.');
		for(var i = 0; i < contacts.length; i++)
		{
			var str = "Formatted: "  + contacts[i].name.formatted       + "\n" +
            "Family Name: "  + contacts[i].name.familyName      + "\n" +
            "Given Name: "   + contacts[i].name.givenName       + "\n" +
            "Middle Name: "  + contacts[i].name.middleName      + "\n" +
            "DisplayName: "  + contacts[i].displayName + "\n" +
            "Id: [" + contacts[i].id + "]";
            console.log(str);
    	}
	}, function(error)
	{
		alert('Error: ' + error.code);
	}, options);
}

function nameAndIdbyDisplayName()
{
	console.log("Name and Id by Id");
	var options      = new ContactFindOptions();
	options.filter   = "Am"; //Amanda Amina
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	var fields = [navigator.contacts.fieldType.name];			
	navigator.contacts.find(fields, function(contacts)
	{
		alert('Found ' + contacts.length + ' contacts.');
		for(var i = 0; i < contacts.length; i++)
		{
			var str = "Formatted: "  + contacts[i].name.formatted       + "\n" +
            "Id: [" + contacts[i].id + "]";
            console.log(str);
    	}
	}, function(error)
	{
		alert('Error: ' + error.code);
	}, options);
}


function createContact(name)
{
	// create a new contact object
	var str = name + " Mc" + name;
	var contact = navigator.contacts.create();
	contact.displayName = str;
	contact.nickname = str;            // specify both to support all devices
	
	// populate some fields
	var name = new ContactName();
	name.givenName = name;
	name.familyName = "Mc" + name;
	contact.name = name;
	
	console.log("Attempting to Save contact:" + str);
	// save to device
	contact.save(function()
	{
		alert("Created a new Contact");
		console.log("Created a new Contact");	
	}, function()
	{
		alert("Error creating contact");
		console.log("Error creating contact");
	});	
}
