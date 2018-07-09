$(document).ready(function () {

  //creating arrays for the different data streams
    timeData = [],
    am2302TemperatureData = [],
    am2302HumidityData = [],
    pressureTransmitterData = [], 
    thermocoupleData = [],
    sht20TemperatureData = [],
    sht20HumidityData = [];
  
  (function chartDump (){
    chartDumper(timeData,"timeData")
    chartDumper(am2302HumidityData,"am2302HumidityData");
    chartDumper(am2302TemperatureData,"am2302TemperatureData");
    chartDumper(thermocoupleData,"thermocoupleData");
    chartDumper(sht20TemperatureData,"sht20TemperatureData");
    chartDumper(sht20HumidityData,"sht20HumidityData");
    chartDumper(pressureTransmitterData,"pressureTransmitterData");
  })();

  


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

  //datasets for the thermomocouple chart 
  var thermocoupleDataset = {
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
      data: thermocoupleData 
    }]
  }

  //datasets for the sht sensor chart 
  var sht20Dataset = {
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
      data: sht20TemperatureData 
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
      data: sht20HumidityData
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

  //define options for the Thermocouple Chart
  var thermocoupleOptions = {
    title: {
      display: true,
      text: 'Thermocouple Real-time Data',
      fontSize: 30
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'temperature',
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
  
  
  //define options for the sht Chart
  var sht20Options = {
    title: {
      display: true,
      text: 'SHT Sensor Real-time Data',
      fontSize: 30
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'temperature',
          display: true
        },
        position: 'right',
      },{
        id: 'Humidity',
        type: 'linear',
        scaleLabel: {
          labelString: 'Humidity',
          display: true
        },
        position: 'left'
      }]
    }
  }
  
    

  //Get the context of the AM2302 sensor chart canvas element.
  var am2302ctx = document.getElementById("am2302ChartJunair").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var am2302Chart = new Chart(am2302ctx, {
    type: 'line',
    data: am2302Dataset,
    options: am2302SensorOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var pressuretransmitterctx = document.getElementById("pressureTransmitterJunair").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var pressureTransmitterChart = new Chart(pressuretransmitterctx, {
    type: 'line',
    data: pressureTransmitterDataset,
    options: pressureTransmitterOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var thermocouplectx = document.getElementById("thermocoupleChartJunair").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var thermocoupleChart = new Chart(thermocouplectx, {
    type: 'line',
    data: thermocoupleDataset,
    options: thermocoupleOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var sht20ctx = document.getElementById("sht20ChartJunair").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var sht20Chart = new Chart(sht20ctx, {
    type: 'line',
    data: sht20Dataset,
    options: sht20Options
  });
  
  function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }

  updateAllCharts([am2302Chart, thermocoupleChart, sht20Chart, pressureTransmitterChart]);

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onerror = function () {
    unsuccessfulAlert("Please reload page, websocket failed to load ")
  }
  ws.onmessage = function (message) {
    try {
      var obj = JSON.parse(message.data);

      if (obj.deviceId == "JunAir Pi - Python") {
        if (!obj.time || !obj.thermocoupleTemperature) {
          return;
        }
        timeData.push(obj.displayTime);

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

        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.thermocoupleTemperature) {
          thermocoupleData.push(obj.thermocoupleTemperature);
        }
        if (thermocoupleData.length > maxLen) {
          thermocoupleData.shift();
        }

        //push the sht temperature data if it exists and keep only 50 points in the line chart
        if (obj.sht20Temperature) {
          sht20TemperatureData.push(obj.sht20Temperature);
        }
        if (sht20TemperatureData.length > maxLen) {
          sht20TemperatureData.shift();
        }

        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.sht20Humidity) {
          sht20HumidityData.push(obj.sht20Humidity);
        }
        if (sht20HumidityData.length > maxLen) {
          sht20HumidityData.shift();
        }

        //update charts with new points
        updateAllCharts([am2302Chart, thermocoupleChart, sht20Chart, pressureTransmitterChart]);
      } 
    }
    catch (err) {
      console.error(err);
    }
  }
  
  window.onunload = function() {
    chartSaver(timeData,"timeData")
    chartSaver(am2302HumidityData,"am2302HumidityData");
    chartSaver(am2302TemperatureData,"am2302TemperatureData");
    chartSaver(thermocoupleData,"thermocoupleData");
    chartSaver(sht20TemperatureData,"sht20TemperatureData");
    chartSaver(sht20HumidityData,"sht20HumidityData");
    chartSaver(pressureTransmitterData,"pressureTransmitterData");
  }
})
