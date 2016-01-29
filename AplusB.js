// A+B
/*
In programming contests, this is a classic problem which is given so contestants can gain familiarity with
the online judging system being used.
Problem Statement:
Find the sum of two given integers, A and B.
Input Data:
Two integers are written in the input stream, separated by a space.
(-1000 <= A,B <= 1000)
Output Data:
The required output is onte integer, the sum of A and B
>> 2 2 4
>> 3 2 5
*/
// ES5 client side (change this file from AplusB.js to AplusB.html to run in your browser)
/*
<html>
<body>
<div id='input'></div>
<div id='output'></div>
<script type='text/javascript'>
var a = window.prompt('Enter number A', '');
var b = window.prompt('Enter number B', '');
document.getElementById('input').innerHTML = a + ' ' + b;
var sum = Number(a) + Number(b);
document.getElementById('output').innerHTML = sum;
</script>
</body>
</html>
*/

// ES5 Server Side using node.js
process.openStdin().on (
  'data',
  function (line) {
    var xs = String(line).match(/^\s*(\d+)\s+(\d+)\s*/)
    console.log (
        xs ? Number(xs[1]) + Number(xs[2]) : 'usage: <number> <number>'
    )
    process.exit()
  }
)

// ES6 using node.js in a terminal:
process.stdin.on("data", buffer => {
  console.log(
    (buffer + "").trim().split(" ").map(Number).reduce((a, v) => a + v, 0)
  );
  process.exit();
});
