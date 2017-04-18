$( document ).ready(function() {//  D3 here
   // console.log( "ready!" );
    var widthScale = d3.scaleLinear().domain([0, 6000]).range([0, 360]);﻿
    var xAxis = d3.axisBottom(widthScale);

    //d3.select("grad1").append().call(axis);
      

      var canvas = d3.select("#grad1").append("svg")
                                  .attr("height","100%")                             
                                  .attr("width","100%");

      var circle = canvas.append("circle").attr("cx",50).attr("cy",50).attr("r",25);                             
      
      var bar = canvas.append("rect").attr("height","100%").attr("width","3px").attr("fill","white").attr("x",0);//la barrita que mide
     // circle.transition().duration(1500).attr("r",300);
         canvas.call(xAxis);
   

      

});
            //variables for safety descriptions
                        var descriptions = [
                                                {description : "Peaceful (very under average)", detail: "Dalai lama would choose this place!"},//<1000
                                                {description : "Very safe (under average)", detail: "People around seems kind and peaceful."},    //1000-2000
                                                {description : "Safe (average)", detail: "Just an average place in Chicago."},          //2000-3000
                                                {description : "Not so safe (slightly over average)", detail: "Some bad people likes to visit this area."},   //3000-4000
                                                {description : "Somewhat unsafe (over average)", detail: "Breaking the law is an everyday thing around here."},    //4000-5000
                                                {description : "Unsafe (very over average)", detail: "Officers are always busy here."},              //5000-6000
                                                {description : "Very Unsafe (even more over average)", detail: "Criminals likes this place also. take care!"}      //>6000   
                                            ];

                                            /*var typeofcrimes = ["OTHER OFFENSE","BATTERY","DECEPTIVE PRACTICE","THEFT","BURGLARY","CRIMINAL TRESPASS","ROBBERY","STALKING","NARCOTICS","CRIM SEXUAL ASSAULT","SEX OFFENSE","CONCEALED CARRY LICENSE VIOLATION","GAMBLING",
                            "MOTOR VEHICLE THEFT","CRIMINAL DAMAGE","HOMICIDE","ASSAULT","OFFENSE INVOLVING CHILDREN","PUBLIC PEACE VIOLATION","WEAPONS VIOLATION","INTIMIDATION","PUBLIC INDECENCY","OTHER NARCOTIC VIOLATION",
                              "NON-CRIMINAL","INTERFERENCE WITH PUBLIC OFFICER","ARSON","KIDNAPPING","LIQUOR LAW VIOLATION","PROSTITUTION","OBSCENITY","NON-CRIMINAL (SUBJECT SPECIFIED)","HUMAN TRAFFICKING"];
                                  var amountOfCrimes = [typeofcrimes.length];*/



            //variables for map and marks
            var elevator;
            var map;
            // 2-level array for washed markets data
            var washedData = [];
            var washedCrimes = [];
            var crimetypes = [];
            var totalcrimes =0;
            var   cityCircle;
            var image = 'imgs/'+'casita' + '.png';

            var color = d3.scaleLinear().domain([0, 6000]).range(['yellow', 'red']);﻿

           

           // console.log(d3);
           var sitecoords;
            var coords = {lat: 41.8708, lng: -87.6505};
             sitecoords = coords;
               var rad = function(x) {
             return x * Math.PI / 180;
                                      };

                                      var prev_cityCircle ;

                    function removeCircle() {
                         prev_cityCircle.setMap(null);
                                        }


           


            var getDistance = function(coords, sitecoords) 
            {
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(sitecoords.lat - coords.lat);
            var dLong = rad(sitecoords.lng - coords.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(coords.lat)) * Math.cos(rad(sitecoords.lat)) *
             Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
             return d; // returns the distance in meter
            };


     function initMap() {
    
      var mapDiv = document.getElementById('map'); //Line 1: Save reference to div element where map would be shown

      var map = new google.maps.Map(mapDiv, {//Line 2: Create Map object passing element reference, center and zoom as parameters
      center: {lat: 41.8708, lng: -87.6505}, //This is Purdue University's Location
      zoom: 13});

      var marker = new google.maps.Marker({ //Line 1
      position: {lat: 41.8708, lng: -87.6505}, //Line2: Location to be highlighted
      map: map,//Line 3: Reference to map object
      title: 'Department of Computer Science – University of Illinois' //Line 4: Title to be given
      })
      var infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
     //cargarCrimenes();


       //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();

    //json format data resource url
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            
            // document.getElementById("text").innerHTML += json.data.length;

             for (var i = 0; i<json.data.length; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][19]);
                //longitude - 1
                dataLine.push(json.data[i][20]);
                //name - 2
                dataLine.push(json.data[i][11]);
                //type -3
                dataLine.push(json.data[i][10]);
                //street - 4
                dataLine.push(json.data[i][12]);
                //ZIP-5
                 dataLine.push(json.data[i][13]);
                //phone - 6
                dataLine.push(json.data[i][14]);
                //distance -7 
                           sitecoords = {lat: Number(dataLine[0]), lng: Number(dataLine[1])};
                           var placedistance =(getDistance(coords,sitecoords)) ;
                           var roundedDistance = Math.round((placedistance)/10) / 100;
                dataLine.push(roundedDistance);
                if (Number(dataLine[0])==0)continue;//remove trash data
               
                washedData.push(dataLine);

             //   document.getElementById("text").innerHTML = getDistance(coords,sitecoords);
               
        
       var trHTML = '<tr href = "#map" onclick="centrarMapa(this.firstChild.innerHTML);"><td >' + dataLine[2] + 
                    '</td><td>' + dataLine[3] +
                     '</td><td>' + dataLine[6] +
                      '</td><td>' + dataLine[4] + 
                      '</td><td>' + dataLine[7] + '</td></tr>';
    
    
          $('#placetable').append(trHTML);
              

            };
            //llenar la tabla


            var numberOfMarkets = washedData.length;
            var markers = [];
             

            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService

            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding 20 markers to the map at random locations
            var locations = [];
            for (var j = 0; j < numberOfMarkets; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);

            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            title: washedData[key][2],
                            icon: image

                        });
