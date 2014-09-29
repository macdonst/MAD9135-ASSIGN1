var DEBUG_FIX = false;
            
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
        document.addEventListener('contactFormReady', this.onContactFormReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
        console.log("Add debug click Listener");
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
    	//The contact list is ready
    	//Hand the array off to the view to draw it    	
    	view.drawContactList(model.getContactList());
    	//Add event listener for list item clicks
    	document.getElementById('contacts_ul').addEventListener('click',
    	function(ev)
    	{
    		//Due to Firefox OS limitations (cannot find using id) we must use the first name as an id
    		//Parse first name out
    		var arr = ev.target.innerHTML.split(" ");
    		console.log("call prepareContactForm for: " + arr[0]);
    		model.prepareContactForm(arr[0]);
    	});
    },
    onContactFormReady: function()
    {
    	console.log("call drawContactForm");
    	view.drawContactForm(model.getContact());
    },
    // This is where all the work starts
    onDeviceReady: function()
    {
        console.log("START controller.onDeviceReady");
        if(DEBUG_FIX)
        {
        	alert("Debug Fix");
        	var div = document.getElementById('deviceready');
        	div.innerHTML = '<button id="debug_button">DEBUG</button>';
        	document.getElementById('debug_button').addEventListener('click',function(ev)
        	{
        		//Remove the button now
        		document.getElementById('deviceready').removeChild(document.getElementById('debug_button'));	
        		
        		//Call the contacts plugin to prepare the contact list
        		//When the list is ready the model fires the 'contactListReady' event 
        		model.prepareContactList("Thomas");
        	}, false);
        }
        else
        {
			document.getElementById('search_button').addEventListener('click',function()
			{
				//close previous Form (if Open)
    			view.closeContactForm();

				var name = document.getElementById('contact_name').value;
				model.prepareContactList(name);
			});
			
			document.getElementById('create_button').addEventListener('click',function()
			{
				var name = document.getElementById('contact_name').value;
				
	      	});
	   	}
    }
};

//Cannot initialize from online script due to Contacts plugin restrictions
function start_hockey_heroes_app()
{
	document.addEventListener('deviceready',function(){
		model.init();
		view.init("contact_list", "contact_form");
		controller.init();
		controller.onDeviceReady();
	}, false);
}
start_hockey_heroes_app();
