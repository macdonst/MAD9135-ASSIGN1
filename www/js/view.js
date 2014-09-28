/**
 * @author Thomas Wiegand
 */
var view = {
	contacts:"",
	contact:"",
	contact_list_element:"",
	contact_form_element:"",
    init: function(contact_list_id, contact_form_id)
    {
    	console.log("START view.init");
    	this.contact_list_element = document.getElementById(contact_list_id);
    	this.contact_form_element = document.getElementById(contact_form_id);
    },
    drawContactList: function(contacts)
    {
		//Save this for future use
		this.contacts = contacts;
		//Build the html
		var html = '<ul id="contacts_ul">';
		for(var i = 0; i < contacts.length; i++)
		{
			var contact = this.contacts[i];
			html += '<li id="' + contact.id + '">' + contact.displayName + '</li>';
    	}
		html += '</ul>';
		this.contact_list_element.innerHTML = html;	
    },
    clearContactList: function()
    {
    	this.contact_list_element.innerHTML = "";
    },
    drawContactForm: function(contact)
    {
		console.log("draw Contact form for: " + contact.name.formatted);
		
		var html = "<ul>" + 
		"<li>Formatted: "  +   contact.name.formatted       + "</li>" +
        "<li>Family Name: "  + contact.name.familyName      + "</li>" +
        "<li>Given Name: "   + contact.name.givenName       + "</li>" +
        "<li>Middle Name: "  + contact.name.middleName      + "</li>" +
        "<li>Id: "           + contact.id 					+ "</li>" +
        "<li>DisplayName: "  + contact.displayName 			+ "</li>" +
        "<li>Address List<ul>";	
        
        for(var j = 0; j < contact.addresses.length; j++)
        {
        	html += "<li>Type: "	+ contact.addresses[j].type          	+ "<ul>" +
            "<li>Street Address: " 		+ contact.addresses[j].streetAddress 	+ "</li>" +
            "<li>Locality: "       		+ contact.addresses[j].locality      	+ "</li>" +
            "<li>Region: "         		+ contact.addresses[j].region        	+ "</li>" +
            "<li>Postal Code: "    		+ contact.addresses[j].postalCode    	+ "</li>" +
            "<li>Country: "        		+ contact.addresses[j].country 			+ "</li></ul></li>";
        }
        html += "</ul>";
        this.contact_form_element.innerHTML = html;
    },
    closeContactForm: function()
    {
    	this.contact_form_element.innerHTML = "";
    }
};
