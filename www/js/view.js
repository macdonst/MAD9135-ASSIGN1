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
		//Clear the div first 
		this.contact_list_element.innerHTML = html;	
		//Save this for future use
		this.contacts = contacts;
		//Build the html
		var html = '';
		for(var i = 0; i < contacts.length; i++)
		{
			var contact = this.contacts[i];
			html += '<div class="contact_box"  id="' + contact.id + '"><h2 class="name">' + contact.displayName + '</div>';
    	}
		//Save the html to the contact list element
		this.contact_list_element.innerHTML = html;	
    },
    clearContactList: function()
    {
    	this.contact_list_element.innerHTML = "";
    },
    val: function(val)
    {
    	var ret = val ? 'value="' + val + '"' : '';
     	return ret; 
    },
    drawContactForm: function(contact)
    {
		console.log("draw Contact form for: " + contact.name.formatted);
		this.contact_form_element.innerHTML = "";
	    var html = '<form action="" method="post" class="basic-grey">' +
	        '<label>' +
	            '<span>First Name </span>' +
	            '<input id="firstname" type="text" name="firstname" placeholder="First Name" ' + this.val(contact.name.givenName) + '/>' +
	        '</label>' +
	        '<label>' +
	            '<span>Last Name </span>' +
	            '<input id="lastname" type="text" name="lastname" placeholder="Last Name"' + this.val(contact.name.familyName) + '/>' +
	        '</label>' +
	        '<label>' +
	            '<span>Address </span>' +
	            '<input id="address" type="text" name="address" placeholder="Address"';
	             var val = contact.addresses.length > 0 ? contact.addresses[0].streetAddress : null;
	             html += this.val(val) + ' />' +
	        '</label>' +
	        '<label>' +
	            '<span>City </span>' +
	            '<input id="city" type="text" name="city" placeholder="City"';
	             val = contact.addresses.length > 0 ? contact.addresses[0].locality : null;
	             html += this.val(val) + ' />' +
	        '</label>' +
	        '<label>' +
	            '<span>Postal Code </span>' +
	            '<input id="postalcode" type="text" name="postalcode" placeholder="Postal Code"';
	            val = contact.addresses.length > 0 ? contact.addresses[0].postalCode : null;
	            html += this.val(val) + ' />' +
	        '</label>' +
	        '<label>' +
	            '<span>Email </span>' +
	            '<input id="email" type="email" name="email" placeholder="Valid Email Address"';
	            val = contact.emails.length > 0 ? contact.emails[0].value : null;
	            html += this.val(val) + ' />' +
	        '</label>' +
	        '<label>' +
	            '<span>Phone </span>' +
	            '<input id="phonenumber" type="tel" name="phonenumber" placeholder="Phone Number"';
	            val = contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].value : null;
	            html += this.val(val) + ' />' +
	        '</label>' +
	         '<label>' +
	            '<input type="button" class="button" value="Add" />' +
	        '</label>' +    
	    '</form>';
	    console.log(html);
        this.contact_form_element.innerHTML = html;
    },
    closeContactForm: function()
    {
    	this.contact_form_element.innerHTML = "";
    }
};