////////////////////////////////////////////////////
                                
                                  google.maps.event.addDomListener(document.getElementById("placetable"), 'click', function(){//localizar desde la tabla
                            setTimeout(function() {
                                                      map.setCenter(sitecoords);  
                                                      //detalleCrimenes(sitecoords,totalcrimes);
                                                    }, (10 * 100));
                            
                          })
                          
                          
                          

                          google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();

                            }


                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            //set the menu information about the market
                          
                                
                           
                               if (prev_cityCircle != null) {removeCircle();} //remover circulo anterior
                            
                            document.getElementById("place-name").innerHTML = "<b>Place Name</b>: " + washedData[key][2] + "</em>";

                            document.getElementById("placetype").innerHTML = "<b>Property type</b>: <em>" + washedData[key][3] + "</em>";
                            document.getElementById("address1").innerHTML = "<b>Address</b>: <em>" + washedData[key][4] + "</em>";
                            document.getElementById("zip").innerHTML = "<b>ZIP-code</b>: <em>" + washedData[key][5] + "</em>";
                            document.getElementById("phone").innerHTML = "<b>Phone</b>: <em>" + washedData[key][6] + "</em>";
                            document.getElementById("distance").innerHTML = "<b>Distance</b>: <em>" + washedData[key][7]+ "Km away from Computer Science Department</em>";
                                     
                                    sitecoords = {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])};
                                    
                                    //crimes
                                    $("#crimetable td").remove(); //limpia la tabla de crimenes
                                     totalcrimes = 0 ;
                                      for (var j = 0; j<crimetypes.length ;j+=2) crimetypes[j+1]=0;//resetear tabal de crimenes
                                    
                                     for (var i = 0; i<washedCrimes.length; i++) {
                                          var crimecoords = {lat: Number(washedCrimes[i][0]), lng: Number(washedCrimes[i][1])};
                                          var distance=getDistance(sitecoords,crimecoords)
                                          
                                        

                                          //$("#crimetable td").remove(); //limpia la tabla de crimenes
                                          if(distance<=1000) {
                                            totalcrimes++;
                                             

                                          }

                                     }
                                     // detalleCrimenes(sitecoords,totalcrimes); 
                                    


                                     document.getElementById("text").innerHTML += "   totalcrimes:"+totalcrimes+"\n";
                                     document.getElementById("place-name-crimes").innerHTML = "<b>Crime rates in the area</b> (1Km around): <em>" + totalcrimes + "</em>";

                                      var k =(totalcrimes/1000);
                                      if (k>6) {k=6.25};
                                      document.getElementById("description").innerHTML =  descriptions[parseInt(k)].description;
                                       document.getElementById("detail").innerHTML = descriptions[parseInt(k)].detail;
                                       
                                    //  d3.select("#grad1").attr("width", (totalcrimes/100)+"%");
                                      d3.selectAll("rect").transition().duration(500).attr("x",(k*60)+"px")



                                     

                                      //se dibuja el circulo
                                    cityCircle = new google.maps.Circle({
                                                             strokeColor: color(totalcrimes),
                                                             strokeOpacity: 0.8,
                                                             strokeWeight: 2,
                                                             fillColor: color(totalcrimes),
                                                             fillOpacity: 0.65,
                                                             map: map,
                                                             center: sitecoords,
                                                             radius: 1000

                                     }); 
                                  prev_cityCircle=cityCircle;




                                  
                        });
                

                    });
                 }

            });

        });



      }//status=200bracket
      
      }
      
     

     // document.getElementById("text").innerHTML += "noo";
      

  }


  function cargarCrimenes(){

       //create a new httprequest for this session

                                      var xmlhttp = new XMLHttpRequest();
                                      //json format data resource url
                                      var url = "https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD";
                                      xmlhttp.open("GET", url, true);
                                      xmlhttp.send();

                                      //once the request is accepted, process the fowllowing function to get data and complete the app information
                              xmlhttp.onreadystatechange = function() {
                                  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

 
                                     var myArr = xmlhttp.responseText;
                                 
                                      var text = myArr;
                                    json = JSON.parse(text);
                                      var trash=0;
                                     

                                   

                                               for (var i = 0; i<json.data.length; i++) {
                                                                    
                                                var dataLine = [];
                                                //latitude - 0
                                                dataLine.push(json.data[i][22]);
                                                //longitude - 1
                                                dataLine.push(json.data[i][23]);
                                                
                                                //type-2
                                                dataLine.push(json.data[i][12]);
                                              
                                                 if (Number(dataLine[1])==0){trash++;continue;}//remove trash data
                                              if (!contains(crimetypes,json.data[i][12])) {//loading type of crime
                                              // var crimeobject = {type:json.data[i][12],amount:0 };//type of crime and amount
                                                crimetypes.push(json.data[i][12],0);
                                              
    
    
                                                //   $('#crimetable').append(trHTML);
                                              };

                                                washedCrimes.push(dataLine);

                                             

                                            };
                                              $(".loader").hide();$(".loader2").hide();
                                               document.getElementById("text").innerHTML += Number(json.data.length)-trash;

                                                                                          }
                  }


  }





