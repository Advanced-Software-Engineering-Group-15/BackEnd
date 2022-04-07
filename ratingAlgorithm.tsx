
//return current rating, just for thin slice implementation
export const generateNewRating = (currentRating, inputRating) => {
    return (currentRating*0.9 + inputRating*0.1)/2
}