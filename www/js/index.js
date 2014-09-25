var controller = {
    //Constructor
    init: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('contactListReady', this.onContactListReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
    },
    //Going Offline
    onOffline: function(){
    	model.setOnlineStatus(false);
    },
    //Coming Online
    onOnline: function(){
    	model.setOnlineStatus(true);
    },
    //The contact list is ready
    onContactListReady: function(){
    	//Hand the array off to the view to draw it    	
    	view.drawContactList(model.getContactList());
    },
    // This is where all the work starts
    onDeviceReady: function() {
        //Call the contacts plugin to prepare the contact list
        //When the list is ready the model fires the 'contactListReady' event 
        model.prepareContactList();
    }
};
