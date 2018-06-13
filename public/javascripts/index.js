$(document).ready(function () {
  //creating variable names for the different data streams
  var timeData = [],
    bme280TemperatureData = [],
    bme280HumidityData = [],
    bme280PressureData = [],
    am2302TemperatureData = [],
    am2302HumidityData = [],
    pressureTransmitterData = [] ; 
  
  //datasets for the bme280 sensor chart 
  var bme280Dataset = {
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
        data: bme280TemperatureData 
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
        data: bme280HumidityData
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
        data: bme280PressureData
      }
    ]
  }

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

  //define options for the BME280 Sensor Chart
  var bme280SensorOptions = {
    title: {
      display: true,
      text: 'BME280 Sensor Real-time Data',
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
  
  
    
  //Get the context of the BME280  sensor chart canvas element.
  var bme280ctx = document.getElementById("bme280Chart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var bme280Chart = new Chart(bme280ctx, {
    type: 'line',
    data: bme280Dataset,
    options: bme280SensorOptions
  });

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
      if(!obj.time || !obj.temperature) {
        return;
      }
      timeData.push(obj.time);
      bme280TemperatureData.push(obj.temperature);

      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        bme280TemperatureData.shift();
      }

      //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.humidity) {
        bme280HumidityData.push(obj.humidity);
      }
      if (bme280HumidityData.length > maxLen) {
        bme280HumidityData.shift();
      }
      
      //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.pressure) {
        bme280PressureData.push(obj.pressure);
      }
      if (bme280PressureData.length > maxLen) {
        bme280PressureData.shift();
      }

      //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.am2302humidity) {
        am2302HumidityData.push(obj.am2302humidity);
      }
      if (am2302HumidityData.length > maxLen) {
        am2302HumidityData.shift();
      }

      //push the am2302 temperature data if it exists and keep only 50 points in the line chart
      if (obj.am2302temperature) {
        am2302TemperatureData.push(obj.am2302temperature);
      }
      if (am2302TemperatureData.length > maxLen) {
        am2302TemperatureData.shift();
      }

      //push the pressure transmitter data if it exists and keep only 50 points in the line chart
      if (obj.adc_pressure) {
        pressureTransmitterData.push(obj.adc_pressure);
      }
      if (pressureTransmitterData.length > maxLen) {
        pressureTransmitterData.shift();
      }

      //update charts with new points
      bme280Chart.update();
      am2302Chart.update();
      pressureTransmitterChart.update();
    } 
    catch (err) {
      console.error(err);
    }
  }

  //Show charts when button is clicked
  document.getElementById("bme280Button").onclick = function() {
    document.getElementById("bmeContainer").removeClass("d-none")
  }
})
