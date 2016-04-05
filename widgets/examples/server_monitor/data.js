FinalBoard.setDataProvider(function (updateData, $scope, $http) {

    // Generates some fake data using JS
    // You can also load data from remote json, by specifying "url" param in config
    function onInterval() {

        var cpu = randomInt(5, 95),
            memory = randomInt(Math.max(0, cpu - 40), Math.min(100, cpu + 40)),
            interval;

        // Inject object data into template using updateData() callback
        updateData({
            cpu: cpu,
            disk: {perc: randomInt(5, 30)},
            memory: {
                virtual: {
                    perc: memory,
                    total: '16 GB',
                    active: (16 * memory / 100) + ' GB'
                },
                swap: {perc: memory, total: '32 GB', used: '100 MB'}
            }
        });
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onInterval();

    interval = window.setInterval(onInterval, 2000);

    // Unbind events on dashboard close
    $scope.$on('onDashboardClose', function () {
        window.clearInterval(interval);
    });

});
