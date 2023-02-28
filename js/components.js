export const chart = function () {
  //CHART.JS
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          data: [12, 19, 10, 15, 22, 25],

          borderColor: ['#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5', '#e5e5e5'],
          pointBackgroundColor: '#e5e5e5',
          pointBorderColor: '#e5e5e5',
          // pointRadius: '3',
          // backgroundColor: ['rgba(255, 255, 255, 1)'],
          borderWidth: 4,
        },
      ],
    },
    options: {
      display: false,
      responsive: true,
      showLine: true,
      scaleShowLabels: false,
      fill: false,
      showTooltips: false,
      scales: {
        y: {
          ticks: {
            callback: function (value, index, values) {
              return value + ' °C';
            },
            color: '#e5e5e5',
            font: { size: 11, family: 'Lato-regular' },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: '#e5e5e5',
            font: { size: 11, family: 'Lato-regular' },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';

              if (context.parsed.y !== null) {
                label += ' ' + context.parsed.y + ' °C';
              }
              return label;
            },
          },
        },
      },
    },
  });
  /* myChart.data = {
    labels: ['1', '2', '3', '4', '5', '6'],
  };
  myChart.update(); */

  return myChart;
};

/* export const changeData = function (data) {
  let myChart = chart();
  myChart.data.labels = ['1', '2', '3', '4', '5', '6'];
  myChart.data.datasets[0].data = [1, 19, 5, 13, 22, 35];
  myChart.update();
}; */

export const map = function (lon = 16.3, lat = 48.2) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGVtcGVyNDQiLCJhIjoiY2ttdjF2ZGswMDB3YTJ1dXRucjB3NjJoYyJ9.7vndcsMZHr7Imw_TIdfvMg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    //center: [-74.5, 40], // starting position
    zoom: 9, // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl());

  map.flyTo({
    center: [lon, lat],
  });

  // MAP STYLE
  var layerList = document.getElementById('menu');
  var inputs = layerList.getElementsByTagName('input');

  function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  }

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
  }

  // COLOR MENU
  var swatches = document.getElementById('swatches');
  var layer = document.getElementById('layer');
  var colors = ['#41b6c4', '#2c7fb8', '#feb24c', '#fd8d3c', '#f03b20'];
  // console.log(swatches);
  colors.forEach(function (color) {
    var swatch = document.createElement('button');
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', function () {
      map.setPaintProperty(layer.value, 'fill-color', color);
    });
    // console.log(swatches.children.length);
    //To delete the old swatch
    if (swatches.children.length > 4) {
      swatches.innerHTML = '';
    }

    //if (swatches.children.length <= 4) {
    swatches.appendChild(swatch);
    // console.log(swatch);
    // swatches.innerHTML = swatch;
    //  }
  });
};
