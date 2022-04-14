const generateRating = require('./ratingAlgorithm');

test('adds 1 + 2 to equal 1.1', () => {
    expect(generateRating(1, 2)).toBe(1.1);
  });
