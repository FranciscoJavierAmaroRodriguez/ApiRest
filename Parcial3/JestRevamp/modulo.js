function multi(no1,no2) {
    return no1 * no2;
  }
  
function Random6(min,max) {
    return Math.random()*(max - min)+min;
  }
module.exports.Random6 = Random6;

module.exports.multi = multi;