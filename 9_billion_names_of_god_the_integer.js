/*
This task is a variation of the short story by Arthur C. Clarke.
https://en.wikipedia.org/wiki/The_Nine_Billion_Names_of_God#Plot_summary
This short story tells of a Tibetan lamasery whose monks seek to list all of the names of God,
since they believe that the Universe was created for this purpose, and that once this naming is completed,
God will bring the Universe to an end.
Three centuries ago, the monks created an alphabet in which they calculated they could encode all of the
possible names of God, numbering about 9 billion and each having no more than nine characters.
We're going to do this using modern technology.
In detail, to specify what is meant by a "name":
* The integer 1 has 1 name "1".
* The integer 2 has 2 names "1+1" and "2".
* The integer 3 has 3 names "1+1+1", "2+1", and "3".
* The integer 4 has 5 names "1+1+1+1", "2+1+1", "2+2", "3+1", and "4".
* The integer 5 has 7 names "1+1+1+1+1", "2+1+1+1", "2+2+1", "3+1+1", "3+2", "4+1", and "5".
* So on and so forth, etc.
TASK
The task is to display the first 25 rows of a number triangle which begins:

                                            1
                                          1   1
                                        1   1   1
                                      1   2   1   1
                                    1   2   2   1   1
                                  1   3   3   2   1   1

Actual output may look more like this:

1
1   1
1   1   1
1   2   1   1
1   2   2   1   1
1   3   3   2   1   1

Now pay attention:

Where row n corresponds to integer n, and each column C in row m from left to right corresponds to
the number of names (integers) beginning with C.
A function G(n) should return the sum of the n-th row.
Demonstrate this function by displaying: G(23), G(123), G(1234), and G(12345).
Optionally note that the sum of the n-th row P(n) is the integer partition function.
http://mathworld.wolfram.com/PartitionFunctionP.html
Demonstrate that this is equivalent to G(n) by displaying: P(23), P(123), P(1234), and P(12345).
Extra Credit: If your environment is able, plot P(n) against n for n = 1...999.
*/
// This is a translation from Python.
(function () {
    var cache = [
        [1]
    ];
//this was never needed.
   /* function PyRange(start, end, step) {
        step = step || 1;
        if (!end) {
            end = start;
            start = 0;
        }
        var arr = [];
        for (var i = start; i < end; i += step) arr.push(i);
        return arr;
    }*/

    function cumu(n) {
        var /*ra = PyRange(cache.length, n + 1),*/ //Seems there is a better version for this
            r, l, x, Aa, Mi;
       // for (ll in ra) { too pythony
       for (l=cache.length;l<n+1;l++) {
            r = [0];
//            l = ra[ll];
//            ran = PyRange(1, l + 1);
//            for (xx in ran) {
            for(x=1;x<l+1;x++){
//                x = ran[xx];
                r.push(r[r.length - 1] + (Aa = cache[l - x < 0 ? cache.length - (l - x) : l - x])[(Mi = Math.min(x, l - x)) < 0 ? Aa.length - Mi : Mi]);
            }
            cache.push(r);
        }
        return cache[n];
    }

    function row(n) {
        var r = cumu(n),
//            rra = PyRange(n),
            leArray = [],
            i;
//        for (ii in rra) {
        for (i=0;i<n;i++) {
//            i = rra[ii];
            leArray.push(r[i + 1] - r[i]);
        }
        return leArray;
    }

    console.log("Rows:");
    for (iterator = 1; iterator < 12; iterator++) {
        console.log(row(iterator));
    }

    console.log("Sums:");
    [23, 123, 1234, 12345].forEach(function (a) {
        var s = cumu(a);
        console.log(a, s[s.length - 1]);
    });
})()
