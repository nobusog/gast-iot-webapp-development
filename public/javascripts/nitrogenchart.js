$(document).ready(function () {
  //creating variable names for the different data streams
  var nitrotimeData = [],
    nitrobme280TemperatureData = [],
    nitrobme280HumidityData = [],
    nitrobme280PressureData = [],
    nitroam2302TemperatureData = [],
    nitroam2302HumidityData = [],
    nitropressureTransmitterData = [] ; 
    nitrothermocoupleData = [];
    nitrosht20TemperatureData = [];
    nitrosht20HumidityData = [];

  //datasets for the bme280 sensor chart 
  var bme280Dataset = {
    labels: nitrotimeData,
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
        data: nitrobme280TemperatureData 
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
        data: nitrobme280HumidityData
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
        data: nitrobme280PressureData
      }
    ]
  }

  //datasets for the am2302 sensor chart 
  var am2302Dataset = {
    labels: nitrotimeData,
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
      data: nitroam2302TemperatureData 
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
      data: nitroam2302HumidityData
    }]
  }

  //datasets for the pressure transmitter chart 
  var nitropressureTransmitterDataset = {
    labels: nitrotimeData,
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
      data: nitropressureTransmitterData 
    }]
  }

  //datasets for the thermomocouple chart 
  var nitrothermocoupleDataset = {
    labels: nitrotimeData,
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
      data: nitrothermocoupleData 
    }]
  }

  //datasets for the sht sensor chart 
  var sht20Dataset = {
    labels: nitrotimeData,
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
      data: nitrosht20TemperatureData 
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
      data: nitrosht20HumidityData
    }]
  }


  //define options for the BME280 Sensor Chart
  var bme280SensorOptions = {
    title: {
      display: true,
      text: 'nitro  BME280 Sensor Real-time Data',
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
      text: 'nitro AM2302 Sensor Real-time Data',
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
      text: ' nitro Pressure Transmitter Real-time Data',
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
      text: 'nitro Thermocouple Real-time Data',
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
      text: 'nitro SHT Sensor Real-time Data',
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
  var bme280ctx = document.getElementById("bme280ChartNitrogen").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var bme280Chart = new Chart(bme280ctx, {
    type: 'line',
    data: bme280Dataset,
    options: bme280SensorOptions
  });

  //Get the context of the AM2302 sensor chart canvas element.
  var am2302ctx = document.getElementById("am2302ChartNitrogen").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var am2302Chart = new Chart(am2302ctx, {
    type: 'line',
    data: am2302Dataset,
    options: am2302SensorOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var pressuretransmitterctx = document.getElementById("pressureTransmitterNitrogen").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var pressureTransmitterChart = new Chart(pressuretransmitterctx, {
    type: 'line',
    data: nitropressureTransmitterDataset,
    options: pressureTransmitterOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var thermocouplectx = document.getElementById("thermocoupleChartNitrogen").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var thermocoupleChart = new Chart(thermocouplectx, {
    type: 'line',
    data: nitrothermocoupleDataset,
    options: thermocoupleOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var sht20ctx = document.getElementById("sht20ChartNitrogen").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var sht20Chart = new Chart(sht20ctx, {
    type: 'line',
    data: sht20Dataset,
    options: sht20Options
  });

  updateAllCharts([bme280Chart, am2302Chart, thermocoupleChart, sht20Chart, pressureTransmitterChart]);

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log("messageeeee");
    try {
      var obj = JSON.parse(message.data);

      if(obj.deviceId == "NitroGen Pi - Python") {
        console.log("we have contact for nitrogen")
        if (!obj.time || !obj.bme280Temperature) {
          return;
        }
        nitrotimeData.push(obj.time);
        nitrobme280TemperatureData.push(obj.bme280Temperature);
  
        // only keep no more than 50 points in the line chart
        const maxLen = 50;
        var len = nitrotimeData.length;
        if (len > maxLen) {
          nitrotimeData.shift();
          nitrobme280TemperatureData.shift();
        }
  
        //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.bme280Humidity) {
          nitrobme280HumidityData.push(obj.bme280Humidity);
        }
        if (nitrobme280HumidityData.length > maxLen) {
          nitrobme280HumidityData.shift();
        }
        
        //push the bme280 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.bme280Pressure) {
          nitrobme280PressureData.push(obj.bme280Pressure);
        }
        if (nitrobme280PressureData.length > maxLen) {
          nitrobme280PressureData.shift();
        }
  
        //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.am2302Humidity) {
          nitroam2302HumidityData.push(obj.am2302Humidity);
        }
        if (nitroam2302HumidityData.length > maxLen) {
          nitroam2302HumidityData.shift();
        }
  
        //push the am2302 temperature data if it exists and keep only 50 points in the line chart
        if (obj.am2302Temperature) {
          nitroam2302TemperatureData.push(obj.am2302Temperature);
        }
        if (nitroam2302TemperatureData.length > maxLen) {
          nitroam2302TemperatureData.shift();
        }
  
        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.transducerPressure) {
          nitropressureTransmitterData.push(obj.transducerPressure);
        }
        if (nitropressureTransmitterData.length > maxLen) {
          nitropressureTransmitterData.shift();
        }
  
        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.thermocoupleTemperature) {
          nitrothermocoupleData.push(obj.thermocoupleTemperature);
        }
        if (nitrothermocoupleData.length > maxLen) {
          nitrothermocoupleData.shift();
        }
  
        //push the sht temperature data if it exists and keep only 50 points in the line chart
        if (obj.sht20Temperature) {
          nitrosht20TemperatureData.push(obj.sht20Temperature);
        }
        if (nitrosht20TemperatureData.length > maxLen) {
          nitrosht20TemperatureData.shift();
        }
  
        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.sht20Humidity) {
          nitrosht20HumidityData.push(obj.sht20Humidity);
        }
        if (nitrosht20HumidityData.length > maxLen) {
          nitrosht20HumidityData.shift();
        }
  
        //update charts with new points
        updateAllCharts([bme280Chart, am2302Chart, thermocoupleChart, sht20Chart, pressureTransmitterChart]);
      }
    } 
    catch (err) {
      console.error(err);
    }
  } 

})
  