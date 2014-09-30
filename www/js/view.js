/**
 * @author Thomas Wiegand
 */
var view = {
	contacts:"",
	contact:"",
	contact_list_element:"",
	contact_form_element:"",
	//Input elements
	contact_form_firstname:null,
	contact_form_lastname:null,
	contact_form_address:null,
	contact_form_city:null,
	contact_form_postalcode:null,
	contact_form_email:null,
	contact_form_phonenumber:null,
	isReadOnly:true,
	
    init: function(contact_list_id, contact_form_id)
    {
    	console.log("START view.init");
    	this.contact_list_element = document.getElementById(contact_list_id);
    	this.contact_form_element = document.getElementById(contact_form_id);
    	this.createContactFormDom();
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
    makeAttribute: function(name, value)
    {
    	var attr = document.createAttribute(name);
  		attr.value = value;
  		return attr;
    },
    makeInput: function(idVal, typeVal, nameVal, placeHolderVal)
    {
		// create a new input element 
  		// and set its attributes 
  		var input = document.createElement("input");
  		input.setAttributeNode(this.makeAttribute("readonly", "readonly")); 
  		input.setAttributeNode(this.makeAttribute("placeHolder", placeHolderVal));
  		input.setAttributeNode(this.makeAttribute("name", nameVal));
  		input.setAttributeNode(this.makeAttribute("type", typeVal));
  		input.setAttributeNode(this.makeAttribute("id", idVal));
  		return input;  
    },
    makeLabel: function(labelVal, input)
    {
  		var label = document.createElement("label");
  		var span = document.createElement("span");
  		var text = document.createTextNode(labelVal);
  		span.appendChild(text);
  		label.appendChild(span);
  		label.appendChild(input); 
  		return label;     	
    },
    createContactFormDom: function()
    {
    	var form = document.createElement("form");

    	//var a = this.makeAttribute("action", "");
    	console.log("set Form AttributeNodes");
    	form.setAttributeNode(this.makeAttribute("action", ""));
    	form.setAttributeNode(this.makeAttribute("method", "post"));
    	form.setAttributeNode(this.makeAttribute("class", "basic-grey"));

		console.log("Make Input Elements");
		
		this.contact_form_firstname = this.makeInput("firstname", "text", "firstname", "First Name");
		var label1 = this.makeLabel("TEST First Name ", this.contact_form_firstname);
		form.appendChild(label1);
		
		this.contact_form_lastname = this.makeInput("lastname", "text", "lastname", "Last Name");
		form.appendChild(this.makeLabel("Last Name ", this.contact_form_lastname));
		
		this.contact_form_address = this.makeInput("address", "text", "address", "Address");
		form.appendChild(this.makeLabel("Address ", this.contact_form_address));
		
		this.contact_form_city = this.makeInput("city", "text", "city","City");
		form.appendChild(this.makeLabel("City ", this.contact_form_city));

		this.contact_form_postalcode = this.makeInput("postalcode", "text", "postalcode", "Postal Code");
		form.appendChild(this.makeLabel("Postal Code", this.contact_form_postalcode));
		
		this.contact_form_email = this.makeInput("email", "email", "email", "Valid Email Address");
		form.appendChild(this.makeLabel("Email ", this.contact_form_email));
		
		this.contact_form_phonenumber = this.makeInput("phonenumber", "tel", "phonenumber", "Phone Number");
		form.appendChild(this.makeLabel("Phone Number", this.contact_form_phonenumber));
		
		this.contact_form_element.innerHTML = "";
		this.contact_form_element.appendChild(form);
		
		//console.log(this.contact_form_element.innerHTML);

    },
    getEditStatus: function()
    {
    	return this.isReadOnly;
    },
    setReadOnly: function(isReadOnly)
    {
		this.isReadOnly = isReadOnly;
		this.contact_form_firstname.readOnly=isReadOnly;
		this.contact_form_lastname.readOnly=isReadOnly;
		this.contact_form_address.readOnly=isReadOnly;
		this.contact_form_city.readOnly=isReadOnly;
		this.contact_form_postalcode.readOnly=isReadOnly;
		this.contact_form_email.readOnly=isReadOnly;
		this.contact_form_phonenumber.readOnly=isReadOnly;
    },
    cleanFields: function()
    {
		this.contact_form_firstname.value = "";
		this.contact_form_lastname.value = "";
		this.contact_form_address.value = "";
		this.contact_form_city.value = "";
		this.contact_form_postalcode = "";
		this.contact_form_email.value = "";
		this.contact_form_phonenumber.value = "";
    },
    updateFields: function(contact)
    {
		
		this.cleanFields();
		this.contact_form_firstname.value = contact.name.givenName;
		this.contact_form_lastname.value = contact.name.familyName;
		if(contact.addresses.length > 0)
		{
			this.contact_form_address.value = contact.addresses[0].streetAddress;
			this.contact_form_city.value = contact.addresses[0].locality;
			this.contact_form_postalcode = contact.addresses[0].postalCode;
		}
		if(contact.emails.length > 0)
		{
			this.contact_form_email.value = contact.emails[0].value;
		}
		if(contact.phoneNumbers.length > 0)
		{
			this.contact_form_phonenumber.value = contact.phoneNumbers[0].value;
		}
    },
    //Obsolete keep around for testing
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
