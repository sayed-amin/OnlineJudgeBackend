const input = [
    "12345",  // Multiple digits
    "1000",   // Leading zeroes
    "9",      // Single digit
    "567",    // Small number with multiple digits
    "0"       // Edge case, sum of digits for 0
];

const output = [
    "15", // Sum of 1 + 2 + 3 + 4 + 5
    "1",  // Sum of 1 + 0 + 0 + 0
    "9",  // Sum of 9
    "18", // Sum of 5 + 6 + 7
    "0"   // Sum of 0
];

module.exports = { input, output };
