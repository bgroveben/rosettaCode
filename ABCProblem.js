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
