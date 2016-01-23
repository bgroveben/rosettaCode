// http://rosettacode.org/wiki/100_doors
/*
Problem: You have 100 doors in a row that are all initially closed.
You make 100 passes by the doors.
The first time through, you visit every door and toggle the door (if closed, open it, and vice-versa).
The second time through, you only visit the second door(2,4,6,...) and toggle it.
The third time through, toggle every third door, and so on until you only visit the 100th door.
Questions: What state are the doors in after the last pass? Which are open, and which are closed?
*/
// The following are for ES5:
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


// unoptimized (functional)
console.log((function () {
  return chain(
    // 100 passes ...
    rng(0, 99).reduce(function (a, _, i) {
      return a.slice(0, i).concat(
        a.slice(i).map(function (v, j) {
          return (i + j + 1) % (i + 1) ? v : {
            door: v.door,
            open: !v.open
          };
        })
      )
    },
    // 100 closed doors at start
    Array.apply(null, Array(100)).map(function (x, i) {
      return {
        open: false,
        door: i + 1
      };
    })),
    // Filtering by chained function
    function (door) {
      return door.open ? [door] : [];
    }
  )
  // Monadic bind (chain) for lists
  function chain(xs, f) {
    return [].concat.apply([], xs.map(f));
  }
  // range(1, 20) --> [1..20]
  function rng(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }
})());
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
Array.apply(null, { length: 100 })
  .map(function(v, i) { return i + 1; })
    .forEach(function(door) {
      var sqrt = Math.sqrt(door);

      if (sqrt === (sqrt | 0)) {
        console.log("Door %d is open", door);
      }
    });
console.log();


// Filtering with a list monad
console.log((function () {
  return chain(
    rng(1, 100),
    function (x) {
      var root = Math.sqrt(x);
      return root === Math.floor(root) ? inject(x) : fail();
    }
  );
  // monadic Bind/chain for lists
  function chain(xs, f) {
    return [].concat.apply([], xs.map(f));
  }
  // monadic Return/inject for lists
  function inject(x) { return [x]; }
  // monadic Fail for lists
  function fail() { return []; }
  // rng(1, 20) --> [1..20]
  function rng(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }
})());
console.log();


// Filtering with Array.filter()
console.log((function () {
  return rng(1, 100).filter(
    function (x) {
      var root = Math.sqrt(x);
      return root === Math.floor(root);
    }
  );
  // rng(1, 20) --> [1..20]
  function rng(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }
})());
console.log();

// Or simply generating ...
console.log((function () {
  return rng(1, Math.sqrt(100)).map(function (x) {
    return x * x;
  });
  // rng(1, 20) --> [1..20]
  function rng(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }
})());
console.log();


// The following are for ES6:
Array.apply(null, { length: 100 })
  .map((v, i) => i + 1)
  .forEach(door => {
    var sqrt = Math.sqrt(door);
    if (sqrt === (sqrt | 0)) {
      console.log("Door %d is open", door);
    }
  });
console.log();


// Array comprehension style
/*  This one doesn't want to run -- the debugger highlights the for after the opening square bracket
[ for (i of Array.apply(null, { length: 100 })) i ].forEach((_, i) => {
  var door = i + 1
  var sqrt = Math.sqrt(door);

  if (sqrt === (sqrt | 0)) {
    console.log("Door %d is open", door);
  }
});
console.log();
*/
