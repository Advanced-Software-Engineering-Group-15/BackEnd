const app = require('./app.tsx');


test('adds 1 + 2 to equal 1.1', () => {
    expect(app.generateNewRating('1', '2')).toBe('1.1');
});