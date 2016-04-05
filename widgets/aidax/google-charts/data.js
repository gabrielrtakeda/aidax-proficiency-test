FinalBoard.setDataProvider(function (updateData, $scope, $http) {

  var chartsData;

  window.loadCharts = function () {
    google.load("visualization", "1", {
      packages: ["corechart"],
      "callback": getDataAndDrawChart
    });
  };

  function loadChartsAPI() {
    var script = document.createElement("script");
    script.src = "http://www.google.com/jsapi?callback=loadCharts";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  loadChartsAPI();

  // Bind to resize events and redraw google charts (optional).
  initRedrawOnResize();

  // Uncomment next line to enable data reload on interval
  //window.setInterval(getDataAndDrawChart, 5000); // interval in seconds

  function getDataAndDrawChart() {
    $http.get('widgets/examples/google_charts/data.json').success(function (data) {
      // Iterate and convert date string to date object
      for (var i in data['line_chart']) {
        if (i > 0) {
          data['line_chart'][i][0] = new Date(data['line_chart'][i][0]);
        }
      }
      chartsData = data;
      drawAllCharts();
    });
  }

  function drawAllCharts() {
    if (!chartsData) {
      return;
    }

    // Update users count using jQuery
    drawBarChart();
    drawLineChart();
    drawPieChart();
  }

  function initRedrawOnResize() {
    $(window).resize(function () {
      if (this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
      }, 500);
    });

    $(window).on('resizeEnd', drawAllCharts);

    // Unbind events on dashboard close
    $scope.$on('onDashboardClose', function () {
      $(window).off('resizeEnd', drawAllCharts);
      chartsData = null;
    });
  }

  function drawBarChart() {
    var data = google.visualization.arrayToDataTable([
      ['Origem', 'Visualizações'],
      ['Landing page', 1000],
      ['Cadastro: Configurações', 900],
      ['Cadastro: Dados Pessoais', 800],
      ['Cadastro: Confirmação', 90],
      ['Indique um amigo', 50],
      ['Indicação confirmada', 10]
    ]);
    data.setProperty(0, 0, {style: 'height:100px'});

    var options = {
      title: '',
      chartArea: {left: '28%', right: '2%', width: '70%', height: '90%'},
      backgroundColor: 'transparent',
      colors: ['#498fe1'],
      bar: {groupWidth: '90%'},
      legend: 'none',
      hAxis: {
        title: '',
        textStyle: {color: 'transparent'},
        gridlines: { color: 'transparent' }
      },
      vAxis: {
        textStyle: {color: '#999', fontSize: 18},
        gridlines: { color: 'transparent' }
      }
    };

    var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
    chart.draw(data, options);
  }

  function drawLineChart() {
    var data = google.visualization.arrayToDataTable([
      ['Semana', 'Indicacões', 'Conversões'],
      ['Semana #1', 84, 70],
      ['Semana #2', 90, 82],
      ['Semana #3', 96, 85],
      ['Semana #4', 95, 87]
    ]);
    data.setProperty(0, 0, {style: 'height:100px'});

    var options = {
      title: '',
      chartArea: {left: '5%', width: '95%', height: '90%'},
      backgroundColor: 'transparent',
      colors: ['#498fe1', '#f7e71b'],
      legend: {position: 'bottom', textStyle: {color: '#7A8288'}},
      hAxis: {
        textStyle: {color: '#999', fontSize: 18},
        gridlines: { color: '#282828' },
      },
      vAxis: {
        textStyle: {color: '#999', fontSize: 18},
        gridlines: { color: '#282828' }
      },
      pointSize: 25,
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(data, options);
  }

  function drawPieChart() {
    var data = google.visualization.arrayToDataTable([
      ['Semana', 'Indicacões'],
      ['Com indicação', 25],
      ['Sem indicação', 75]
    ]);
    data.setProperty(0, 0, {style: 'height:100px'});

    var options = {
      title: '',
      chartArea: {left: '5%', width: '95%', height: '90%'},
      backgroundColor: 'transparent',
      colors: ['#f5a523', '#498fe1'],
      legend: {position: 'bottom', textStyle: {color: '#7A8288'}},
      hAxis: {
        textStyle: {color: '#999', fontSize: 18},
        gridlines: { color: '#282828' },
      },
      vAxis: {
        textStyle: {color: '#999', fontSize: 18},
        gridlines: { color: '#282828' }
      },
      pointSize: 25,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(data, options);
  }
});
