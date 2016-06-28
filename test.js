var Labels = require('./index.js');

var labels = Labels({
  start: 'today', 
  interval: 'month',
  n: 7,
  //order: 'desc',
  //today : 'idag',
  //yesterday: 'igår',
  //months: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
  //days: ['Mån','Tis','Ons','Tors','Fre','Lör','Sön']
});

console.log(labels);