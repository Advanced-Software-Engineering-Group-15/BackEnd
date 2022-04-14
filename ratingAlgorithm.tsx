
function generateRating(currentRating, inputRating) {
    return (currentRating*0.9 + inputRating*0.1)
}

module.exports = generateRating;