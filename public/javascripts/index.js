$(document).ready(function () {
  //creating variable names for the different data streams
  var timeData = [],
    temperatureData = [],
    humidityData = [],
    pressureData = [],
    am2302temperatureData = [],
    am2302humidityData = [],
    adcpressureData = [] ; 
  
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
      }
    ]
  }

  var am2302data = {
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
      data: am2302temperatureData 
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
      data: am2302humidityData
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

  var am2302Options = {
    title: {
      display: true,
      text: 'AM2302Sensor Real-time Data',
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
        }
      ]
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

  //Get the context of the AM2302 chart canvas element.
  var am2302ctx = document.getElementById("am2302Chart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var am2302Chart = new Chart(am2302ctx, {
    type: 'line',
    data: am2302data,
    options: am2302Options
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
      am2302humidityData.push(obj.am2302humidity);
      am2302temperatureData.push(obj.am2302temperature);
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
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
      //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.am2302humidity) {
        am2302humidityData.push(obj.am2302humidity);
      }
      if (am2302humidityData.length > maxLen) {
        am2302humidityData.shift();
      }
      //push the am2302 temperature data if it exists and keep only 50 points in the line chart
      if (obj.am2302temperature) {
        am2302temperatureData.push(obj.am2302temperature);
      }
      if (am2302temperatureData.length > maxLen) {
        am2302temperatureData.shift();
      }
      myLineChart.update();
      am2302Chart.update();
    } catch (err) {
      console.error(err);
    }
  }
})
