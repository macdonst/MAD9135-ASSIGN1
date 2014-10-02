var data;
var contactdata;
var city;
var tap = document.createEvent("Event");
tap.initEvent("tap", true, true);

var app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
       
        console.log('initialize');
          
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        console.log('bindEvents');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { 
        console.log('onDeviceReady');   
        app.receivedEvent('deviceready');
      // app.checkConnect();
         
    },
    receivedEvent: function() {
        
           console.log('receivedEvent');   
        var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
        if(states[networkState]!='No network connection'){
            
              document.addEventListener("online", app.checkData, false);
            sim.goOnline();
            console.log(states[networkState]);
        }else{
            document.addEventListener("offline", app.offline, false);
            sim.goOffline();
             console.log(states[networkState]);
        }
       
       
            
    },
    // Update DOM on a Received Event
    checkData: function() {
        console.log('checkData');
       if(localStorage){ 
			  var oldCantact = localStorage.getItem("cantactDone");
			
			  if(oldCantact!=null){
			     app.findContact();
                  console.log("loadLocal");
			  }else{
                 app.loadJson();
                  console.log("loadJson");
              }
        }
    },
    loadJson: function(){
         console.log('loadJson');
        var request = new XMLHttpRequest();
       request.open('GET', 'https://dl.dropboxusercontent.com/u/887989/MAD9135/contacts.json', true);
        request.onreadystatechange = function(){
            if (request.readyState ===4){
                if(request.status===200||request.status===0){
                    //console.log(request.responseText);
                    var contactJson= JSON.parse(request.responseText);
                 localStorage.setItem("cantactDone",'1');
                   
                    for(var i=0; i<contactJson.length;i++ ){
                         
                       
                       // $('.contactName').append("<li data-i='"+i+"'><a href='#'>"+contactJson[i].firstname+" "+contactJson[i].lastname+"</a></li>");
						   //$("li").addClass("frontPageView");
						 
						   
                         var contact = navigator.contacts.create();
                             contact.displayName = contactJson[i].firstname;
                             contact.nickname = contactJson[i].firstname;                 
                             var name = new ContactName();
//                            
                            
                             name.givenName = contactJson[i].firstname;
                             name.familyName = contactJson[i].lastname;
                             var addresses=[];
                             addresses[0]=new ContactAddress('type','home','streetAddress',contactJson[i].street,contactJson[i].city,' ',' ',contactJson[i].state);

                            var phoneNumbers =[];
                            if (contactJson[i].phone === undefined) {

                            phoneNumbers[0] = new ContactField('mobile',' ');

                            }else{
                             phoneNumbers[0] =new ContactField('mobile',contactJson[i].phone);
                            }
                            var emails=[];
                             emails[0] =new ContactField('home',contactJson[i].email);
                             
                             contact.name = name;
                             contact.phoneNumbers = phoneNumbers;
                             contact.addresses = addresses ;
                             contact.emails = emails ;
                            contact.save(app.findContact,app.onSaveError);
                            //app.findContact()
                       
                     }
                    
                      

                 }
            }
            // $('li').bind('click', app.showDetails)
           
       };
        request.send();
		//$('#frontPage').append("<a href='#' class='add'>Add+</a>");
		
     /*setTimeout (function(){app.findContact();},1200);*/
	 //app.findContact();
	 
    },
    findContact: function(){
        console.log('findContact');
                    var options = new ContactFindOptions();
                    var fields = ["displayName", "name"];
                navigator.contacts.find(fields, app.findContactSuccess, app.findContactError, options);
    },
    findContactSuccess: function (contacts) {
		console.log('findContactSuccess');
		//if(contacts.length>0){
				 var contactNameList=$('.contactName li');
				if(contactNameList){
					$('.contactName li').remove();
				}
				for (var i = 0; i < contacts.length; i++) {
						   //console.log("Display Name = " + contacts[i].name.formatted);
							$('.contactName').append("<li data-i='"+i+"'><a href='#'>"+contacts[i].name.givenName+" "+contacts[i].name.familyName+"</a></li>");
							  $("li").addClass("frontPageView");
					   }
				/*if(!addContacts){
				
				addContacts = $('#frontPage').append("<a href='#' class='add'>Add+</a>");
				
				}*/
				var addBtn =$('#frontPage .add');
				if(addBtn){
					$('#frontPage .add').remove();
				}
                    $('#frontPage').append("<a href='#' class='add'>+ New Contact</a>");
				
				contactdata= contacts;
              console.log(contactdata);
		 
		//}
		
			 if (app.detectTouchSupport()) {
                $('li, .add').bind('touchend', app.handleTouchEnd);
                $('.add').bind("tap",app.showgelocation);
                $('li').bind('tap',app.showDetails);
			 }else{
				$('li').bind('click',app.showDetails);
                $('.add').bind("click",app.showgelocation);
			}
        
          
    },
    showDetails: function(){
       
        data = $(this).attr("data-i");
        $('#frontPage').attr('class', 'fadeout');
		
		setTimeout(function(){
			$('#frontPage').attr('class', 'hide');
			$('#informationPage').attr('class', 'effect show')
		}, 300);
       //console.log(data); 
//        var currentContact=JSON.parse(localStorage.getItem("currentCantact"));
//        console.log(currentContact);
        //console.log(contactdata[data].name.familyName);
        var infoForm=$('.infoForm');
        if(infoForm){
            $('.infoForm').remove();
        }
        $('#informationPage').append('<form class="infoForm"></form');
        var input='<h1>Contact</h1>';
        	input+='<div class="formbox">';
            input+='<label for= "firstname" >firstname : </label>';
            input+='<input type="text" name="firstname" value="'+contactdata[data].name.givenName+'">';
            input+='<label for= "lastname" >lastname : </label>';
            input+='<input type="text" name="lastname" value="'+contactdata[data].name.familyName+'">';
            
        for(var i=0;i<contactdata[data].addresses.length;i++){
//            var streetAddress=contactdata[data].addresses[i].streetAddress;
//            var noSpaceAddress=streetAddress.replace(/\s+/g, '');  
            input+='<label for= "street" >street : </label>';
            input+='<input type="text" name="street" value="'+contactdata[data].addresses[i].streetAddress+'">';
            input+='<label for= "city" >city : </label>';
            input+='<input type="text" name="city" value="'+contactdata[data].addresses[i].locality+'">';
            input+='<label for= "state" >state: </label>';
            input+='<input type="text" name="state" value="'+contactdata[data].addresses[i].country+'">';
        }
        if(contactdata[data].phoneNumbers.length!=0){
            for(var i=0;i<contactdata[data].phoneNumbers.length;i++){
                input+='<label for= "phone" >phone: </label>';
                input+='<input type="text" name="phone" value='+contactdata[data].phoneNumbers[i].value+'>';
            }
        }else{
             input+='<label for= "phone" >phone: </label>';
             input+='<input type="text" name="phone" value="">';
            
        }
        for(var i=0;i<contactdata[data].emails.length;i++){
            input+='<label for= "email" >email: </label>';
            input+='<input type="text" name="email" value="'+contactdata[data].emails[i].value+'">';
        }
            
            input+='</div>';
            input+='<span class="editbtn">Save</span>'
            input+='<span class="backbtn">Back</span>'
        $('.infoForm').append(input);
         //add back btn
       // $('btn').bind('click' ,app.loadLocal);
        
        if (app.detectTouchSupport()) {
			
                 $('.editbtn, .backbtn').bind('touchend', app.handleTouchEnd);
                 $('.editbtn').bind('tap', app.editinfo);
                 $('.backbtn').bind('tap', app.backToFront);
                //console.log('tap');
                 
        }else{
                $('.editbtn').bind('click',app.editinfo);
                $('.backbtn').bind('click', app.backToFront);
                //console.log('click');
             }                 
       
    },
    editinfo:function(ev){
        ev.preventDefault();
        var currentContact=JSON.parse(localStorage.getItem("currentCantact"));
        //var infoEdit=[];
        var inputLength=$('input').length
   
//        console.log(inputLength);
      //  for(var i=0; i<$('input').length;i++ ){
            contactdata[data].name.givenName=$('input:eq(0)').val();
            contactdata[data].name.familyName=$('input:eq(1)').val();
            contactdata[data].addresses[0].streetAddress=$('input:eq(2)').val();
            contactdata[data].addresses[0].locality=$('input:eq(3)').val();
            contactdata[data].addresses[0].country=$('input:eq(4)').val();
          
            contactdata[data].phoneNumbers[0].value=$('input:eq(5)').val();
            contactdata[data].emails[0].value=$('input:eq(6)').val();
      //  }
        

         contactdata[data].save(app.onSaveSuccess,app.onSaveError);
        
//              var currentContactText=JSON.stringify(currentContact)
//             localStorage.setItem('currentCantact',currentContactText);
//             var old =localStorage.getItem("currentCantact");
//           console.log(old);
        
    },
    
    backToFront:function(){
       	
        $('#informationPage').attr('class', 'fadeout2');
       
		
		setTimeout(function(){
		     
			 $('#informationPage').attr('class', 'hide');
            $('#frontPage').attr('class', 'effect2 show');
			
		}, 300);
		
        app.findContact();
        
    },
    
    loadLocal:function(){
       /* var currentContact=JSON.parse(localStorage.getItem("currentCantact"));*/
         var contactName=$('.contactName');
        if(contactName){
            $('.contactName').remove();
        }
        $('#frontPage').append('<ul class="contactName"></ul>');
        for(var i=0; i<currentContact.length;i++ ){
                     
                        $('.contactName').append("<li data-i='"+i+"'><a href='#'>"+currentContact[i].firstname+" "+currentContact[i].lastname+"</a></li>");
                       
                     }
         if (app.detectTouchSupport()) {
                 $('li').bind('touchend', app.handleTouchEnd);
                 $('li').bind('tap', app.showDetails);
                //console.log('tap');
                 
            }else{
                $('li').bind('click',app.showDetails);
                //console.log('click');
            }
    },
    


