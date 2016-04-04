FinalBoard.setDataProvider(function (updateData, $scope, $http) {

    // Add some required JS files and start rendering once loaded
    $.when(
        $.getScript('widgets/examples/flot_charts/flot/jquery.flot.min.js'),
        //$.getScript('load-another-file-if-needed.js'),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    ).done(onJsLoaded);

    // We use an inline data source in the example, usually data would
    // be fetched from a server

    function onJsLoaded() {

        var data = [],
            totalPoints = 100,
            updateInterval = 1000,
            plot;

        function getRandomData() {

            if (data.length > 0)
                data = data.slice(1);

            // Do a random walk
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                data.push(y);
            }

            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return res;
        }

        function getData() {
            return {
                color: "#7DB16C",
                bars: {show: true, align: "center", barWidth: .7},
                data: getRandomData(),
                label: "Req/s"
            }
        }

        // Set data provider (in our case random data) and add styling
        function draw() {
            plot = $.plot("#flot-realtime2", [getData()], {
                series: {
                    shadowSize: 0,	// Drawing is faster without shadows
                    bars: {
                        lineWidth: 0,
                        fill: 1
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickColor: '#32383E',
                    font: {color: '#7A8288'}
                },
                xaxis: {
                    tickColor: '#32383E',
                    font: {color: '#7A8288'}
                },
                grid: {
                    borderWidth: 1,
                    minBorderMargin: 20,
                    borderColor: '#32383E',
                    color: '#7A8288',
                    labelMargin: 10,
                    margin: {
                        top: 8,
                        bottom: 20,
                        left: 20
                    }
                },
                legend: {
                    position: 'nw',
                    backgroundOpacity: 0,
                    margin: 5
                }
            });
        }

        function update() {
            if (!plot) {
                return;
            }
            plot.setData([getData()]);
            plot.draw();
            setTimeout(update, updateInterval);

        }

        draw();
        update();

        // Attach to resize event
        $(window).on('resize', draw);

        // On dashboard close destroy chart and unbind events
        $scope.$on('onDashboardClose', function () {
            $(window).off('resize', draw);
            plot.destroy();
            plot = null;
        });

    }

});
