$(document).ready(function () {

  //creating arrays for the different data streams
    junair1TimeData = [],
    junair1Am2302TemperatureData = [],
    junair1Am2302HumidityData = [],
    junair1PressureTransmitterData = [], 
    junair1ThermocoupleData = [],
    junair1Sht20TemperatureData = [],
    junair1Sht20HumidityData = [];
  
  (function chartDump (){
    chartDumper(junair1TimeData,"junair1TimeData")
    chartDumper(junair1Am2302HumidityData,"junair1Am2302HumidityData");
    chartDumper(junair1Am2302TemperatureData,"junair1Am2302TemperatureData");
    chartDumper(junair1ThermocoupleData,"junair1ThermocoupleData");
    chartDumper(junair1Sht20TemperatureData,"junair1Sht20TemperatureData");
    chartDumper(junair1Sht20HumidityData,"junair1Sht20HumidityData");
    chartDumper(junair1PressureTransmitterData,"junair1PressureTransmitterData");
  })();


  //datasets for the ambient conditions chart 
  var ambientConditionDataset = {
    labels: junair1TimeData,
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
      data: junair1Am2302TemperatureData 
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
      data: junair1Am2302HumidityData
    }]
  }
  //datasets for the airtank conditions chart 
  var airTankConditionDataset = {
    labels: junair1TimeData,
    datasets: [
      {
      fill: false,
      label: 'Temperature',
      yAxisID: 'Temperature',
      borderColor: "rgba(255, 0, 0, 1)",
      pointBoarderColor: "rgba(255, 0, 0, 1)",
      backgroundColor: "rgba(255, 0, 0, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
      pointHoverBorderColor: "rgba(255, 0, 0, 1)",
      data: junair1Sht20TemperatureData 
    },
    {
      fill: false,
      label: 'Pressure',
      yAxisID: 'Pressure',
      borderColor: "rgba(255, 204, 0, 1)",
      pointBoarderColor: "rgba(255, 204, 0, 1)",
      backgroundColor: "rgba(255, 204, 0, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
      pointHoverBorderColor: "rgba(255, 204, 0, 1)",
      data: junair1PressureTransmitterData 
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
      data: junair1Sht20HumidityData
    }]
  }

  //datasets for the compressor chart 
  var compressorTemperatureDataset = {
    labels: junair1TimeData,
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
      data: junair1ThermocoupleData 
    }]
  }

  //define options for the ambient conditions Chart
  var ambientConditionOptions = {
    title: {
      display: true,
      text: 'Ambient Conditions',
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

  //define options for the air tank conditions Chart
  var airTankConditionOptions = {
    title: {
      display: true,
      text: 'Air Tank Conditions',
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
        id: 'Pressure',
        type: 'linear',
        scaleLabel: {
          labelString: 'Pressure (psi)',
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
  
  //define options for the compressor temperature Chart
  var compressorTemperatureOptions = {
    title: {
      display: true,
      text: 'Compressor Temperature',
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
  
  //Get the context of the ambient conditions chart canvas element and instantiate the chart.
  var ambientctx = document.getElementById("ambientChartJunair1").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var ambientChart = new Chart(ambientctx, {
    type: 'line',
    data: ambientConditionDataset,
    options: ambientConditionOptions
  });

  //Get the context of the compressor temperature chart canvas element and instantiate the chart.
  var compressorctx = document.getElementById("compressorChartJunair1").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var compressorChart = new Chart(compressorctx, {
    type: 'line',
    data: compressorTemperatureDataset,
    options: compressorTemperatureOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var airtankctx = document.getElementById("airtankChartJunair1").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var airtankChart = new Chart(airtankctx, {
    type: 'line',
    data: airTankConditionDataset,
    options: airTankConditionOptions
  });
  
  function updateAllCharts (array){
    for (var i=0; i<array.length; i++) {
      array[i].update();
    }
  }

  updateAllCharts([ambientChart,compressorChart,airtankChart]);

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
      console.log(obj);
      if (obj.deviceId == "JunAir 1.0") {
        if (!obj.time) {
          //return;
        }
        junair1TimeData.push(obj.displayTime);
        
        // only keep no more than 50 points in the line chart
        const maxLen = 50;
        var len = junair1TimeData.length;
        if (len > maxLen) {
          junair1TimeData.shift();
        }

        //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
        if (obj.am2302Humidity) {
          junair1Am2302HumidityData.push(obj.am2302Humidity);
        }
        if (junair1Am2302HumidityData.length > maxLen) {
          junair1Am2302HumidityData.shift();
        }

        //push the am2302 temperature data if it exists and keep only 50 points in the line chart
        if (obj.am2302Temperature) {
          junair1Am2302TemperatureData.push(obj.am2302Temperature);
        }
        if (junair1Am2302TemperatureData.length > maxLen) {
          junair1Am2302TemperatureData.shift();
        }

        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.transducerPressure) {
          junair1PressureTransmitterData.push(obj.transducerPressure);
        }
        if (junair1PressureTransmitterData.length > maxLen) {
          junair1PressureTransmitterData.shift();
        }

        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.thermocoupleTemperature) {
          junair1ThermocoupleData.push(obj.thermocoupleTemperature);
        }
        if (junair1ThermocoupleData.length > maxLen) {
          junair1ThermocoupleData.shift();
        }

        //push the sht temperature data if it exists and keep only 50 points in the line chart
        if (obj.sht20Temperature) {
          junair1Sht20TemperatureData.push(obj.sht20Temperature);
        }
        if (junair1Sht20TemperatureData.length > maxLen) {
          junair1Sht20TemperatureData.shift();
        }

        //push the pressure transmitter data if it exists and keep only 50 points in the line chart
        if (obj.sht20Humidity) {
          junair1Sht20HumidityData.push(obj.sht20Humidity);
        }
        if (junair1Sht20HumidityData.length > maxLen) {
          junair1Sht20HumidityData.shift();
        }

        //update charts with new points
        updateAllCharts([ambientChart,compressorChart,airtankChart]);
      } 
    }
    catch (err) {
      console.error(err);
    }
  }
  
  window.onunload = function() {
    chartSaver(junair1TimeData,"junair1TimeData")
    chartSaver(junair1Am2302HumidityData,"junair1Am2302HumidityData");
    chartSaver(junair1Am2302TemperatureData,"junair1Am2302TemperatureData");
    chartSaver(junair1ThermocoupleData,"junair1ThermocoupleData");
    chartSaver(junair1Sht20TemperatureData,"junair1Sht20TemperatureData");
    chartSaver(junair1Sht20HumidityData,"junair1Sht20HumidityData");
    chartSaver(junair1PressureTransmitterData,"junair1PressureTransmitterData");
  }
})
