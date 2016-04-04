FinalBoard.setDataProvider(function (updateData, $scope, $http) {

    var chartsData;

    window.loadCharts = function () {
        google.load("visualization", "1", {
            packages: ["corechart"],
            "callback": getDataAndDrawCharts
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
    //window.setInterval(getDataAndDrawCharts, 5000); // interval in seconds

    function getDataAndDrawCharts() {
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

        drawLineChart(chartsData['line_chart']);
        drawPieChart(chartsData['pie_chart']);

        // Update users count using jQuery
        $('#total_users').text(chartsData['total_users']);
        if ($('#column_chart').length) {
            drawColumnChart();
        }
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

    function drawLineChart(chartData) {
        var data = google.visualization.arrayToDataTable(chartData);
        var options = {
            title: '',
            pointSize: 8,
            backgroundColor: 'transparent',
            colors: ['#62C462', '#5587cc', '#5bc0de', '#ee5f5b', '#f89406'],
            legend: {position: 'top', textStyle: {color: '#7A8288'}},
            vAxis: {
                textStyle: {color: '#7A8288'},
                titleTextStyle: {
                    color: 'red'
                },
                baselineColor: '#32383E',
                gridlines: {
                    color: '#32383E'
                }
            },
            hAxis: {
                textStyle: {color: '#7A8288'},
                gridlines: {
                    color: '#32383E'
                },
                format: 'MMM, y'
            }
        };

        var $lineChartContainer = $('#line_chart');
        if ($lineChartContainer.length) {
            var chart = new google.visualization.LineChart($lineChartContainer[0]);
            chart.draw(data, options);
        }
    }

    function drawPieChart(chartData) {
        var data = google.visualization.arrayToDataTable(chartData);
        var options = {
            title: '',
            pieHole: 0.4,
            backgroundColor: 'transparent',
            colors: ['#5587cc', '#ee5f5b', '#5bc0de', '#f89406'],
            legend: {position: 'right', textStyle: {color: '#7A8288'}},
            pieSliceBorderColor: '#32383E'
        };

        var $pieChartContainer = $('#pie_chart');
        if ($pieChartContainer.length) {
            var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
            chart.draw(data, options);
        }
    }


    function drawColumnChart() {

        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ]);

        var options = {
            title: '',
            backgroundColor: 'transparent',
            colors: ['#62C462', '#ee5f5b', '#5bc0de', '#f89406'],
            legend: {position: 'right', textStyle: {color: '#7A8288'}},
            hAxis: {
                title: 'Year',
                textStyle: {color: '#7A8288'},
                titleTextStyle: {color: '#7A8288'}
            },
            vAxis: {
                textStyle: {color: '#7A8288'},
                titleTextStyle: {
                    color: 'red'
                },
                baselineColor: '#32383E',
                gridlines: {
                    color: '#32383E'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));

        chart.draw(data, options);

    }

});
