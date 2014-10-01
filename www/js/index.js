var DEBUG_FIX = false;
            
var controller = {
	editStatus:false,
    //Constructor
    init: function()
    {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function()
    {
        document.addEventListener('contactListReady', this.onContactListReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
        document.getElementById('edit_form_button').addEventListener('click', this.onEditClick, false);
    },
    onEditClick: function(ev)
    {
    	 console.log("You Clicked?");
    	 ev.preventDefault();
    	 controller.editStatus = !controller.editStatus;
    	 view.setReadOnly(controller.editStatus);
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
    	console.log("The contact list is ready");
    	//Hand the array off to the view to draw it    	
    	view.drawContactList(model.getContactList());
    	//Add event listener for list item clicks
    	document.getElementById('contact_list_').addEventListener('click',
    	function(ev)
    	{
    		//When the Contact tile is clicked get the contact and draw it
    		//view.drawContactForm(model.getContactById(ev.target.id));
    		view.setReadOnly(true);
    		view.updateFields(model.getContactById(ev.target.id));
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
		//document.getElementById('deviceready').addEventListener('click', function()
		//{
			model.init();
			view.init("contact_list_", "contact_form");
			controller.init();
			controller.onDeviceReady();
		//},false);
	}, false);
}
start_hockey_heroes_app();
