/**
 * @author Thomas Wiegand
 */
var model = {
	_contacts:"",
	isOnline:false,
    init: function() {
    },
    prepareContactList: function(){
		
		//TODO add cordova plugin code for contacts
		// find all contacts
		//var options = new ContactFindOptions();
		//options.filter = "";
		//var filter = ["displayName", "id"];
		//navigator.contacts.find(filter, this.onFoundContactsList, this.onError, options);
		
		console.log("Build Fake contact list");
		//Scaffold Code
		var contacts = [
			{displayName:"Sidney Crosby", id:"a123"},
			{displayName:"Ryan Getzlaf", id:"b123"},
			{displayName:"Claude Giroux", id:"c123"},
			{displayName:"Tyler Seguin", id:"d123"}
		];
		//console.log(contacts.toString());
		//Fake onFoundContactList event
		this.onFoundContactsList(contacts);
    },
    // FoundAllContacts Event Handler
    onFoundContactsList: function(contacts){
	    // The scope of 'this' is the event.
	    // Explicitly call 'model.processContacts(contacts);'
		model.processContacts(contacts);
    },
    processContacts: function(contacts)
    {
    	//Set the contacts property
    	this._contacts = contacts;
    	var event = document.createEvent('Event');
        event.initEvent('contactListReady', true, true);
        document.dispatchEvent(event);    	
    },
    getContactList: function()
    {
    	return this._contacts;
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

