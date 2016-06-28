[![npm version](https://badge.fury.io/js/chart-labels.svg)](https://badge.fury.io/js/chart-labels)
[![Build Status](https://travis-ci.org/karlpokus/chart-labels.svg?branch=master)](https://travis-ci.org/karlpokus/chart-labels)

# chart-labels
Generate labels for time series on the x-axis relative to a start date by day or month. Returns an array of labels. Works with chartJS, chartist etc. Browserify compatible.

# Usage
```javascript
var Labels = require('chart-labels');`

// options
var labels = Labels({
  // REQUIRED
  start: 'today', // (date or string) Start date of the series. Valid strings are 'today' or 'yesterday'
  interval: 'month', // (string) 'day' or 'month'
  n: 12, // (number) Number of labels
  // OPTIONAL
  order: 'desc', // (string) 'asc' or 'desc' - Order of returned values - default is 'asc' 
  today : 'idag', // (string) - String to replace first value of returned array 
  yesterday: 'igår', // (string) - String to replace second value of returned array 
  months: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'], // (array) Names of months 
  days: ['Mån','Tis','Ons','Tors','Fre','Lör','Sön'] // (array) Names of weekdays 
});

// examples (today is 2016-06-28)

var days = Labels({
  start: 'today',
  interval: 'day',
  n: 7
}); // returns [ '22/6', '23/6', '24/6', '25/6', '26/6', '27/6', '28/6' ]

var months = Labels({
  start: 'today',
  interval: 'month',
  n: 7
}); // returns [ '2015-12', '2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06' ]

```

# Test
```
$ npm test
```