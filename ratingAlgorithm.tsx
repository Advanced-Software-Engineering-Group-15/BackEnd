
function generateNewRating(currentRating, inputRating) {
    return (currentRating*0.9 + inputRating*0.1)
}

module.exports = generateNewRating;