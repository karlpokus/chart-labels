// modules
var test = require('tape'),
    labels = require('./index.js');

test('Goes bang on wrong args', function(t){

  t.throws(function(){
    labels();
  }, /Must pass options/, 'opts missing');

  t.throws(function(){
    labels({interval: 'month', n: 5});
  }, /Required keys missing from options/, 'opts.start missing');

  t.throws(function(){
    labels({start: 'today', n: 5});
  }, /Required keys missing from options/, 'opts.interval missing');

  t.throws(function(){
    labels({start: 'today', interval: 'day'});
  }, /Required keys missing from options/, 'opts.n missing');

  var wrongTypes = [
    {start: {}, interval: 'day', n: 5, desc: 'opts.start is {}'},
    {start: [], interval: 'day', n: 5, desc: 'opts.start is []'},
    {start: 10, interval: 'day', n: 5, desc: 'opts.start is number'},
    {start: 'today', interval: 5, n: 5, desc: 'opts.interval is number'},
    {start: 'today', interval: [], n: 5, desc: 'opts.interval is []'},
    {start: 'today', interval: {}, n: 5, desc: 'opts.interval is {}'},
    {start: 'today', interval: 'day', n: "5", desc: 'opts.n is string'},
    {start: 'today', interval: 'day', n: [], desc: 'opts.n is []'},
    {start: 'today', interval: 'day', n: {}, desc: 'opts.n is {}'}
  ];

  wrongTypes.forEach(function(o){
    t.throws(function(){
      labels(o);
    }, /One or more required keys are of the wrong type/, o.desc);
  });

  t.end();
});

test('opts.start', function(t){

  var today = new Date(),
      today_day = today.getDate(),
      today_mo = today.getMonth() + 1,
      today_year = today.getFullYear(),
      today_mo0 = (today_mo < 10) ? "0" + today_mo : today_mo;

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() -1);
  var yesterday_day = yesterday.getDate(),
      yesterday_mo = yesterday.getMonth() + 1,
      yesterday_year = yesterday.getFullYear(),
      yesterday_mo0 = (yesterday_mo < 10) ? "0" + yesterday_mo : yesterday_mo;

  t.equal(labels({
    start: 'today', interval: 'day', n: 3, order: 'desc'
  })[0],
    today_day + "/" + today_mo,
    "opts.start: 'today', interval: 'day'"
  );

  t.equal(labels({
    start: 'yesterday', interval: 'day', n: 3, order: 'desc'
  })[0],
    yesterday_day + "/" + yesterday_mo,
    "opts.start: 'yesterday', interval: 'day'"
  );

  t.equal(labels({
    start: new Date(), interval: 'day', n: 3, order: 'desc'
  })[0],
    today_day + "/" + today_mo,
    "opts.start: new Date(), interval: 'day'"
  );

  t.equal(labels({
    start: 'today', interval: 'month', n: 3, order: 'desc'
  })[0],
    today_year + "-" + today_mo0,
    "opts.start: 'today', interval: 'month'"
  );

  t.equal(labels({
    start: 'yesterday', interval: 'month', n: 3, order: 'desc'
  })[0],
    yesterday_year + "-" + yesterday_mo0,
    "opts.start: 'yesterday', interval: 'month'"
  );

  t.equal(labels({
    start: new Date(), interval: 'month', n: 3, order: 'desc'
  })[0],
    today_year + "-" + today_mo0,
    "opts.start: new Date(), interval: 'month'"
  );

  t.end();
});

test('opts.n', function(t){

  t.equal(labels({
    start: 'today', interval: 'day', n: 12
  }).length, 12, 'out.length === opts.n');

  t.end();
});

test('Defaults', function(t){

  t.equal(labels({
    start: new Date("2016-02-10"), interval: 'day', n: 3
  })[0], '8/2', 'Asc is default');

  t.equal(labels({
    start: new Date("2016-02-10"), interval: 'day', n: 3, order: 'desc'
  })[0], '10/2', "opts.order 'desc'");

  t.end();
});

test('Formatting', function(t){

  t.equal(labels({
    start: 'today', interval: 'day', n: 3, today: 'idag', order: 'desc'
  })[0], 'idag', "start: 'today', opts.today");

  t.equal(labels({
    start: 'today', interval: 'day', n: 3, yesterday: 'igår', order: 'desc'
  })[1], 'igår', "start: 'today', opts.yesterday");

  t.equal(labels({
    start: 'yesterday', interval: 'day', n: 3, yesterday: 'igår', order: 'desc'
  })[0], 'igår', "start: 'yesterday', opts.yesterday");

  t.equal(labels({
    start: new Date("2016-05-22"), interval: 'day', n: 3, order: 'desc',
    days: ['Sön','Mån','Tis','Ons','Tors','Fre','Lör']
  })[0], 'Sön', "opts.days");

  t.equal(labels({
    start: new Date("2016-05-22"), interval: 'month', n: 3, order: 'desc',
    months: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
  })[0], 'Maj', "opts.months");

  t.end();
});
