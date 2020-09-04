( function($){
    "use strict";
    //Register Service Worker
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        });
    }

    function updateTime(k) { /* appending 0 before time elements if less than 10 */
        if (k < 10) {
          return "0" + k;
        }
        else {
          return k;
        }
      }

    //API Manipulation using fetch
    
    async function getData(){
        let response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-6.82&lon=39.27&appid=7898d671dd9be08e76654b2391592e1f&units=metric');
        let data = await response.json();
        return data;
    }

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var short_days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var i = undefined;

    getData().then((data) => {
        localStorage.setItem("mydata", JSON.stringify(data));
    
       //Getting time information
       var date = new Date(data.current.dt * 1000), /* creating objects of Date class */
            date0 = new Date(data.hourly[0].dt * 1000),
            date1 = new Date(data.hourly[12].dt * 1000),
            date2 = new Date(data.hourly[24].dt * 1000),
            date3 = new Date(data.hourly[47].dt * 1000);

       var hour = date.getHours(),
            hour0 = date0.getHours(),
            hour1 = date1.getHours(),
            hour2 = date2.getHours(),
            hour3 = date3.getHours();

       var min = date.getMinutes(),
            min0 = date0.getMinutes(),
            min1 = date1.getMinutes(),
            min2 = date2.getMinutes(),
            min3 = date3.getMinutes();

       var midday, midday0, midday1, midday2, midday3 = "AM";

       midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
       midday0 = (hour0 >= 12) ? "PM" : "AM"; 
       midday1 = (hour1 >= 12) ? "PM" : "AM"; 
       midday2 = (hour2 >= 12) ? "PM" : "AM"; 
       midday3 = (hour3 >= 12) ? "PM" : "AM"; 

       hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
       hour0 = (hour0 == 0) ? 12 : ((hour0 > 12) ? (hour0 - 12): hour0);
       hour1 = (hour1 == 0) ? 12 : ((hour1 > 12) ? (hour1 - 12): hour1);
       hour2 = (hour2 == 0) ? 12 : ((hour2 > 12) ? (hour2 - 12): hour2);
       hour3 = (hour3 == 0) ? 12 : ((hour3 > 12) ? (hour3 - 12): hour3);

       hour = updateTime(hour);
       hour0 = updateTime(hour0);
       hour1 = updateTime(hour1);
       hour2 = updateTime(hour2);
       hour3 = updateTime(hour3);

       min = updateTime(min);
       min0 = updateTime(min0);
       min1 = updateTime(min1);
       min2 = updateTime(min2);
       min3 = updateTime(min3);

       var day = days[ date.getDay() ],
            short_d0 = short_days[ date0.getDay() ],
            short_d1 = short_days[ date1.getDay() ],
            short_d2 = short_days[ date2.getDay() ],
            short_d3 = short_days[ date3.getDay() ],
            month = months[ date.getMonth() ],
            d = date.getDate(),
            year = date.getFullYear();
       document.getElementById("day").innerText = day;
       document.getElementById("date").innerText = month + ", " + d + " " + year;

       // Creating images source
       var src = 'http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'.png',
           img = document.createElement('img'),
           src2 = 'http://openweathermap.org/img/wn/'+data.hourly[0].weather[0].icon+'.png',
           img2 = document.createElement('img'),
           src3 = 'http://openweathermap.org/img/wn/'+data.hourly[12].weather[0].icon+'.png',
           img3 = document.createElement('img'),
           src4 = 'http://openweathermap.org/img/wn/'+data.hourly[24].weather[0].icon+'.png',
           img4 = document.createElement('img'),
           src5 = 'http://openweathermap.org/img/wn/'+data.hourly[47].weather[0].icon+'.png',
           img5 = document.createElement('img');

           img.src  = src;
           img2.src = src2;
           img3.src = src3;
           img4.src = src4;
           img5.src = src5;
           img.alt  = "image1";
           img2.alt = "image2";
           img3.alt = "image3";
           img4.alt = "image4";
           img5.alt = "image5";

        //Assigning data to elements
           document.getElementById("title").innerText = data.timezone.substring(data.timezone.indexOf("/") + 1);
           document.getElementById("wind-icon").appendChild(img);
           document.getElementById("wi-1").appendChild(img2);
           document.getElementById("wi-2").appendChild(img3);
           document.getElementById("wi-3").appendChild(img4);
           document.getElementById("wi-4").appendChild(img5);
           document.getElementById("degree").innerText = data.current.temp;
           document.getElementById("descript").innerText = data.current.weather[0].description;
           document.getElementById("wind").innerText = "ESE "+data.current.wind_speed+" mph";
           document.getElementById("humidity").innerText = data.current.humidity+"%";
           document.getElementById("pressure").innerText = data.current.pressure+" in";
           document.getElementById("cloud").innerText = data.current.clouds+"%";
           document.getElementById("clock-time").innerText = hour + " : " + min + " " + midday;
           document.getElementById("time1").innerText = short_d0 + "," + hour0 + ":" + min0 + " "+ midday0;
           document.getElementById("time2").innerText = short_d1 + "," + hour1 + ":" + min1 + " "+ midday1;
           document.getElementById("time3").innerText = short_d2 + "," + hour2 + ":" + min2 + " "+ midday2;
           document.getElementById("time4").innerText = short_d3 + "," + hour3 + ":" + min3 + " "+ midday3;
           document.getElementById("time-1-degree").innerText = data.hourly[0].temp;
           document.getElementById("time-2-degree").innerText = data.hourly[12].temp;
           document.getElementById("time-3-degree").innerText = data.hourly[24].temp;
           document.getElementById("time-4-degree").innerText = data.hourly[47].temp; 

           const arr = [10, 20, 30, 40];
        //    console.log(arr.reduce((p, c)=> p + +((c/2) % 2 === 1), 0));

    })
    .catch((error) => {
        var localData = JSON.parse(localStorage.getItem("mydata"));

       //Getting time information
       var date = new Date(localData.current.dt * 1000), /* creating objects of Date class */
            date0 = new Date(localData.hourly[0].dt * 1000),
            date1 = new Date(localData.hourly[12].dt * 1000),
            date2 = new Date(localData.hourly[24].dt * 1000),
            date3 = new Date(localData.hourly[47].dt * 1000);

       var hour = date.getHours(),
            hour0 = date0.getHours(),
            hour1 = date1.getHours(),
            hour2 = date2.getHours(),
            hour3 = date3.getHours();

       var min = date.getMinutes(),
            min0 = date0.getMinutes(),
            min1 = date1.getMinutes(),
            min2 = date2.getMinutes(),
            min3 = date3.getMinutes();

       var midday, midday0, midday1, midday2, midday3 = "AM";

       midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
       midday0 = (hour0 >= 12) ? "PM" : "AM"; 
       midday1 = (hour1 >= 12) ? "PM" : "AM"; 
       midday2 = (hour2 >= 12) ? "PM" : "AM"; 
       midday3 = (hour3 >= 12) ? "PM" : "AM"; 

       hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour); /* assigning hour in 12-hour format */
       hour0 = (hour0 == 0) ? 12 : ((hour0 > 12) ? (hour0 - 12): hour0);
       hour1 = (hour1 == 0) ? 12 : ((hour1 > 12) ? (hour1 - 12): hour1);
       hour2 = (hour2 == 0) ? 12 : ((hour2 > 12) ? (hour2 - 12): hour2);
       hour3 = (hour3 == 0) ? 12 : ((hour3 > 12) ? (hour3 - 12): hour3);

       hour = updateTime(hour);
       hour0 = updateTime(hour0);
       hour1 = updateTime(hour1);
       hour2 = updateTime(hour2);
       hour3 = updateTime(hour3);

       min = updateTime(min);
       min0 = updateTime(min0);
       min1 = updateTime(min1);
       min2 = updateTime(min2);
       min3 = updateTime(min3);

       var day = days[ date.getDay() ],
            short_d0 = short_days[ date0.getDay() ],
            short_d1 = short_days[ date1.getDay() ],
            short_d2 = short_days[ date2.getDay() ],
            short_d3 = short_days[ date3.getDay() ],
            month = months[ date.getMonth() ],
            d = date.getDate(),
            year = date.getFullYear();
       document.getElementById("day").innerText = day;
       document.getElementById("date").innerText = month + ", " + d + " " + year;

       // Creating images source
       var src = 'http://openweathermap.org/img/wn/'+localData.current.weather[0].icon+'.png',
           img = document.createElement('img'),
           src2 = 'http://openweathermap.org/img/wn/'+localData.hourly[0].weather[0].icon+'.png',
           img2 = document.createElement('img'),
           src3 = 'http://openweathermap.org/img/wn/'+localData.hourly[12].weather[0].icon+'.png',
           img3 = document.createElement('img'),
           src4 = 'http://openweathermap.org/img/wn/'+localData.hourly[24].weather[0].icon+'.png',
           img4 = document.createElement('img'),
           src5 = 'http://openweathermap.org/img/wn/'+localData.hourly[47].weather[0].icon+'.png',
           img5 = document.createElement('img');

           img.src  = src;
           img2.src = src2;
           img3.src = src3;
           img4.src = src4;
           img5.src = src5;
           img.alt  = "image1";
           img2.alt = "image2";
           img3.alt = "image3";
           img4.alt = "image4";
           img5.alt = "image5";

        //Assigning localData to elements
           document.getElementById("title").innerText = localData.timezone.substring(localData.timezone.indexOf("/") + 1);
           document.getElementById("wind-icon").appendChild(img);
           document.getElementById("wi-1").appendChild(img2);
           document.getElementById("wi-2").appendChild(img3);
           document.getElementById("wi-3").appendChild(img4);
           document.getElementById("wi-4").appendChild(img5);
           document.getElementById("degree").innerText = localData.current.temp;
           document.getElementById("descript").innerText = localData.current.weather[0].description;
           document.getElementById("wind").innerText = "ESE "+localData.current.wind_speed+" mph";
           document.getElementById("humidity").innerText = localData.current.humidity+"%";
           document.getElementById("pressure").innerText = localData.current.pressure+" in";
           document.getElementById("cloud").innerText = localData.current.clouds+"%";
           document.getElementById("clock-time").innerText = hour + " : " + min + " " + midday;
           document.getElementById("time1").innerText = short_d0 + "," + hour0 + ":" + min0 + " "+ midday0;
           document.getElementById("time2").innerText = short_d1 + "," + hour1 + ":" + min1 + " "+ midday1;
           document.getElementById("time3").innerText = short_d2 + "," + hour2 + ":" + min2 + " "+ midday2;
           document.getElementById("time4").innerText = short_d3 + "," + hour3 + ":" + min3 + " "+ midday3;
           document.getElementById("time-1-degree").innerText = localData.hourly[0].temp;
           document.getElementById("time-2-degree").innerText = localData.hourly[12].temp;
           document.getElementById("time-3-degree").innerText = localData.hourly[24].temp;
           document.getElementById("time-4-degree").innerText = localData.hourly[47].temp;  
    });

})();
