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
    var nitrobme280Dataset = {
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
    var nitroam2302Dataset = {
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
    var nitrosht20Dataset = {
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
        text: ' nitro BME280 Sensor Real-time Data',
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
        text: 'nitro Pressure Transmitter Real-time Data',
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
    var nitrobme280ctx = document.getElementById("bme280ChartNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitrobme280Chart = new Chart(nitrobme280ctx, {
      type: 'line',
      data: nitrobme280Dataset,
      options: bme280SensorOptions
    });
  
    //Get the context of the AM2302 sensor chart canvas element.
    var nitroam2302ctx = document.getElementById("am2302ChartNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitroam2302Chart = new Chart(nitroam2302ctx, {
      type: 'line',
      data: nitroam2302Dataset,
      options: am2302SensorOptions
    });
  
    //Get the context of the Pressure transmitter chart canvas element.
    var nitropressuretransmitterctx = document.getElementById("pressureTransmitterNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitropressureTransmitterChart = new Chart(nitropressuretransmitterctx, {
      type: 'line',
      data: nitropressureTransmitterDataset,
      options: pressureTransmitterOptions
    });
  
    //Get the context of the Pressure transmitter chart canvas element.
    var nitrothermocouplectx = document.getElementById("thermocoupleChartNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitrothermocoupleChart = new Chart(nitrothermocouplectx, {
      type: 'line',
      data: nitrothermocoupleDataset,
      options: thermocoupleOptions
    });
  
    //Get the context of the Pressure transmitter chart canvas element.
    var nitrosht20ctx = document.getElementById("sht20ChartNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitrosht20Chart = new Chart(nitrosht20ctx, {
      type: 'line',
      data: nitrosht20Dataset,
      options: sht20Options
    });
  
    var ws = new WebSocket('wss://' + location.host);
    ws.onopen = function () {
      console.log('Successfully connect WebSocket');
    }
    ws.onmessage = function (message) {
      console.log('receive message' + message.data);
      try {
        var objReceived = JSON.parse(message.data);
  
        if(objReceived.deviceId == "Raspberry Pi Web Client") {
          obj = objReceived;
        }
  
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
        nitrobme280Chart.update();
        nitroam2302Chart.update();
        nitropressureTransmitterChart.update();
        nitrothermocoupleChart.update();
        nitrosht20Chart.update();
      } 
      catch (err) {
        console.error(err);
      }
    } 
  })
  