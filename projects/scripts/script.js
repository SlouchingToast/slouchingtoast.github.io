// 'use strict';

//TO-DO LIST
// - Change user location image
// - Change icon size
// - getDetails service needs revision to work
// (see https://developers.google.com/maps/documentation/javascript/places#place_details)
// - Marker infowindow not going away
// - Add <strong> to obj.name and <a href> to obj.vicinity
// - Hide map (grey box) until called (hidden attribute on div, remove hidden in call)
// - Change 'var' to appropriate 'var', 'let', 'const'
// - Implement auto scroll on submit
// - Not all results that normally come up in Google Maps search are showing
// - Stylize map
// - Finish Resources

//Global API variables
var geocoder;
var map;
var service;
var markers = Array();
var infowindow = new google.maps.InfoWindow();

$(handleApp);

function handleApp() {
  initMap();
  listenSubmit();
}

//get nearby restaurants 
function getPlaces(loc){
    console.log('getPlaces called');
    var address = `${loc}`
    console.log(address);
    //geocode user postal
    geocoder.geocode({'address':address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){ //if everything checks out
            var addrLocation = results[0].geometry.location;
            map.setCenter(addrLocation);
            //store coords in hidden elements:
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            //add new marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation, //from above
                map: map,
                title: results[0].formatted_address, //from Google API object
                icon: 'images/favicon.png'
            });
            var type = "restaurant";
            var radius = "32000";
            var lat = document.getElementById('lat').value;
            var lng = document.getElementById('lng').value;
            var cur_location = new google.maps.LatLng(lat, lng);
            //request to Places
            var request = {
                //placeId = place_id
                location: cur_location,
                radius: radius,
                types: [type],
                keyword: 'vegan'
            };
            service = new google.maps.places.PlacesService(map); 
            service.nearbySearch(request, displaySearchResults); 
        } else {
            alert('Please enter a valid postal code.')
        }
    });
};

function displaySearchResults(results, status) {
    // console.log(results);
    // console.log(status);
    // service.getDetails(results, displaySearchResults); //use getDetails service
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
            console.log(results[i]); 
        }
    }
}

function createMarkers(results, status){
    console.log('createMarkers called');
    //iterate thru Places array to display Places and Details
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
        }
    }
}

function createMarker(obj){
    var contentString = `${obj.name} | ${obj.vicinity}`;
    var image = 'images/favicon.png';
    var marker = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name,
        icon: image
    });
    markers.push(marker); //send to marks global var, which is an array
    //display info at marker:
    marker.addListener('click', function(){
        infowindow.setContent(contentString)
        infowindow.open(map, marker);

    })
    map.addListener('click', function(){
        infowindow.close();
        // if (currentInfoWindow != null) {
        //     currentInfoWindow.close();
        // }
        // infowindow.open(map, marker);
        // currentInfoWindow = infowindow; 
    })
    // infos.push(infowindow); //send to infos global var, which is an array
}

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        const locationGetter = $(event.currentTarget).find('#js-userPostal');
        const location = locationGetter.val();
        getPlaces(location); //push location to geoCoder, run getPlaces after
    })
}

function initMap(){
    geocoder = new google.maps.Geocoder();
    var myOptions = { //custom map styling
        zoom: 10,
    };
    //generate new map at 'map' id in HTML
    map = new google.maps.Map(document.getElementById('map'), myOptions);
}