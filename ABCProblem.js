/*
You are given a collection of ABC blocks, just like the ones you had when you were a kid.
There are twenty blocks with two letters on each block.
You are guaranteed to have a complete alphabet amongst all sides of the blocks.
The sample blocks are:
((B O)
(X K)
(D Q)
(C P)
(N A)
(G T)
(R E)
(T G)
(Q D)
(F S)
(J W)
(H U)
(V I)
(A N)
(O B)
(E R)
(F S)
(L Y)
(P C)
(Z M))


The goal of this task is to write a function that takes a string and can determine whether you can spell the word with the
given collection of blocks. The rules are simple:
1. Once a letter on a block is used, that block cannot be used again.
2. The function should be case-insensitive.
3. Show your output on this page for the following words:

Example
    >>> can_make_word("A")
    True
    >>> can_make_word("BARK")
    True
    >>> can_make_word("BOOK")
    False
    >>> can_make_word("TREAT")
    True
    >>> can_make_word("COMMON")
    False
    >>> can_make_word("SQUAD")
    True
    >>> can_make_word("CONFUSE")
    True
*/

// Regex
// The following method uses regular expressions and the string replace function to allow more support for older browsers.
var blocks = "BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM";

function CheckWord(blocks, word) {
    // Makes sure that the word only contains letters
    if(word !== /([a-z]*)/i.exec(word)[1]) return false;
    // Loops through each character to see if a block exists
    for(var i = 0; i < word.length; ++i)
    {
        // Gets the ith character
        var letter = word.charAt(i);
        // Stores the length of the blocks to determine if a block was removed
        var length = blocks.length;
        // The regexp gets constructed by eval to allow more browsers to use the function
        var reg = eval("/([a-z]"+letter+"|"+letter+"[a-z])/i");
        // This does the same as above, but some browsers do not support...
        // var reg = new RegExp("([a-z]"+letter+"|"+letter+"[a-z])", "i");
        // Removes all occurrences of the match.
        blocks = blocks.replace(reg, "");
        // If the length did not change then a block did not exist.
        if(blocks.length === length) return false;
    }
    // If every character has passed then return true.
    return true;
};

var words = [
    "A",
    "BARK",
    "BOOK",
    "TREAT",
    "COMMON",
    "SQUAD",
    "CONFUSE"
];

for(var i = 0; i < words.length; ++i)
    console.log("Can make word (" +words[i]+")" + ": " + CheckWord(blocks, words[i]));
console.log();


// Functional using ES5

console.log((function (strWords) {

    var strBlocks =
        'BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM',
        blocks = strBlocks.split(' ');

    function abc(lstBlocks, strWord) {
        var lngChars = strWord.length;

        if (!lngChars) return [];

        var b = lstBlocks[0],
            c = strWord[0];

        return chain(lstBlocks, function (b) {
            return (b.indexOf(c.toUpperCase()) !== -1) ? [
                (b + ' ').concat(
                    abc(removed(b, lstBlocks), strWord.slice(1)))
            ] : [];
        })
    }

    // Monadic bind (chain) for lists
    function chain(xs, f) {
        return [].concat.apply([], xs.map(f));
    }

    // a -> [a] -> [a]
    function removed(x, xs) {
        var h = xs.length ? xs[0] : null,
            t = h ? xs.slice(1) : [];

        return h ? (
            h === x ? t : [h].concat(removed(x, t))
        ) : [];
    }

    function solution(strWord) {
        var strAttempt = abc(blocks, strWord)[0].split(',')[0];

        // two chars per block plus one space -> 3
        return strWord + ((strAttempt.length === strWord.length * 3) ?
            ' -> ' + strAttempt : ': [no solution]');
    }

    return strWords.split(' ').map(solution).join('\n');

})('A BARK BOOK TREAT COMMON SQUAD CONFUSE'));
console.log();


// ES6
/*  SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

let characters = "BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM";
let blocks = characters.split(" ").map(pair => pair.split(""));

function isWordPossible(word) {
  var letters = [...word.toUpperCase()];
  var length = letters.length;
  var copy = new Set(blocks);

  for (let letter of letters) {
    for (let block of copy) {
      let index = block.indexOf(letter);

      if (index !== -1) {
        length--;
        copy.delete(block);
        break;
      }
    }

  }
  return !length;
}

[
  "A",
  "BARK",
  "BOOK",
  "TREAT",
  "COMMON",
  "SQUAD",
  "CONFUSE"
].forEach(word => console.log(`${word}: ${isWordPossible(word)}`));
*/
