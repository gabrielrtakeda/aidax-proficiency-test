var configBase = 'widgets/examples/';

FinalBoard.Config = {
    showNavigation: true,
    autoRotate: 0,
    dashboards: [{
        title: "Demo",
        widgets: [
            [
                {
                    template: configBase + "html/intro.html"
                },
                {
                    template: configBase + "server_monitor/template.html",
                    js: configBase + "server_monitor/data.js"
                },
                {
                    template: configBase + "html/bootstrap.html"
                }
            ],
            [
                {
                    template: configBase + "table/table.html",
                    data_url: configBase + 'table/table.json', // data url
                    data_interval: 60 // refresh interval in seconds
                },
                {
                    template: configBase + "table/table_condensed.html",
                    data_url: configBase + 'table/table_condensed.json',
                    data_interval: 60
                }
            ],
            [
                {
                    template: configBase + "countdown/template.html",
                    js: configBase + "countdown/data.js"
                }
            ], [
                {
                    template: configBase + "google_charts/line_chart.html",
                    js: configBase + "google_charts/data.js",
                    css_class: "col-xs-12 col-md-8"
                },
                {
                    template: configBase + "google_charts/pie_chart.html",
                    css_class: "col-xs-12 col-md-4"
                }
            ]
        ]
    }, {
        title: "Realtime charts",
        widgets: [
            [
                {
                    template: configBase + "flot_charts/realtime.html",
                    js: configBase + "flot_charts/data.js",
                    css_class: "col-xs-12 col-md-6"
                }, {
                    template: configBase + "flot_charts/realtime2.html",
                    js: configBase + "flot_charts/data2.js",
                    css_class: "col-xs-12 col-md-6"
                }
            ]
        ]
    }, {
        title: "Another dashboard",
        widgets: [
            [
                {
                    template: configBase + "html/intro2.html",
                    css_class: "col-xs-12 col-md-8"
                }, {
                    template: configBase + "clock/template.html",
                    js: configBase + "clock/data.js",
                    css_class: "col-xs-12 col-md-4"
                }
            ]
        ]
    }]
};
