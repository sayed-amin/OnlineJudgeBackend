const input = [
    "5\n1 2 3 4 5",
    "4\n-1 -2 -3 -4",
    "3\n5 -1 2",
    "7\n-2 -3 4 -1 -2 1 5",
    "1\n-10"
];

const output = [
    "15",  // The sum of the entire array: 1 + 2 + 3 + 4 + 5 = 15
    "-1",  // The least negative number, which is -1
    "6",   // Maximum sum subarray: [5, -1, 2] = 6
    "7",   // Maximum sum subarray: [4, -1, -2, 1, 5] = 7
    "-10"  // Only one element, the maximum sum is the element itself
];

module.exports = { input, output };
