const input = [
    "broalgouniversity\nbestmentors",
    "abcde\nace",
    "abcd\nxyz",
    "abcdefg\nxyzabc",
    "abcxyz\nabcxyz",
    "a\nb"
];

const output = [
    "4",  // The longest common subsequence is "best"
    "3",  // The longest common subsequence is "ace"
    "0",  // No common subsequence
    "3",  // The longest common subsequence is "abc"
    "6",  // The longest common subsequence is "abcxyz"
    "0"   // No common subsequence
];

module.exports = { input, output };
