// Initialize and add the map
let map;
let marker;

async function initMap() {
  
  // The location of IIT 41.83501696630514, -87.62700590209543
  const position = { lat: 41.83501696630514, lng: -87.62700590209543 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at ID
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "MAP_ID",
    
  }); 
  
  //creating a content box with info about ID and a wiki link 
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Institute of Design</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Institute of Design</b>, at the Illinois Institute of Technology, " +
    "founded as the New Bauhaus, is a graduate school" +
    "teaching systemic, human-centered design. " +
    "3137 S Federal St, Chicago, IL 60616 </p>" +
    '<p>Attribution: ID, <a href="https://en.wikipedia.org/wiki/IIT_Institute_of_Design">' +
    "https://en.wikipedia.org/wiki/IIT_Institute_of_Design</a></p>" +
    "</div>" +
    "</div>";
  
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "ID",
  });

  
 //Polygon overlay to show IIT campus area
  const polygonCoords = [
    { lat: 41.8394663080058, lng: -87.63006892091917 },
    { lat: 41.8397379108827, lng: -87.62349671028755 },
    { lat: 41.831076229105406, lng: -87.62327392348134 },
    { lat: 41.831046046955656, lng: -87.62984613409192 },
  ];
  
  // Construct the polygon.
  const collegePolygon = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: "#00FF00",
    strokeOpacity: 0.6,
    strokeWeight: 2,
    fillColor: "#00FF00",
    fillOpacity: 0.20,
  });

  collegePolygon.setMap(map);
  
  // The marker, positioned at ID 41.8376767217854, -87.6282752
  const image = "media/icon_ID_2.png";
  const collegeMarker = new google.maps.Marker({
    position: { lat: 41.8376767217854, lng: -87.6282752 },
    map: map,
    icon: image,
    title: "ID - MY COLLEGE",
    animation: google.maps.Animation.DROP,
  });
  
  collegeMarker.addListener("click", toggleBounce1);
     function toggleBounce1() {
      if (collegeMarker.getAnimation() !== null) {
        collegeMarker.setAnimation(null);
      } else {
        collegeMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  
 //click listener event to open info window   
  map.addListener('click', (mapsMouseEvent) =>  {
    infowindow.open({
    anchor: collegeMarker,
    map,
    });
  });
  
  //Adding a second marker
  const image2 = "media/icon_MTCC.png";
  const mtccMarker = new google.maps.Marker({
    position: { lat: 41.835, lng: -87.625 },
    map: map,
    icon: image2,
    title: "MTCC - COMMONS",
    animation: google.maps.Animation.DROP,
   });
  
  mtccMarker.addListener("click", toggleBounce2);
      function toggleBounce2() {
        if (mtccMarker.getAnimation() !== null) {
          mtccMarker.setAnimation(null);
        } else {
          mtccMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
  
  ////Adding a third marker
  const image3 = "media/icon_DORM.jpg";
  const dormMarker = new google.maps.Marker({
    position: { lat: 41.833, lng: -87.626 },
    map: map,
    icon: image3,
    title: "DORM - ROWE VILLAGE",
    animation: google.maps.Animation.DROP,
   });

  dormMarker.addListener("click", toggleBounce3);
    function toggleBounce3() {
      if (dormMarker.getAnimation() !== null) {
        dormMarker.setAnimation(null);
      } else {
        dormMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

  //Adding a 4th marker
  const image4 = "media/icon_STARB.png";
  const starMarker = new google.maps.Marker({
    position: { lat: 41.831, lng: -87.626 },
    map: map,
    icon: image4,
    title: "STARBUCKS",
    animation: google.maps.Animation.DROP,
  });
  
  starMarker.addListener("click", toggleBounce4);
    function toggleBounce4() {
      if (starMarker.getAnimation() !== null) {
        starMarker.setAnimation(null);
      } else {
        starMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  
  //Added biking layer
  const bikeLayer = new google.maps.BicyclingLayer();

  bikeLayer.setMap(map);
  
  //Daily path to ID
  const walkPlanCoordinates = [//dorm-mtcc-ID
    //dorm
    { lat: 41.833, lng: -87.626 },
    //road
    {lat: 41.8347434709631, lng: -87.62644779310664},
    {lat: 41.83472514520326, lng: -87.62597555057731},
    //mtcc
    { lat: 41.835, lng: -87.625 },
    //road2
    {lat: 41.8365796855249, lng: -87.62583781316438}, 
    {lat: 41.83642941845066, lng: -87.62652650018632},  
    {lat: 41.83641109318341, lng: -87.62790387425734}, 
    //ID
    { lat: 41.8376767217854, lng: -87.6282752 },
    ];
  
  const walkPath = new google.maps.Polyline({
    path: walkPlanCoordinates,
    geodesic: true,
    strokeColor: "#5A5A5A",
    strokeOpacity: 1.0,
    strokeWeight: 3,
   
  });

  walkPath.setMap(map);
  
  //Adding a 5th marker walking path
  const image5 = "media/icon_WALK.gif";
  const walkMarker = new google.maps.Marker({
    position: {lat: 41.83642941845066, lng: -87.62652650018632},
    map: map,
    icon: image5,
    title: "GOING TO ID",
    animation: google.maps.Animation.DROP,
  });
  
  // Select all social media buttons
  const socialButtons = document.querySelectorAll('.social-button');

  // Add click event listener to each button
  socialButtons.forEach((button) => {
    button.addEventListener('click', followOnSocialMedia);
  });

  // Function to follow on social media
  function followOnSocialMedia(event) {
    // Get the social media network (facebook, instagram, linkedin)
    const network = event.target.closest('.social-button').classList[1];
    // Open a new window with the social media profile
    switch (network) {
      case 'facebook':
        window.open('https://www.facebook.com/jasmine.sarin', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/jasminesarin/?hl=en', '_blank');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/sarinjasmine/', '_blank');
        break;
    }
  }
}

initMap();
