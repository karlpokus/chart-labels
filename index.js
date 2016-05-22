module.exports = function(opts) {

  // errs
  if (!opts) {
    throw new Error("Must pass options");
  }
  if (!opts.start || !opts.interval || !opts.n) {
    throw new Error("Required keys missing from options");
  }
  if (typeof opts.start !== 'string' && !(opts.start instanceof Date) ||
      typeof opts.interval !== 'string' ||
      typeof opts.n !== 'number') {
    throw new Error('One or more required keys are of the wrong type');
  }

  // vars
  var order = opts.order || 'asc', // set default
      i = 0,
      n = opts.n,
      out = [],
      s, d, day, mo, str;

  // adjust start date
  if (opts.start === 'today') {
    s = new Date();
  } else if (opts.start === 'yesterday') {
    s = new Date();
    s.setDate(s.getDate() -1);
  } else {
    s = opts.start;
  }

  // day
  if (opts.interval === 'day') {

    for (i; i < n; i++) {

      d = new Date(s.valueOf());
      d.setDate(d.getDate() - i);

      if (opts.days) {
        str = opts.days[d.getDay()];
      } else {
        day = d.getDate();
        mo = d.getMonth() + 1; // compensate for 0-indexed
        str = day + "/" + mo;
      }

      out.push(str);
    }

    // formatting
    if (opts.start === 'today' && opts.today) {out[0] = opts.today}
    if (opts.start === 'today' && opts.yesterday) {out[1] = opts.yesterday}
    if (opts.start === 'yesterday' && opts.yesterday) {out[0] = opts.yesterday}
  }

  // mo
  if (opts.interval === 'month') {

    for (i; i < n; i++) {

      d = new Date(s.valueOf());
      d.setMonth(d.getMonth() - i);

      if (opts.months) {
        str = opts.months[d.getMonth()]; // no compensation
      } else {
        mo = d.getMonth() + 1; // compensate for 0-indexed
        mo = (mo < 10) ? "0" + mo : mo; // add 0 to 1-9
        str = d.getFullYear() + "-" + mo;
      }

      out.push(str);
    }
  }

  // out
  if (order === 'asc') {
    return out.reverse();
  } else {
    return out;
  }
}
