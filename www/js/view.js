/**
 * @author Thomas Wiegand
 */
var view = {
	contacts:"",
	contact:"",
	list_page:"",
	contact_list_element:"",
	form_page:"",
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
	
    init: function(list_page, contact_list_id, form_page, contact_form_id)
    {
    	this.list_page = document.getElementById(list_page);
    	this.contact_list_element = document.getElementById(contact_list_id);
    	this.form_page = document.getElementById(form_page);
    	this.contact_form_element = document.getElementById(contact_form_id);
    	this.createContactFormDom();
    },
    hideContactForm: function()
    {
    	this.form_page.className = "hide";
    },
    showContactForm: function()
    {
    	this.form_page.className = "show";
    },
    hideContactList: function()
    {
    	this.list_page.className = "hide";
    },
    showContactList: function()
    {
    	this.list_page.className = "show";
    },
    drawContactList: function(contacts)
    {
		//Clear the div first 
		this.contact_list_element.innerHTML = "";	
		//Save this for future use
		this.contacts = contacts;
		//Build the html
		var html = '';
		for(var i = 0; i < contacts.length; i++)
		{
			var contact = this.contacts[i];
			html += '<div class="contact_box"  id="' + contact.id + '"><h2 class="name">' + contact.displayName + '</h2></div>';
    	}
		//Save the html to the contact list element
		this.contact_list_element.innerHTML = html;	
    },
    drawSimpleList: function(contacts)
    {
		//Clear the div first 
		this.contact_list_element.innerHTML = "";	
		//Build the html
		var html = '';
		for(var i = 0; i < contacts.length; i++)
		{
			var contact = this.contacts[i];
			html += '<div class="simple_box"  id="' + contact.id + '">' + contact.displayName + '</div>';
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
  		input.setAttributeNode(this.makeAttribute("disabled", "disabled")); 
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
    createContactFormDom: function(readOnly)
    {
    	var form = document.createElement("form");

    	form.setAttributeNode(this.makeAttribute("action", ""));
    	form.setAttributeNode(this.makeAttribute("method", "post"));
    	form.setAttributeNode(this.makeAttribute("class", "basic-grey"));

		
		this.contact_form_firstname = this.makeInput("firstname", "text", "firstname", "First Name");
		var label1 = this.makeLabel("First Name ", this.contact_form_firstname);
		form.appendChild(label1);
		
		this.contact_form_lastname = this.makeInput("lastname", "text", "lastname", "Last Name");
		form.appendChild(this.makeLabel("Last Name ", this.contact_form_lastname));
		
		this.contact_form_address = this.makeInput("address", "text", "address", "Address");
		form.appendChild(this.makeLabel("Address ", this.contact_form_address));
		
		this.contact_form_city = this.makeInput("city", "text", "city","City");
		form.appendChild(this.makeLabel("City ", this.contact_form_city));

		//this.contact_form_postalcode = this.makeInput("postalcode", "text", "postalcode", "Postal Code");
		//form.appendChild(this.makeLabel("Postal Code", this.contact_form_postalcode));
		
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
		this.contact_form_firstname.disabled=isReadOnly;
		this.contact_form_lastname.disabled=isReadOnly;
		this.contact_form_address.disabled=isReadOnly;
		this.contact_form_city.disabled=isReadOnly;
		//this.contact_form_postalcode.disabled=isReadOnly;
		this.contact_form_email.disabled=isReadOnly;
		this.contact_form_phonenumber.disabled=isReadOnly;
    },
    cleanFields: function()
    {
		this.contact_form_firstname.value = "";
		this.contact_form_lastname.value = "";
		this.contact_form_address.value = "";
		this.contact_form_city.value = "";
		//this.contact_form_postalcode = "";
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
			//this.contact_form_postalcode = contact.addresses[0].postalCode;
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
    closeContactForm: function()
    {
    	this.contact_form_element.innerHTML = "";
    }
};
