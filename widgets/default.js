var configBase = 'widgets/aidax/';

FinalBoard.Config = {
  dashboards: [{
    title: 'AIDAX',
    widgets: [
      [ // First row
        {
          js: configBase + 'google-charts/data.js',
          template: configBase + 'google-charts/bar-chart.html',
          css_class: "bar-chart col-xs-12 col-md-8"
        },
        {
          template: configBase + 'components/total-clients.html',
          css_class: "two-rows col-xs-12 col-md-4"
        },
      ],
      [ // Middle row
        {
          template: configBase + 'components/volume-indications.html',
          css_class: "customer-aquisition-goal col-xs-12 col-md-8"
        },
        {
          template: configBase + 'components/total-clients-segmentation.html',
          css_class: "total-clients-segmentation col-xs-12 col-md-4"
        },
      ],
      [ // Last row
        {
          template: configBase + 'components/conversion-without-indication.html',
          css_class: "conversion-without-indication col-xs-12 col-md-4"
        },
        {
          template: configBase + 'components/conversion-with-indication.html',
          css_class: "conversion-with-indication col-xs-12 col-md-4"
        },
        {
          template: configBase + 'components/average-indication-per-person.html',
          css_class: "average-indication-per-person col-xs-12 col-md-4"
        },
      ]
    ]
  }]
};
