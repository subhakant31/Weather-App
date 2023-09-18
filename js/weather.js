"use Strict";

let deviceLocationCity = "";
const weatherInfo = {
  liveData: null,
  conditions: {
    0: {
      label: "clear",
      icon: "day.svg",
    },
    1: {
      label: "Cloudy",
      icon: "cloudy.svg",
    },
    2: {
      label: "Cloudy",
      icon: "cloudy.svg",
    },
    3: {
      label: "Cloudy",
      icon: "cloudy.svg",
    },
    45: {
      label: "foggy",
      icon: "rainy-1.svg",
    },
    48: {
      label: "foggy",
      icon: "rainy-1.svg",
    },
    51: {
      label: "drizzle",
      icon: "rainy-2.svg",
    },
    53: {
      label: "drizzle",
      icon: "rainy-2.svg",
    },
    55: {
      label: "drizzle",
      icon: "rainy-2.svg",
    },
    56: {
      label: "freeze drizzle",
      icon: "rainy-4.svg",
    },
    57: {
      label: "freeze drizzle",
      icon: "rainy-4.svg",
    },
    61: {
      label: "slight rain",
      icon: "rainy-3.svg",
    },
    63: {
      label: "slight rain",
      icon: "rainy-3.svg",
    },
    65: {
      label: "slight rain",
      icon: "rainy-3.svg",
    },
    66: {
      label: "freezing rain",
      icon: "rainy-5.svg",
    },
    67: {
      label: "freezing rain",
      icon: "rainy-5.svg",
    },
    71: {
      label: "snow fall",
      icon: "snowy-1.svg",
    },
    73: {
      label: "snow fall",
      icon: "snowy-1.svg",
    },
    75: {
      label: "snow fall",
      icon: "snowy-1.svg",
    },
    77: {
      label: "snow grains",
      icon: "snowy-1.svg",
    },
    80: {
      label: "Slight Rain",
      icon: "rainy-6.svg",
    },
    81: {
      label: "Slight Rain",
      icon: "rainy-6.svg",
    },
    82: {
      label: "Slight Rain",
      icon: "rainy-6.svg",
    },
    85: {
      label: "snow showers",
      icon: "snowy-4.svg",
    },
    86: {
      label: "snow showers",
      icon: "snowy-4.svg",
    },

    95: {
      label: "Thunderstorm",
      icon: "thunder.svg",
    },
    96: {
      label: "Thunderstorm",
      icon: "thunder.svg",
    },
    99: {
      label: "Thunderstorm",
      icon: "thunder.svg",
    },
  },
  dayDOM: [
    {
      tag: "li",
      attr: {class: "weather-day",},
      content: {
        tag: "a",
        attr: {
          href: "#",
        },
        content: [
          {
            tag: "h3",
            content: {
              tag: "date",
              content: "{{DATE}}",
            },
          },
          {
            tag: "img",
            attr: {
              class: "weather-condition-icon",
              src: "{{ICON}}",
              alt: "{{ALT}}",
            }
            
          },
          {tag:"span",
            content:"{{WEEKLABEL}}"
        },
          {
            tag: "span",
            attr: {
              class: "temp-min",
            },
            content: "{{TEMP_MIN}}",
          },
          {
            tag: "span",
            attr: {
              class: "temp-max",
            },
            content: "{{TEMP_MAX}}",
          },
        ],
      },
    },
  ],
};

/*
@Function :deviceCurrentPosition
@description : Return the current position of the device
@param - None
@returns - device's current position
*/
// const successCallback = (position) => {
//   console.log(position);
// };

/*
    @Function: replaceValue
    @Description: Find a value from a JSON object and replace with the provided value
    @Param {Object} - Object to find from
    @param {any} - value to find
    @param {any} - value to assign as replacement
    @Returns: null
*/

function replaceValue(obj, value, replacement) {
  // Iterate through the object
  for (let key in obj) {
    if (obj[key] === value) {
      obj[key] = replacement;
    }

    // If value is an object call this function again
    if (typeof obj[key] === "object") {
      replaceValue(obj[key], value, replacement);
    }
  }
}

/*
    @function: buildTree
    @description: Build a DOM tree based on JSON structure
    @param {Object} - Object to build the DOM from
    @param {Object} - Target DOM object
    @Returns: null
*/
function buildTree(tree, container) {
  tree.forEach(function (node) {
    var el = document.createElement(node.tag);

    if (node.attr) {
      // Create attributes if any
      for (let key in node.attr) {
        el.setAttribute(key, node.attr[key]);
      }
    }

    if (node.content) {
      if (Array.isArray(node.content)) {
        buildTree(node.content, el);
      } else if (typeof node.content === "object") {
        buildTree([node.content], el);
      } else {
        el.innerHTML = node.content;
      }
    }
    container.appendChild(el);
  });
}

