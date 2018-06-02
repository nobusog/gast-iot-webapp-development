$(document).ready(function () {
  //creating variable names for the different data streams
  var timeData = [],
    temperatureData = [],
    humidityData = [],
    pressureData = [],
    relativehumidityData = [];
  
    //create a variable data to hold datasets for the chart 
  var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData 
      },
      {
        fill: false,
        label: 'Humidity',
        yAxisID: 'Humidity',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: humidityData
      },
      {
        fill: false,
        label: 'Pressure',
        yAxisID: 'Pressure',
        borderColor: "rgba(66, 244, 72, 1)",
        pointBoarderColor: "rgba(66, 244, 72, 1)",
        backgroundColor: "rgba(66, 244, 72, 0.4)",
        pointHoverBackgroundColor: "rgba(66, 244, 72, 1)",
        pointHoverBorderColor: "rgba(66, 244, 72, 1)",
        data: pressureData
      },
      {
        fill: false,
        label: 'Relative Humidity',
        yAxisID: 'Relative Humidity',
        borderColor: "rgba(255, 0, 0, 1)",
        pointBoarderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
        pointHoverBorderColor: "rgba(255, 0, 0, 1)",
        data: relativehumidityData
      }
    ]
  }

  var basicOption = {
    title: {
      display: true,
      text: 'Sensor Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature(C)',
          display: true
        },
        position: 'left',
      }, {
          id: 'Humidity',
          type: 'linear',
          scaleLabel: {
            labelString: 'Humidity(%)',
            display: true
          },
          position: 'right'
        },
        {
          id: 'Pressure',
          type: 'linear',
          scaleLabel: {
            labelString: 'Pressure(bar)',
            display: true
          },
          position: 'right'
        },
        {
          id: 'Relative Humidity',
          type: 'linear',
          display: false,
          scaleLabel: {
            labelString: 'Relative Humidity',
            display: false
          },
          position: 'right'
        }]
    }
  }
  
  
  //calculate on time, takes an input of 1 or 0. 1 if compressor is on or 0 if compressor is off.
   function ontime (signal){
    var startTime = new Date(), endTime = 0, time_diff = 0, prev_signal = 0 ; 
    if (signal = 0) {
      if (prev_signal = 0){
        prev_signal = 0;
        return 0;
      } else {
        prev_signal = 0;
        return 0;
      }
    }
    else {
      if (prev_signal = 0){
        startTime = new Date();
        prev_signal = 1;
        return startTime; 
      } else {
        endTime = new Date();
        console.log(endTime);
        time_diff = Math.round((endTime - startTime)/1000) ;
        console.log(time_diff);
        prev_signal = 1;
        return time_diff;
      }
    }    
  }

  // Calculate Relative humidity using Temperature at a certain dewpoint
  //---> reference https://en.wikipedia.org/wiki/Dew_point

  function relativehumidity(t, dewpoint) {
    var b = 18.678 ;
    var c = 257.14 ; //in Celsius
    var d = 234.5 ; // in Celsius
    var t_dp = dewpoint ; // in Celsius
  
    var A = Math.exp((b*t_dp)/(c+t_dp)) ; 
    var B = Math.exp((b-(t/d))*(t/(c+t))) ;
    return ((A/B)*100)
    }
    
  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: basicOption
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.temperature) {
        return;
      }
      timeData.push(obj.time);
      temperatureData.push(obj.temperature);
      relativehumidityData.push(relativehumidity(obj.temperature, obj.temperature));
      console.log(relativehumidity(obj.temperature, obj.temperature));
      //push the on time to the html template 
      compressor_on_time = ontime(obj.compressor)
      $("#compressor_on_time").text(compressor_on_time) ;
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
        relativehumidityData.shift();

      }

      if (obj.humidity) {
        humidityData.push(obj.humidity);
      }
      if (humidityData.length > maxLen) {
        humidityData.shift();
      }

      if (obj.pressure) {
        pressureData.push(obj.pressure);
      }
      if (pressureData.length > maxLen) {
        pressureData.shift();
      }

      myLineChart.update();
    } catch (err) {
      console.error(err);
    }
  }
})
