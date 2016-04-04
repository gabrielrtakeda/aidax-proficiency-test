FinalBoard.setDataProvider(function (updateData, $scope, $http) {

    // Helper function to change color when deadline is close
    $scope.how_close = function (value) {
        if (value) {
            if (value.indexOf('week') == -1) {
                if (value.indexOf('days') == -1) {
                    return 81;
                }
                return 80;
            }
        }
        return 0;
    };

    // Calculate deadline
    var deadline = new Date(2015, 3, 30),
        regexp = new RegExp("(\\d+)", "gm"),
        interval;

    function onEverySecond() {
        var seconds_left = Math.round((deadline - new Date()) / 1000);
        var eta = humanTime(seconds_left, true);

        // Inject object data into template using updateData() callback
        updateData({
            'eta': eta.replace(regexp, "<strong>$1</strong>")
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

// Helper function for human date formatting
function humanTime(seconds, fullUnits) {
    var units = [
        {label: "second", mod: 60},
        {label: "minute", mod: 60},
        {label: "hour", mod: 24},
        {label: "day", mod: 7},
        {label: "week", mod: 52}
    ];
    var duration = {};
    var x = seconds;
    for (i = 0; i < units.length; i++) {
        var tmp = x % units[i].mod;
        duration[units[i].label] = tmp;
        x = (x - tmp) / units[i].mod
    }
    str_arr = [];
    units = units.reverse();
    for (i = 0; i < units.length; i++) {
        var label = units[i].label,
            value = duration[label];
        if (fullUnits) {
            if (value > 1) {
                label += 's';
            }
        } else {
            label = label[0];
        }
        if (value) {
            str_arr.push(value + '' + label);
        }
    }
    return str_arr.join(' ');
}

