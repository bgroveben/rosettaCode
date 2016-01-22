// http://rosettacode.org/wiki/100_doors
/*
Problem: You have 100 doors in a row that are all initially closed.
You make 100 passes by the doors.
The first time through, you visit every door and toggle the door (if closed, open it, and vice-versa).
The second time through, you only visit the second door(2,4,6,...) and toggle it.
The third time through, toggle every third door, and so on until you only visit the 100th door.
Questions: What state are the doors in after the last pass? Which are open, and which are closed?
*/
// unoptimized (iterative)
var doors = [];
for (var i = 0; i < 100; i++) {
  doors[i] = false;  // create array with 100 doors and initialize them to false (closed)
}
for (var i = 1; i <= 100; i++) {  // start by going through each door
  for (var i2 = i - 1; i2 < 100; i2+=i) { // on subsequent passes, go through every other door, then every 3rd door, etc
    doors[i2] = !doors[i2];  // toggle doors open (true) or false (closed)
  }
}
for (var i = 1; i <= 100; i++) { // read doors
  console.log("Door %d is %s", i, doors[i - 1]?"open":"closed");  // Prints status of each door
}
// The only doors that remain open are the ones who are perfect squares of integers,
// i.e. door 64 is open (8 * 8).
console.log();

// optimized (iterative)
for (var door = 1; door <= 100; door++) {
  var sqrt = Math.sqrt(door);
  if (sqrt === (sqrt | 0)) {  // Bitwise OR | returns correct answer, Logical OR || logs all doors as being open
    console.log("Door %d is open", door); // Prints which doors are open
  }
}
console.log();


// Optimized even further
for(var door=1, i=1; i < 10/*Math.sqrt(100)*/;i++){
 console.log("Door %d is open",i*i);
}
console.log();


// optimized (functional)
