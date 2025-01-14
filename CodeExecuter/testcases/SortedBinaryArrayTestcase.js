const input = [
    "5\n0 0 0 1 1",  // Mixed binary array with 0's and 1's
    "5\n0 0 0 0 0",  // Array with all 0's
    "5\n1 1 1 1 1",  // Array with all 1's
    "4\n0 0 0 1",    // Array with one 1 at the end
    "1\n1",          // Single element array with 1
    "1\n0",          // Single element array with 0
    "6\n0 0 1 1 1 1" // Mixed array with more 1's than 0's
];

const output = [
    "3 2", // First 1 at index 3, last 0 at index 2
    "5 4", // No 1's, first 1 index is 5. Last 0 index is 4
    "0 -1", // First 1 at index 0. No 0's, last 0 index is -1
    "3 2", // First 1 at index 3, last 0 at index 2
    "0 -1", // First 1 at index 0. No 0's, last 0 index is -1
    "1 0", // No 1's, first 1 index is 1. Last 0 index is 0
    "2 1"  // First 1 at index 2, last 0 at index 1
];

module.exports = { input, output };
