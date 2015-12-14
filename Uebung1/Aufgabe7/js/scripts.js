/**
 * Created by david on 01.12.15.
 */
var dice = {
    numbers: [1,2,3,4,5,6],
    count: 0,
    thrownNumbers: [],
    clear: function() {
        this.count = 0;
        this.thrownNumbers.length = 0;
    }
};

/**
 * Method for the clicklistener of the button.
 * Here we implement the logic for the gambling game.
 */
throwTheDice = function() {
    if(dice.count < 3) {
        dice.count++;
        var thrownNumber = dice.numbers[Math.floor(Math.random()*6)];
        document.getElementById('result').innerHTML = thrownNumber;
        dice.thrownNumbers.push(thrownNumber);
        document.getElementById('thrownNumbers').innerHTML += thrownNumber+' ';
    } else {
        if(threeSixInARow(dice.thrownNumbers)) {
            window.alert('Sie haben das Spiel gewonnen');
        } else {
            window.alert('Sie haben das Spiel verloren');
        }
        dice.clear();
    }
    console.log(dice.count);
};

/**
 * Method to check if the gamer has thrown three times a six.
 * @param thrownNumbers
 * @return true if gamer has thrown three times a six and false otherwise
 */
function threeSixInARow(thrownNumbers) {
    var count = 0;
    var i = 0;
    for(i in thrownNumbers) {
        if(thrownNumbers[i] == 6) {
            count++;
        }
    }
    return count == 3;
}