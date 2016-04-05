var configBase = 'widgets/aidax/';

FinalBoard.Config = {
  dashboards: [{
    title: 'AIDAX',
    widgets: [
      [
        {
          js: 'widgets/aidax/google-charts/data.js',
          template: 'widgets/aidax/google-charts/bar-chart.html',
          css_class: "col-xs-12 col-md-8"
        },
        {
          template: 'widgets/aidax/components/total-clients.html',
          css_class: "total-clients col-xs-12 col-md-4"
        },
        {
          template: 'widgets/aidax/components/customer-aquisition-goal.html',
          css_class: "customer-aquisition-goal col-xs-12 col-md-4"
        },
      ], [
        {
          template: 'widgets/aidax/components/volume-indications.html',
          css_class: "customer-aquisition-goal col-xs-12 col-md-8"
        },
        {
          template: 'widgets/aidax/components/total-clients-segmentation.html',
          css_class: "total-clients-segmentation col-xs-12 col-md-4"
        },
      ], [
        {
          template: 'widgets/aidax/components/conversion-without-indication.html',
          css_class: "conversion-without-indication col-xs-12 col-md-4"
        },
        {
          template: 'widgets/aidax/components/conversion-with-indication.html',
          css_class: "conversion-with-indication col-xs-12 col-md-4"
        },
        {
          template: 'widgets/aidax/components/average-indication-per-person.html',
          css_class: "average-indication-per-person col-xs-12 col-md-4"
        },
      ]
    ]
  }]
};
