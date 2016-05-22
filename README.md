[![Build Status](https://travis-ci.org/karlpokus/chart-labels.svg?branch=master)](https://travis-ci.org/karlpokus/chart-labels)

# chart-labels
Generate labels for time series on the x-axis relative to a start date by day or month. Returns an array of labels. Works with chartJS, chartist etc. Browserify compatible.

# Usage
`var Labels = require('chart-labels');`

```
var labels = Labels({
  start: 'today', // (date or string) Start date of the series. Valid strings are 'today' or 'yesterday' REQUIRED
  interval: 'month', // (string) 'day' or 'month' REQUIRED
  n: 12, // (number) Number of labels REQUIRED
  order: 'desc', // (string) 'asc' or 'desc' - Order of returned values - default is 'asc' OPTIONAL
  today : 'idag', // (string) - String to replace first value of returned array OPTIONAL
  yesterday: 'igår', // (string) - String to replace second value of returned array OPTIONAL
  months: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'], // (array) Names of months OPTIONAL
  days: ['Mån','Tis','Ons','Tors','Fre','Lör','Sön'] // (array) Names of weekdays OPTIONAL
});
```