/*
    @Function: generateWeekCards
    @Description: Create the Weather forecast based on the JSON
    @Param: null
    @Returns: null
*/
function generateWeekCards() {
  let dailyArray = weatherInfo.liveData.daily;
  let targetElement = document.querySelector(".weather-week-list");
  targetElement.innerHTML = "";

  //setting data for today's weather
  document.querySelector(".weather-condition-icon").setAttribute("src",`img/${weatherInfo.conditions[dailyArray.weathercode[0]]["icon"]}`)
  document.querySelector(".temp-min").innerHTML=dailyArray["temperature_2m_min"][0]+'&#xb0;C';
    
    

    //changing background on the basis of today's
    
    
  for (var i = 1; i < dailyArray.time.length; i++) {
    let DOMTree = JSON.parse(JSON.stringify(weatherInfo.dayDOM));
    const weekDay=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    const day=new Date(dailyArray.time[i]);
    replaceValue(DOMTree, "{{DATE}}", `${weekDay[day.getDay()].slice(0,3)}`);
    replaceValue(DOMTree,"{{ICON}}",`img/${weatherInfo.conditions[dailyArray.weathercode[i]]["icon"]}`);
    replaceValue(DOMTree,"{{WEEKLABEL}}",`${weatherInfo.conditions[dailyArray.weathercode[i]]["label"]}`);
    replaceValue(DOMTree,"{{ALT}}",weatherInfo.conditions[dailyArray.weathercode[i]]["label"]);
    replaceValue(DOMTree,"{{TEMP_MIN}}",` ${dailyArray["temperature_2m_min"][i]}${weatherInfo.liveData["daily_units"]["temperature_2m_min"]}`);
    replaceValue(DOMTree,"{{TEMP_MAX}}",` ${dailyArray["temperature_2m_max"][i]}${weatherInfo.liveData["daily_units"]["temperature_2m_min"]}`);

    buildTree(DOMTree, targetElement); // Build the DOM
  }
}

/*
@Function: preFetch
@Description: Fetch the Weather Info from API and store in the cache
@Param: null
@Returns: null
*/
async function preFetch() {
  


  async function hourlyWeather(latitude,longitude)
    {
      console.log("hourlyWeather is executing");
      

      document.querySelector(".time-period").innerHTML=""
      const hourlyData=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode,temperature_180m&forecast_days=1`)
      let getHourly=await hourlyData.json();
      console.log(Object.keys(getHourly.hourly.time).length);
      for(var i=0;i<getHourly.hourly.time.length;i++)
      {
        const box=`<div>
        <span>${getHourly.hourly.time[i].slice(11)}</span>
        <img src="/img/thunder.svg" alt="">
        <span>${getHourly.hourly.temperature_180m[i]}&#xb0</span>
    </div>`
    document.querySelector(".time-period").innerHTML+=box

      }
     
    }


    async function airCondition(latitude,longitude){
      const airConditionData=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max,uv_index_max,rain_sum,windspeed_10m_max&forecast_days=1&timezone=auto`);
      let airData=await airConditionData.json();
      document.querySelector(".real-feel").innerHTML=airData.daily.apparent_temperature_max+"&#xb0;";
      document.querySelector(".wind").innerHTML=airData.daily.windspeed_10m_max+"km/h";
      document.querySelector(".chance-rain").innerHTML=airData.daily.rain_sum+"%";
      document.querySelector(".uv-index").innerHTML=airData.daily.uv_index_max;

    }



  console.log("executing");


  document.getElementById("search-city").addEventListener("input",function(){

    if(!document.getElementById("search-city").value=="")
    {
    document.getElementById("search-results").style.display="block";
    }
    else{
      document.getElementById("search-results").style.display="none"
    }
    document.getElementById("search-results").innerHTML="";
    getWeatherDataFromCity(document.getElementById("search-city").value);
    async function getWeatherDataFromCity(city)
    {
    
    for(var i=0;i<10;i++)
    {const cityData=await fetch(`https://photon.komoot.io/api/?lang=en&limit=5&q=${city}`)
    let getCity=await cityData.json();
      const box=`<li>
      <span class="search-city">${checkUndefine()}</span>
      <span class="search-state">${getCity.features[i].properties.state}</span>

  </li>
      `;
      function checkUndefine(){
        if(!getCity.features[i].properties.city){
          return getCity.features[i].properties.name;
        }
        else{
          return getCity.features[i].properties.city;
        }
      }
      document.getElementById("search-results").innerHTML+=box;
    }
  }
  })

  document.getElementById("search-city").addEventListener("change",function(){

    document.getElementById("search-results").style.display="none"
    getWeatherDataFromCity(document.getElementById("search-city").value)
    async function getWeatherDataFromCity(city)
    {
    const cityData=await fetch(`https://photon.komoot.io/api/?lang=en&limit=5&q=${city}`)
    let getCity=await cityData.json();
    document.querySelector(".location").innerHTML = getCity.features[0].properties.name;
    let latitude=getCity.features[0].geometry.coordinates[1];
    let longitude=getCity.features[0].geometry.coordinates[0];

    airCondition(latitude,longitude);
    hourlyWeather(latitude,longitude);
    document.querySelector(".state").innerHTML = getCity.features[0].properties.state;
    fetchWeekCards(latitude,longitude);
    }
  })

 
  //Fetch current location by default when page loads
  async function success(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;


    const getLocationApi = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    let geoLocation = await getLocationApi.json(); //converting the API to json file and storing it in geoLocation
    document.querySelector(".location").innerHTML =
      geoLocation.city;
      document.querySelector(".state").innerHTML = geoLocation.principalSubdivision;
      airCondition(latitude,longitude);
      hourlyWeather(latitude,longitude);
    fetchWeekCards(latitude, longitude);
  } 
  navigator.geolocation.getCurrentPosition(success);

  
  

  async function fetchWeekCards(latitude, longitude) {
    const weatherData = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
    );
    weatherInfo.liveData = await weatherData.json();
    generateWeekCards();
  }
}

// A centralized init function to start the JS sequence
function init() {
  // document.querySelector("body-background-image").innerHTML="";
  preFetch();
}

// Initialize the app once the DOM is ready
document.addEventListener("DOMContentLoaded", init);


document.querySelector('.time-period').addEventListener('wheel', (event) => {
  event.preventDefault();
  console.log("Asdasdsd");
  document.querySelector('.time-period').scrollBy({
    left: event.deltaY < 0 ? -80 : 80,
  });
});