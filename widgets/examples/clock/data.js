FinalBoard.setDataProvider(function (updateData, $scope, $http) {

    var interval;

    function onEverySecond() {

        // Inject object data into template using updateData() callback
        updateData({
            'time': new Date().toString()
        });
    }

    // Initial call
    onEverySecond();

    // Update data every second
    interval = window.setInterval(onEverySecond, 1000);

    // Unbind any events and intervals on dashboard close
    $scope.$on('onDashboardClose', function () {
        window.clearInterval(interval);
    });

});
