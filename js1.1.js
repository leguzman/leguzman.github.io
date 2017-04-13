

   var elevator;
            var map;
            // 2-level array for washed markets data
            var washedData = [];

            	//X1-ZWz1fqgyly9wy3_2t4xn
                //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url

   var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?&datasetid=NEXRAD3&locationid=CITY:US170006&startdate=2017-04-07&enddate=2017-04-07&limit=200";
  //  var url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01";
  // 
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader('token','BxdbNWpHSLkgXjwnVHLmfBrIfHOZBcWp');
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
           //document.getElementById("text").innerHTML += JSON.stringify(json.results);
          /*  var collectedData = [];
           collectedData = json;

           for (var i = 0; i<json.metadata.resultset.count; i++) {
                                                var dataLine = [];
                                                //latitude - 0
                                                dataLine.push(json.data[i][22]);
                                                //longitude - 1
                                                dataLine.push(json.data[i][23]);
                                                
                                                //type-2
                                                dataLine.push(json.data[i][12]);
                                              
                                                 //document.getElementById("text").innerHTML = dataLine[0] + " "+dataLine[1];
                                                washedCrimes.push(dataLine);

                                             //   document.getElementById("text").innerHTML = getDistance(coords,sitecoords);
                                              //document.getElementById("text").innerHTML += washedCrimes[i]  ;

                                            };*/
            }

    }