showgelocation:function(){
    navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
 },
      
onSuccess :function(position){
            console.log("lat: "+position.coords.latitude);
            console.log("lon: "+position.coords.longitude);
            lat=position.coords.latitude;
            lon=position.coords.longitude;
            //loadPags();
                    var request = new XMLHttpRequest();
        request.open('GET', 'http://open.mapquestapi.com/geocoding/v1/reverse?' + 
'key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=' +
lat + ',' + lon, true);
        request.onreadystatechange = function(){
             if (request.readyState ===4){
                 if(request.status===200||request.status===0){
                     //console.log(request.responseText);
//                     var books= JSON.parse(request.responseText);
//                     for(var i=0; i<books.length;i++ ){
//                         
//                         document.querySelector('.received').innerHTML=books[i].Title;
//                         
//                     }
                    city =JSON.parse(request.responseText);
                    app.addContact();
                    console.log(city);
                     // console.log(city.results[0].locations[0].street);
                 }
             }
        };
        request.send();
        
},
onError: function(error){
	//alert('Fail to get your location');
            console.log('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            app.addContact();
},

addContact:function (){
      
	  
      //  $('#frontPage').attr('class', 'hide');
       // $('#informationPage').attr('class', 'show');
	    $('#frontPage').attr('class', 'fadeout');
		
		setTimeout(function(){
			$('#frontPage').attr('class', 'hide');
			$('#informationPage').attr('class', 'effect show')
		}, 300);
       //console.log(data); 
//        var currentContact=JSON.parse(localStorage.getItem("currentCantact"));
//        console.log(currentContact);
        //console.log(contactdata[data].name.familyName);
        //console.log(city);
        var infoForm=$('.infoForm');
        if(infoForm){
            $('.infoForm').remove();
        }
        $('#informationPage').append('<form class="infoForm"></form');
            var input='<h1>+ New Contact</h1>';
			 input+='<div class="formbox">';
            input+='<label for= "firstname" >firstname : </label>';
            input+='<input type="text" name="firstname" value="">';
            input+='<label for= "lastname" >lastname : </label>';
            input+='<input type="text" name="lastname" value="">';
//            var streetAddress=contactdata[data].addresses[i].streetAddress;
//            var noSpaceAddress=streetAddress.replace(/\s+/g, '');  
         if(city === undefined){
             input+='<label for= "street" >street : </label>';
            input+='<input type="text" name="street" value="">';
            input+='<label for= "city" >city : </label>';
            input+='<input type="text" name="city" value="">';
            input+='<label for= "state" >state: </label>';
            input+='<input type="text" name="state" value="">';

         }else{

            input+='<label for= "street" >street : </label>';
            input+='<input type="text" name="street" value="'+city.results[0].locations[0].street+'">';
            input+='<label for= "city" >city : </label>';
            input+='<input type="text" name="city" value="'+city.results[0].locations[0].adminArea5+'">';
            input+='<label for= "state" >state: </label>';
            input+='<input type="text" name="state" value="'+city.results[0].locations[0].adminArea3+'">';

         }
        
            input+='<label for= "phone" >phone: </label>';
            input+='<input type="text" name="phone" value="">';
            
            input+='<label for= "email" >email: </label>';
            input+='<input type="text" name="email" value="">';
            input+='</div>';
            input+='<span class="save">Save</span>'
			input+='<span class="backbtn">Back</span>'
			
        $('.infoForm').append(input);
         //add back btn
       // $('btn').bind('click' ,app.loadLocal);
        
        if (app.detectTouchSupport()) {
                 $('.save, .backbtn').bind('touchend', app.handleTouchEnd);
			     $('.backbtn').bind('tap', app.backToFront);
                 $('.save').bind('tap', app.saveContact);
                //console.log('tap');
                 
        }else{
			     $('.backbtn').bind('click', app.backToFront);
                $('.save').bind('click', app.saveContact);
                //console.log('click');
             }   

    },
    saveContact:function(){

                    var contact = navigator.contacts.create();

                             var name = new ContactName();
                            
                         if ($('input:eq(0)').val() == '') {
                            name.givenName = ' ';
   
                         }else{
                            
                            name.givenName = $('input:eq(0)').val();
                         }
                         if ($('input:eq(1)').val() == '') {

                            name.familyName =$('input:eq(1)').val(' ');
                         }else{

                             name.familyName =$('input:eq(1)').val();
                         }
                         
                             var addresses=[];
                             if($('input:eq(2)').val()==''){
                               var street = ' ';
                             }else{
                                var street = $('input:eq(2)').val();
                             }
                             if($('input:eq(3)').val()==''){
                               var nowcity = ' ';
                             }else{
                                var nowcity = $('input:eq(3)').val();
                             }
                             if($('input:eq(4)').val()==''){
                               var state = ' ';
                             }else{
                                var state = $('input:eq(4)').val();
                             }
                             addresses[0]=new ContactAddress('type','home','streetAddress',street,nowcity,' ',' ',state);
                          
                            console.log(addresses);
                            
                            var phoneNumbers =[];
                            if($('input:eq(5)').val()==''){
                               phoneNumbers[0] =new ContactField('mobile',' ');
                            }else{
                                phoneNumbers[0] =new ContactField('mobile',$('input:eq(5)').val());
                            }
                             
                         
           
                            
                        
                             console.log(phoneNumbers);
                         
                            var emails=[];
                            if($('input:eq(6)').val()==''){
                                emails[0] =new ContactField('home',' ');
                             
                            }else{
                                emails[0] =new ContactField('home',$('input:eq(6)').val());
                            }
                         

                            

                         
                             contact.name = name;
                             contact.phoneNumbers = phoneNumbers;
                             contact.addresses = addresses;
                             contact.emails = emails;
                            
                             contact.save(app.onSaveSuccess,app.onSaveContactError);
                          
    },
    onSaveContactSuccess:function(){
      

        app.backToFront();
    },
   

/*================================================================================================*/
    offline:function(){
        alert('offLine');
    },
    
    findContactError: function (contactError) {
                alert('onError!');
    },
    handleTouchEnd:function (ev) {
    //pass the touchend event directly to a click event

    ev.preventDefault();
    var target = ev.currentTarget;
    target.dispatchEvent(tap);
    //this will send a click event from the touched tab to the function handleLinkClick
    },
    
    
    detectTouchSupport :function () {
    msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
    touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
    return touchSupport;
    },
    onSaveSuccess: function (contact) {
        var notification =$('#informationPage .notification');
        if(notification){
           $('#informationPage .notification').remove();
        }
         $('#informationPage').append('<div class="notification">Contact Saved</div>');
        setTimeout(function(){$('#informationPage .notification').remove();},2000);
        
    },

    // onSaveError: Failed to get the contacts
    //
    onSaveError:function (contactError) {
        console.log("Error = " + contactError.code);
    }
};


(function init() {
     app.initialize();
})();