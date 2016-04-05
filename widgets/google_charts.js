var configBase = 'widgets/examples/';

FinalBoard.Config = {
    dashboards: [
        {
            title: 'Google Charts',
            widgets: [
                [
                    {
                        template: configBase + "google_charts/line_chart.html",
                        js: configBase + "google_charts/data.js",
                        css_class: "col-xs-12 col-md-8"
                    },
                    {
                        template: configBase + "google_charts/pie_chart.html",
                        css_class: "col-xs-12 col-md-4"
                    }
                ],
                [
                    {
                        template: configBase + "google_charts/column_chart.html"
                    }
                ]
            ]
        }
    ]
};
