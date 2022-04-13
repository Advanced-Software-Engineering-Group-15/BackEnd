const generateNewRating = require('./ratingAlgorithm');

test('adds 1 + 2 to equal 1.1', () => {
    console.log(generateNewRating(1, 2));
    expect(generateNewRating(1, 2)).toBe(1.1);
  });
