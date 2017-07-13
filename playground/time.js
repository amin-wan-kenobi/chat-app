var moment = require('moment');

var date = moment();

var date2 = moment(1234);
console.log(date);
console.log(date.format('YYYY Do, MMM'));
//https://momentjs.com/docs/#/displaying/

//https://momentjs.com/docs/#/manipulating/

date.add(1, 'year').add(5,'day');
console.log(date.format('YYYY Do, MMM'));
console.log(date.format('h:mm a'));

console.log(new Date().getTime());
console.log(moment().valueOf());