
            // 2-level array for washed markets data
            var washedData = [];

            	//X1-ZWz1fqgyly9wy3_2t4xn
                //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url
       var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd

        } 


        if(mm<10) {
            mm='0'+mm
        } 
        var startdate = yyyy+'-'+mm+'-'+(dd-5);
        today = yyyy+'-'+mm+'-'+(dd);
       // document.write(today);
  // var url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1fqgyly9wy3_2t4xn&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA&output=json";
    var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datacategoryid=TEMP&datasetid=GHCND&stationid=GHCND:USC00110442&locationid=CITY:US170006&startdate="+startdate+"&enddate="+today+"&limit=500&sortfield=date&sortorder=desc";
  // http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<X1-ZWz1fqgyly9wy3_2t4xn>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
  // var url ="https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqgyly9wy3_2t4xn&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA"
              //create a new httprequest for this session
    
  xmlhttp.open("GET", url, true);
  
  xmlhttp.setRequestHeader("token", "BxdbNWpHSLkgXjwnVHLmfBrIfHOZBcWp");;
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            document.getElementById("text").innerHTML +=text;
            //alert(json.data[1][1]);
         /*   for (var i = 0; i < json.results.length; i++) {
              if (json.results[i].datatype=="TOBS")
             {   document.getElementById("text").innerHTML +="TOBS: " +json.results[i].value+"\n";
               //document.getElementById("text").innerHTML +=json.results[i];
               break;
             }
            };
            for (var i = 0; i < json.results.length; i++) {
              if (json.results[i].datatype=="TMAX")
             {   document.getElementById("text").innerHTML +="TMAX: " +json.results[i].value+"\n";
               //document.getElementById("text").innerHTML +=json.results[i];
               break;
             }
            };
            for (var i = 0; i < json.results.length; i++) {
              if (json.results[i].datatype=="TMIN")
             {   document.getElementById("text").innerHTML +="TMIN: " +json.results[i].value+"\n";
               //document.getElementById("text").innerHTML +=json.results[i];
               break;
             }
            };*/
            
        }

  }