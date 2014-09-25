/**
 * @author Thomas Wiegand
 */
var view = {
	contacts:"",
	contact_list_element:"",
	contact_form_element:"",
    init: function(contact_list_id, contact_form_id) {
    	this.contact_list_element = document.getElementById(contact_list_id);
    	this.contact_form_element = document.getElementById(contact_form_id);
    },
    drawContactList: function(contacts_array){
		//Save this for future use
		this.contacts = contacts_array;
		//Build the html
		var html = '<ul>';
		for(var i=0; i < this.contacts.length; i++)
		{
			var contact = this.contacts[i];
			html += '<li id="' + contact.id + '">' + contact.displayName + '</li>';
		}
		html += '</ul>';
		this.contact_list_element.innerHTML = html;	
    }
};
