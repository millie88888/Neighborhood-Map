    function fMarker(name, lat, long, type, content) {
      this.name = ko.observable(name);
      this.lat = ko.observable(lat);
      this.long = ko.observable(long);
      this.type = type;
      this.content = content;
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        content: content,
        draggable: true
      });
      


      this.marker.addListener('click', function() {
        infowindow.setContent('<div><strong>' + this.title + '</strong></div>' + '<div>' + this.content + '</div><div id="pano"></div>');
        infowindow.open(map, this);
      });

    };


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(38.9926756, -77.02641129999999),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var infowindow = new google.maps.InfoWindow();




    // Constructor function
    var ViewModel = function() {
      this.points = ko.observableArray([
        new fMarker('Ikko Sushi', 38.99119779999999, -77.02930119999999, 'restaurant', 'WOW!I am a Japanese restaurant'),
        new fMarker('Kung Fu Tea', 38.9970677, -77.0269637, 'drink', 'WOW!I am a Greek restaurant'),
        new fMarker('Olazzo italian', 38.9926756, -77.02641129999999, 'restaurant', 'WOW!I am a Italian restaurant')
      ]);

      this.typeToShow = ko.observable('all');

      this.markersToShow = ko.computed(function() {
        var desiredType = this.typeToShow();
        if (desiredType == 'all') { 

          this.points().forEach(function(point) {
            point.marker.setVisible(true);
          });

          return this.points();
        }
        return ko.utils.arrayFilter(this.points(), function(point) {
          var match = point.type === desiredType; // true or false
          
          point.marker.setVisible(match); // true or false

        //  console.log('comparing ' + point.type + ' to ' + desiredType);
          return match;
        });

      }, this);


    };

    function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
};
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
};

    var viewModel = new ViewModel();


    ko.applyBindings(viewModel);



