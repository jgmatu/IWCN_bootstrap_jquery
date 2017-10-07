const API_KEY = '';
const PLACE = "Madrid";
const MAXIMAGES = 12;
const WAIT = 500;
const SIZE = 4;

// Carousel Auto-Cycle
$(document).ready(function() {
      $('.carousel').carousel({
            interval: 6000
      });
      setImagesContent();
});

function requestFlickr (url, func) {
      $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback : "jsonFlickrApi",
            success: func,
            fail : function( error ) {
                  console.log("Request flickr error : " + error);
            }
      });
}

function setImagesContent() {
      var url = 'https://api.flickr.com/services/rest/?method=flickr.places.find&api_key='+ API_KEY +'&query='+ PLACE + '&format=json';

      // Get Place...
      requestFlickr(url, function(json){
            if (json.stat === "ok") {
                  setImagesPlace(json.places.place[0].place_id);
            } else {
                  console.log("Error bad place...");
            }
      });
}

function setImagesPlace( place_id ) {
      var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+API_KEY+"&place_id="+place_id+"&format=json";
      requestFlickr(url, function(json){
            if (json.stat === "ok") {
                  setPhotosResource(json.photos.photo.slice(0, MAXIMAGES));
            } else {
                  console.log("Error bad id place to photos...");
            }
      });
}

function setPhotosResource( images ) {
      var domImages = getDOMImages();
      var idx = 0;

      var intervalId = setInterval(function() {
            getImageFlikr(images[idx].id, domImages, idx);

            if (idx >= MAXIMAGES - 1) {
                  clearInterval(intervalId);
            } else {
                  idx++;
            }
      }, WAIT);
}

function getImageFlikr( image_id, domImages, idx ) {
      var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+API_KEY+"&photo_id="+image_id+"&format=json&";

      requestFlickr(url, function(json) {
            if (json.stat === "ok") {
                  $(domImages[idx]).attr('src', json.sizes.size[SIZE].source);
                  $(domImages[idx]).addClass("img-responsive");

            } else {
                  console.log("Error get Image flickr...");
            }
      });
}

function getDOMImages() {
      var images = [];

      $("img").each(function(){
            images.push(this);
      });
      console.log(images);
      return images;
}
