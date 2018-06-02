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
        }]
    }
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

     // Calculate Relative humidity using Temperature
  function relativehumidity(t, dewpoint) {
    var b = 18.678 ;
    var c = 257.14 ; //in Celsius
    var d = 234.5 ; // in Celsius
    var t_dp = dewpoint ; // in Celsius
  
    var A = Math.exp((b*t_dp)/(c+t_dp)) ; 
    var B = Math.exp((b-(temp/d))*(t/(c+t))) ;
    return ((A/B)*100)
    }
    console.log(relativehumidity(23,40)) ;
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
      console.log(obj.temperature);
      RelativehumidityData.push(relativehumidity(obj.temperature, 40));
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
        RelativehumidityData.shift();
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
});
