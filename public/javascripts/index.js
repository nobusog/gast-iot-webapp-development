$(document).ready(function () {
  //creating variable names for the different data streams
  var timeData = [],
    am2302TemperatureData = [],
    am2302HumidityData = [],
    pressureTransmitterData = [] ; 


  //datasets for the am2302 sensor chart 
  var am2302Dataset = {
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
      data: am2302TemperatureData 
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
      data: am2302HumidityData
    }]
  }

  //datasets for the pressure transmitter chart 
  var pressureTransmitterDataset = {
    labels: timeData,
    datasets: [
      {
      fill: false,
      label: 'Pressure',
      yAxisID: 'Pressure',
      borderColor: "rgba(255, 204, 0, 1)",
      pointBoarderColor: "rgba(255, 204, 0, 1)",
      backgroundColor: "rgba(255, 204, 0, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
      pointHoverBorderColor: "rgba(255, 204, 0, 1)",
      data: pressureTransmitterData 
    }]
  }


  //define options for the AM2302 Sensor Chart
  var am2302SensorOptions = {
    title: {
      display: true,
      text: 'AM2302 Sensor Real-time Data',
      fontSize: 30
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

  //define options for the Pressure Transmitter Chart
  var pressureTransmitterOptions = {
    title: {
      display: true,
      text: 'Pressure Transmitter Real-time Data',
      fontSize: 30
    },
    scales: {
      yAxes: [{
        id: 'Pressure',
        type: 'linear',
        scaleLabel: {
          labelString: 'Pressure (psi)',
          display: true
        },
        position: 'right',
      },{
        id: 'placeholder',
        type: 'linear',
        scaleLabel: {
          labelString: 'placeholder',
          display: false
        },
        position: 'left'
      }]
    }
  }
  
  

  //Get the context of the AM2302 sensor chart canvas element.
  var am2302ctx = document.getElementById("am2302Chart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var am2302Chart = new Chart(am2302ctx, {
    type: 'line',
    data: am2302Dataset,
    options: am2302SensorOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var pressuretransmitterctx = document.getElementById("pressureTransmitter").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var pressureTransmitterChart = new Chart(pressuretransmitterctx, {
    type: 'line',
    data: pressureTransmitterDataset,
    options: pressureTransmitterOptions
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.thermocoupleTemperature) {
        return;
      }
      timeData.push(obj.time);

      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
      }


      //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.am2302Humidity) {
        am2302HumidityData.push(obj.am2302Humidity);
      }
      if (am2302HumidityData.length > maxLen) {
        am2302HumidityData.shift();
      }

      //push the am2302 temperature data if it exists and keep only 50 points in the line chart
      if (obj.am2302Temperature) {
        am2302TemperatureData.push(obj.am2302Temperature);
      }
      if (am2302TemperatureData.length > maxLen) {
        am2302TemperatureData.shift();
      }

      //push the pressure transmitter data if it exists and keep only 50 points in the line chart
      if (obj.transducerPressure) {
        pressureTransmitterData.push(obj.transducerPressure);
      }
      if (pressureTransmitterData.length > maxLen) {
        pressureTransmitterData.shift();
      }

      //update charts with new points
      am2302Chart.update();
      pressureTransmitterChart.update();
    } 
    catch (err) {
      console.error(err);
    }
  } 
})
