exports.externals = [
  // Angular libraries
  {expose: 'angular', path: './bower_components/angular/angular.js'},
  {expose: 'lodash', path: './node_modules/lodash/index.js'},
]

exports.externalsTest = [
  // Angular libraries
  {expose: 'angular-mocks', path: './bower_components/angular-mocks/angular-mocks.js'}
  ]