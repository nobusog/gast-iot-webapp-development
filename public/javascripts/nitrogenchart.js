$(document).ready(function () {
  //creating variable names for the different data streams
  nitrotimeData = [],
  nitroam2302TemperatureData = [],
  nitroam2302HumidityData = [],
  nitropressureTransmitterData = [],
  nitrothermocoupleData = [],
  nitrosht20TemperatureData = [],
  nitrosht20HumidityData = [],
  nitroNitrogenGenerationData = [];

  (function chartDump (){
    chartDumper(nitrotimeData, "nitrotimeData")
    chartDumper(nitroam2302HumidityData,"nitroam2302HumidityData");
    chartDumper(nitroam2302TemperatureData,"nitroam2302TemperatureData");
    chartDumper(nitrothermocoupleData,"nitrothermocoupleData");
    chartDumper(nitrosht20TemperatureData,"nitrosht20TemperatureData");
    chartDumper(nitrosht20HumidityData,"nitrosht20HumidityData");
    chartDumper(nitropressureTransmitterData,"nitropressureTransmitterData");
  })();


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

    //datasets for the nitrogen generation chart 
    var nitroNitrogenGenerationDataset = {
      labels: nitrotimeData,
      datasets: [
        {
        fill: false,
        label: 'Nitrogen Generation',
        yAxisID: 'Nitrogen Generation',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: nitroNitrogenGenerationData
      }]
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

    //define options for the Nitrogen Generation Chart
    var nitrogenGenerationOptions = {
      title: {
        display: true,
        text: 'Nitrogen Generation Real-time Data',
        fontSize: 30
      },
      scales: {
        yAxes: [{
          id: 'Nitrogen Generation',
          type: 'linear',
          scaleLabel: {
            labelString: 'Nitrogen Generation',
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

    //Get the context of the nitrogen generation chart canvas element.
    var nitrogenGenerationctx = document.getElementById("nitrogenGenerationChartNitrogen").getContext("2d");
    var optionsNoAnimation = { animation: false }
    var nitrogenGenerationChart = new Chart(nitrogenGenerationctx, {
      type: 'line',
      data: nitroNitrogenGenerationDataset,
      options: nitrogenGenerationOptions
    });

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

      if(obj.deviceId == "NitroGen Pi - Python") {
        if (!obj.time || !obj.thermocoupleTemperature) {
          return;
        }
        nitrotimeData.push(obj.displayTime);
    
        // only keep no more than 50 points in the line chart
        const maxLen = 50;
        var len = nitrotimeData.length;
        if (len > maxLen) {
          nitrotimeData.shift();
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
  
        //push the thermocouple data if it exists and keep only 50 points in the line chart
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


        //push the nitrogen generation if it exists and keep only 50 points in the line chart
        if (obj.nitrogenGeneration) {
          console.log("We found some nitrogen!")
          nitroNitrogenGenerationData.push(obj.NitrogenGeneration);
        }
        if (nitrothermocoupleData.length > maxLen) {
          nitroNitrogenGenerationData.shift();
        }
  
        //update charts with new points
        updateAllCharts([am2302Chart, thermocoupleChart, sht20Chart, pressureTransmitterChart]);
      }
    } 
    catch (err) {
      console.error(err);
    }
  } 

  window.onbeforeunload = function() {
    chartSaver(nitrotimeData,"nitrotimeData");
    chartSaver(nitroam2302HumidityData,"nitroam2302HumidityData");
    chartSaver(nitroam2302TemperatureData,"nitroam2302TemperatureData");
    chartSaver(nitrothermocoupleData,"nitrothermocoupleData");
    chartSaver(nitrosht20TemperatureData,"nitrosht20TemperatureData");
    chartSaver(nitrosht20HumidityData,"nitrosht20HumidityData");
    chartSaver(nitropressureTransmitterData,"nitropressureTransmitterData");
  }
})
  