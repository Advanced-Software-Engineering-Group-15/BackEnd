
//return current rating, just for thin slice implementation
function generateNewRating(currentRating: number, inputRating: number){
    return (currentRating*0.9 + inputRating*0.1)/2
}