var DEBUG_FIX = false;
var contactID = 0;
            
var controller = {
    //Constructor
    init: function()
    {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function()
    {
        document.addEventListener('contactListReady', this.onContactListReady, false);
        document.addEventListener('contactLocationReady', this.contactLocationReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
        document.getElementById('edit_form_button').addEventListener('click', this.onEditClick, false);
        document.getElementById('ad_contact_button').addEventListener('click', this.onAddClick, false);
        document.getElementById('back_button').addEventListener('click', this.onCloseClick, false);
        document.getElementById('save_contact').addEventListener('click', this.onSaveClick, false);
        //document.getElementById('simple_list_button').addEventListener('click', this.onSimpleListClick, false);
        //document.getElementById('icon_list_button').addEventListener('click', this.onIconListClick, false);
    },
	contactLocationReady: function(){
       view.updateFields(model.getEmptyContact());
    	view.setReadOnly(false);
      	view.hideContactList();
    	view.showContactForm();
    },
    onSimpleListClick: function()
    {
    	//ev.preventDefault();
    	var contacts = model.getContactList();
    	view.drawSimpleList(contacts);
    },
    onIconListClick: function()
    {
    	//ev.preventDefault();
    	var contacts = model.getContactList();
    	view.drawContactList(contacts);
    },
    onEditClick: function(ev)
    {
    	 //ev.preventDefault();
    	 view.setReadOnly(false);
         
    },
    onAddClick: function(ev)
    {
    	//ev.preventDefault();
    	view.updateFields(model.getEmptyContact());
    	view.setReadOnly(false);
      	view.hideContactList();
    	view.showContactForm();
       	view.changeHeader("Add Contact");
       	view.hideEditButton();
		contactLocation.getLocation();
    },
    onCloseClick: function(ev)
    {
		ev.preventDefault();
		view.showContactList();
    	view.hideContactForm();
    },
    onSaveClick: function(ev)
    {
    	ev.preventDefault();
        console.log("save click");
        console.log("contact ID: "+ contactID);
        console.log("Am I Here? "+ globalContact);
        //var contact = model.getContactById(contactID);
    	var model = view.validateAndSetContactValues(globalContact);
    	view.setReadOnly(true);
    },
    //Going Offline
    onOffline: function()
    {
    	model.setOnlineStatus(false);
    },
    //Coming Online
    onOnline: function()
    {
    	model.setOnlineStatus(true);
    },
    //The contact list is ready
    onContactListReady: function()
    {
    	view.drawContactList(model.getContactList());
    	//Add event listener for list item clicks
    	document.getElementById('contact_list_').addEventListener('click',
    	function(ev)
    	{
    		ev.preventDefault();
    		view.setReadOnly(true);
    		view.updateFields(model.getContactById(ev.target.id));
            model.getContact();
	      	view.hideContactList();
	    	view.showContactForm();
            view.changeHeader("Edit Contact");
            view.showEditButton();
    	});
    },
    onDeviceReady: function()
    {
      	model.prepareContactList();
    }
};

//Cannot initialize from online script due to Contacts plugin restrictions
function start_hockey_heroes_app()
{
	document.addEventListener('deviceready',function(){
		//Uncomment this code to debug start up functions
		//document.getElementById('deviceready').addEventListener('click', function()
		//{
			model.init();
			view.init("page1", "contact_list_", "page2", "contact_form");
			view.hideContactForm();
			
			controller.init();
			contactLocation.init();
			controller.onDeviceReady();
		//},false);
	}, false);
}
start_hockey_heroes_app();
