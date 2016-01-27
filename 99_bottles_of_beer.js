// Print out the lyrics to the 99 Bottles of Beer Song.

// ES 3-5
var beer = 99;
while (beer > 0) {
  var verse = [
    beer + " bottles of beer on the wall,",
    beer + " bottles of beer!",
    "Take one down, pass it around",
    (beer - 1) + " bottles of beer on the wall!"
  ].join("\n");

  console.log(verse);

  beer--;
}
console.log();


// ES 6
/* Node throws the following error when it gets to 'let verse =':
SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

let beer = 99;
while (beer > 0) {
  let verse = `${beer} bottles of beer on the wall,
  ${beer} bottles of beer!
  Take one down, pass it around
  ${beer-1} bottles of beer on the wall!`;

  console.log(verse);
  beer--;
}
*/


// Object Oriented
function Bottles(count) {
  this.count = count || 99;
}

Bottles.prototype.take = function() {
  var verse = [
    this.count + " bottles of beer on the wall,",
    this.count + " bottles of beer!",
    "Take one down, pass it around",
    (this.count - 1) + " bottles of beer on the wall!"
  ].join("\n");

  console.log(verse);
  this.count--;
};

Bottles.prototype.sing = function() {
  while (this.count) {
    this.take();
  }
};

var bar = new Bottles(99);
console.log(bar.sing());
