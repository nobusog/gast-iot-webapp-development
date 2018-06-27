$(document).ready(function () {

  //creating arrays for the different data streams
    timeData = [],
    bme280TemperatureData = [],
    bme280HumidityData = [],
    bme280PressureData = [],
    am2302TemperatureData = [],
    am2302HumidityData = [],
    pressureTransmitterData = [], 
    thermocoupleData = [],
    sht20TemperatureData = [],
    sht20HumidityData = [];

  function chartDumper(array, str) {
    var arry = JSON.parse(window.localStorage.getItem(str));
    console.log(window.localStorage.getItem(str))
    if (arry != null){
      for (var n=0; n<arry.length; n++) {
        array.push(arry[n]);
      }
    }
  }
  
  (function chartDump (){
    console.log("retrieved")
    chartDumper(am2302HumidityData,"am2302HumidityData");
    chartDumper(am2302TemperatureData,"am2302TemperatureData")
  })();

  //clears local storage after retrieving contents
  window.localStorage.clear();

  for (var i=0; i<am2302HumidityData.length; i++){
    console.log(am2302HumidityData[i]);
    }

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
          labelString: 'Temperature(C)...testing',
          display: true
        },
        position: 'left',
      }, {
          id: 'Humidity',
          type: 'linear',
          scaleLabel: {
            labelString: 'Humidity(%)...testing',
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
  
    
  //Get the context of the BME280  sensor chart canvas element.
  var bme280ctx = document.getElementById("bme280ChartJunair").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var bme280Chart = new Chart(bme280ctx, {
    type: 'line',
    data: bme280Dataset,
    options: bme280SensorOptions
  });

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

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log("messageeeee");
    try {
      var obj = JSON.parse(message.data);

      if (obj.deviceId == "JunAir Pi - Python") {
        console.log("we also have contact for junair")
        if (!obj.time || !obj.bme280Temperature) {
          return;
        }
        timeData.push(obj.time);
        bme280TemperatureData.push(obj.bme280Temperature);

        // only keep no more than 50 points in the line chart
        const maxLen = 50;
        var len = timeData.length;
        if (len > maxLen) {
          timeData.shift();
          bme280TemperatureData.shift();
        }

        //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.bme280Humidity) {
          bme280HumidityData.push(obj.bme280Humidity);
        }
        if (bme280HumidityData.length > maxLen) {
          bme280HumidityData.shift();
        }
        
        //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.bme280Pressure) {
          bme280PressureData.push(obj.bme280Pressure);
        }
        if (bme280PressureData.length > maxLen) {
          bme280PressureData.shift();
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
        bme280Chart.update();
        am2302Chart.update();
        pressureTransmitterChart.update();
        thermocoupleChart.update();
        sht20Chart.update();
      } 
    }
    catch (err) {
      console.error(err);
    }
  }

  function chartSaver (array, str) {
    var arrayString = JSON.stringify(array);
    console.log(arrayString);
    window.localStorage.setItem(str, arrayString);
  }

  window.onbeforeunload = function() {
    console.log("saved");
    chartSaver(am2302HumidityData,"am2302HumidityData");
    chartSaver(am2302TemperatureData,"am2302TemperatureData");
  }
})