function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td,td2, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  //maxVal = Number(document.getElementById("myInput2").value);
  //minVal = Number(document.getElementById("myInput3").value);
  table = document.getElementById("placetable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[4];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1
         || td2.innerHTML.toUpperCase().indexOf(filter) > -1 
     //   && (Number(td3.innerHTML) <= maxVal)
      //   && (Number(td3.innerHTML) >= minVal)
         ){
          //document.getElementById("text").innerHTML=maxVal;
        tr[i].style.display = "";
        }
       else {
        tr[i].style.display = "none";
      }
    }
  }
}

        function centrarMapa(placename){
      for (var i = 0; i < washedData.length; i++) {
        if (washedData[i][2]==placename) {
          sitecoords = {lat: Number(washedData[i][0]), lng: Number(washedData[i][1])};

          break;
          
        };
        
      };
     }

function detalleCrimenes(sitecoords,totalcrimes){

   $("#crimetable td").remove(); //limpia la tabla de crimenes
        for (var j =0; j<crimetypes.length ;j+=2) crimetypes[j+1]=0;//resetear tabal de crimenes
                                    
                                     for (var i = 0; i<washedCrimes.length; i++) {
                                          var crimecoords = {lat: Number(washedCrimes[i][0]), lng: Number(washedCrimes[i][1])};
                                          var distance=getDistance(sitecoords,crimecoords)
                                          
                                       //   var cantidad = new array(crimetypes.length);

                                          //limpia la tabla de crimenes
                                          if(distance<=1000) {
                                            totalcrimes++;

                                           for (var j =0; j<crimetypes.length ;j+=2) {
                                              if(crimetypes[j] == washedCrimes[i][2]){  crimetypes[j+1]++;
                                                   break;     }
                                            };

                                          }

                                     }
                                     for (var i = 0; i < crimetypes.length; i+=2) {
                                      if(crimetypes[i+1]!=0)
                                      { var trHTML = '<tr><td>' + crimetypes[i] + '</td><td>' + crimetypes[i+1] + '</td></tr>';
                                                                              $('#crimetable').append(trHTML);}
                                     };
                                      
}