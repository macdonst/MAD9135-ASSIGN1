/**
 * get location add to contact field
 */
var contactLocation = {
    street: null, address: null, state: null,
    success: false, 
    init: function(){
        console.log("contact location worked");   
    },
getLocation: function(){
       
        navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback);   
    },
    successCallback: function(position) {
        
        console.log( position.coords.latitude +  position.coords.longitude);
      
        var request = XMLHttpRequest();
        request.open("GET", "http://open.mapquestapi.com/geocoding/v1/reverse?" + "key=Fmjtd|luur2hurn0%2Cbg%3Do5-9wasly&location=" +
        position.coords.latitude + "," + position.coords.longitude);
            
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {
                        var maps = JSON.parse(request.responseText);
                        //console.log(maps.results[0].locations[0].adminArea5);
                       
                        // add map info to response
                        var response = maps.results[0].locations[0];
                        
                         
                        contactLocation.street = response.street; 
                        contactLocation.city = response.adminArea5; 
                        contactLocation.state = response.adminArea3;
                        
                        var event = document.createEvent('Event');
                        event.initEvent('contactLocationReady', true, true);
                        document.dispatchEvent(event);
                        contactLocation.success = true;
                    }
                }
            },
        request.send();
    },
    gotLocation: function(){
        return this.success;   
    },

     errorCallback: function(error) {
      alert(error.code);
    },
    
}