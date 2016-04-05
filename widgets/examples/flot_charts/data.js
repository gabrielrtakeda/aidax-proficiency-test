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

        var flotData = {'r1': [], 'r2': []},
            totalPoints = 300,
            updateInterval = 30,
            plot;

        function getRandomData(key) {

            data = flotData[key];
            if (data.length > 0)
                data = flotData[key] = data.slice(1);

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


        // Set data provider (in our case random data) and add styling
        function draw() {
            plot = $.plot("#flot-realtime", [getRandomData('r1'), getRandomData('r2')], {
                series: {
                    shadowSize: 0,	// Drawing is faster without shadows
                    lines: {
                        fill: 0.1
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
                    color: '#32383E',
                    labelMargin: 10,
                    margin: {
                        top: 8,
                        bottom: 20,
                        left: 20
                    }
                }
            });
        }

        function update() {
            if (!plot) {
                return;
            }
            plot.setData([getRandomData('r1'), getRandomData('r2')]);
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
