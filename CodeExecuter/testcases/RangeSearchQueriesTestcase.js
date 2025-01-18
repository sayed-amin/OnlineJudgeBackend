const input = [
    "1 1\n1\n1 1",  // Minimum input: Single element with the query matching the value
    "5 1\n1 2 3 4 5\n1 5",  // Query for the entire range of elements
    "5 2\n1 2 3 4 5\n0 0\n6 6",  // Queries for values outside the array range
    "5 2\n1 2 3 4 5\n3 4\n2 3",  // Querying overlapping ranges
    "10 3\n1 1 1 1 1 1 1 1 1 1\n1 1\n1 1\n1 1",  // All elements are the same
    "10 2\n1 2 3 4 5 6 7 8 9 10\n1 5\n6 10",  // Queries for two disjoint subarrays
    "5 1\n1 1 1 1 1\n1 1",  // All elements are the same and equal to the query range
    "5 1\n1 2 3 4 5\n0 0",  // Querying a range with no valid elements
    "5 2\n-1 -2 -3 -4 -5\n-5 -1\n-4 -2"  // Negative numbers with queries
];

const output = [
    "1",  // Query matches the only element
    "5",  // All elements fall within the range 1 to 5
    "0 0",  // No elements outside the range 1 to 1
    "2 2",  // Two separate queries, one for range 3 to 4 and another for 2 to 3
    "10 10 10",  // All elements are the same, so all match each query
    "5 5",  // Querying from 1 to 5
    "5",  // No element within the range 0 to 0
    "3 2"  // Query range includes values -4 to -2, results in 2 values
];

module.exports = { input, output };
