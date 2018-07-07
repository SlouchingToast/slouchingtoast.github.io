'use strict';

//to-do:
// - Map width 90% on mobile
// - Reduce space below Resources
// - pageTitle on left, link on right

//Global variables
let geocoder;
let map;
let service;
let markers = Array();
const infowindow = new google.maps.InfoWindow();

$(handleApp);

function handleApp() {
  initMap();
  listenSubmit();
  smoothScrolls();
}

//get nearby restaurants 
function getPlaces(loc){
    let address = `${loc}`
    //geocode user postal
    geocoder.geocode({'address':address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){ //if everything checks out
            $('html, body').animate({ //fluid scroll to map
                scrollTop: $('main').offset().top
            }, 1000);
            //add back 'hidden' attr if input valid
            $('#js-showErr').attr('hidden', true); 
            
            let addrLocation = results[0].geometry.location;
            map.setCenter(addrLocation);
            //store coords in hidden elements:
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            let type = "restaurant";
            let radius = "32000";
            let lat = document.getElementById('lat').value;
            let lng = document.getElementById('lng').value;
            let cur_location = new google.maps.LatLng(lat, lng);
            //request to Places
            let request = {
                location: cur_location,
                radius: radius,
                type: ['restaurant'],
                keyword: 'vegan'
            };
            service = new google.maps.places.PlacesService(map); 
            service.nearbySearch(request, displaySearchResults); 
        } else { 
            $('#js-showErr').removeAttr('hidden'); 
            const outputElem = $('#js-showErr');
            const errMsg =
                `<p>Please enter a valid location.</p>`
            ;
            outputElem.html(errMsg);
        }
    });
};

function displaySearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
        }
    }
}

function createMarkers(results, status){
    //iterate thru Places array to display Places and Details
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
        }
    }
}

function createMarker(obj){
    let contentString = `<strong>${obj.name}</strong> | <a href="https://www.google.com/maps/dir/?api=1&destination=${obj.name}&destination_place_id=${obj.place_id}" target="_blank">${obj.vicinity}</a>`;
    const image = 'images/favicon.png';
    let marker = new google.maps.Marker({
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
        infowindow.setOptions({maxWidth:200}); 

    })
    map.addListener('click', function(){
        infowindow.close(); //closes infowindow if empty map space clicked
    })
}

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        const locationGetter = $(event.currentTarget).find('#js-userLocation');
        const location = locationGetter.val();
        getPlaces(location); //push location to geoCoder, run getPlaces after
        $('#map').show(); //unhide map ID
    })
}

function smoothScrolls(){
    //Click handler for navbar and "top" button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#top').fadeIn();
            $('.navbar').fadeOut();
        } else {
            $('#top').fadeOut();
            $('.navbar').fadeIn();
        }
    });

    //Click event to scroll to top
    $('#top').click(function(){
        $('html, body').animate({scrollTop : 0}, 1000);
    });

    //Click event for resources
    $('.navbar-link').click(function(){
        $('html, body').animate({
            scrollTop: $('#resources').offset().top
        }, 1000);
    });
}

function initMap(){
    geocoder = new google.maps.Geocoder();
    
    var myOptions = { //custom map styling
        zoom: 10,
    };
    //generate new map at 'map' id in HTML
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    google.maps.event.addListenerOnce(map, 'idle', () => {
        document.getElementsByTagName('iframe')[0].title = "Google Maps";
    }) //set aria title to "Google Maps"
}