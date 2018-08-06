$(document).ready(function () {
  //creating arrays for the different data streams
  junair2TimeData = [],
  junair2Am2302TemperatureData = [],
  junair2Am2302HumidityData = [],
  junair2PressureTransmitterData = [], 
  junair2ThermocoupleData = [],
  junair2Sht20TemperatureData = [],
  junair2Sht20HumidityData = [];

  (function chartDump (){
  chartDumper(junair2TimeData,"junair2TimeData")
  chartDumper(junair2Am2302HumidityData,"junair2Am2302HumidityData");
  chartDumper(junair2Am2302TemperatureData,"junair2Am2302TemperatureData");
  chartDumper(junair2ThermocoupleData,"junair2ThermocoupleData");
  chartDumper(junair2Sht20TemperatureData,"junair2Sht20TemperatureData");
  chartDumper(junair2Sht20HumidityData,"junair2Sht20HumidityData");
  chartDumper(junair2PressureTransmitterData,"junair2PressureTransmitterData");
  })();


  //datasets for the ambient conditions chart 
  var ambientConditionDataset = {
  labels: junair2TimeData,
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
    data: junair2Am2302TemperatureData 
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
    data: junair2Am2302HumidityData
  }]
  }
  //datasets for the airtank conditions chart 
  var airTankConditionDataset = {
  labels: junair2TimeData,
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
    data: junair2Sht20TemperatureData 
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
    data: junair2PressureTransmitterData 
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
    data: junair2Sht20HumidityData
  }]
  }

  //datasets for the compressor chart 
  var compressorTemperatureDataset = {
  labels: junair2TimeData,
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
    data: junair2ThermocoupleData 
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
  var ambientctx = document.getElementById("ambientChartJunair2").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var ambientChart = new Chart(ambientctx, {
  type: 'line',
  data: ambientConditionDataset,
  options: ambientConditionOptions
  });

  //Get the context of the compressor temperature chart canvas element and instantiate the chart.
  var compressorctx = document.getElementById("compressorChartJunair2").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var compressorChart = new Chart(compressorctx, {
  type: 'line',
  data: compressorTemperatureDataset,
  options: compressorTemperatureOptions
  });

  //Get the context of the Pressure transmitter chart canvas element.
  var airtankctx = document.getElementById("airtankChartJunair2").getContext("2d");
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

    if (obj.deviceId == "JunAir 2.0") {
      if (!obj.time) {
        return;
      }
      junair2TimeData.push(obj.displayTime);

      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = junair2TimeData.length;
      if (len > maxLen) {
        junair2TimeData.shift();
      }

      //push the am2302 humiduty data if it exists and keep only 50 points in the line chart
      if (obj.am2302Humidity) {
        junair2Am2302HumidityData.push(obj.am2302Humidity);
      }
      if (junair2Am2302HumidityData.length > maxLen) {
        junair2Am2302HumidityData.shift();
      }

      //push the am2302 temperature data if it exists and keep only 50 points in the line chart
      if (obj.am2302Temperature) {
        junair2Am2302TemperatureData.push(obj.am2302Temperature);
      }
      if (junair2Am2302TemperatureData.length > maxLen) {
        junair2Am2302TemperatureData.shift();
      }

      //push the pressure transmitter data if it exists and keep only 50 points in the line chart
      if (obj.transducerPressure) {
        junair2PressureTransmitterData.push(obj.transducerPressure);
      }
      if (junair2PressureTransmitterData.length > maxLen) {
        junair2PressureTransmitterData.shift();
      }

      //push the pressure transmitter data if it exists and keep only 50 points in the line chart
      if (obj.thermocoupleTemperature) {
        junair2ThermocoupleData.push(obj.thermocoupleTemperature);
      }
      if (junair2ThermocoupleData.length > maxLen) {
        junair2ThermocoupleData.shift();
      }

      //push the sht temperature data if it exists and keep only 50 points in the line chart
      if (obj.sht20Temperature) {
        junair2Sht20TemperatureData.push(obj.sht20Temperature);
      }
      if (junair2Sht20TemperatureData.length > maxLen) {
        junair2Sht20TemperatureData.shift();
      }

      //push the pressure transmitter data if it exists and keep only 50 points in the line chart
      if (obj.sht20Humidity) {
        junair2Sht20HumidityData.push(obj.sht20Humidity);
      }
      if (junair2Sht20HumidityData.length > maxLen) {
        junair2Sht20HumidityData.shift();
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
  chartSaver(junair2TimeData,"junair2TimeData")
  chartSaver(junair2Am2302HumidityData,"junair2Am2302HumidityData");
  chartSaver(junair2Am2302TemperatureData,"junair2Am2302TemperatureData");
  chartSaver(junair2ThermocoupleData,"junair2ThermocoupleData");
  chartSaver(junair2Sht20TemperatureData,"junair2Sht20TemperatureData");
  chartSaver(junair2Sht20HumidityData,"junair2Sht20HumidityData");
  chartSaver(junair2PressureTransmitterData,"junair2PressureTransmitterData");
  }
})

  